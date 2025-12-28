import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { initLlama, releaseAllLlama } from 'llama.rn';
import { Message, Model } from '../types';
import RNFS from 'react-native-fs';

interface ChatScreenProps {
  selectedModel: Model | null;
}

const INITIAL_CONVERSATION: Message[] = [
  {
    role: 'system',
    content: 'You are a helpful survival guide assistant.',
  },
];

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ChatScreen({ selectedModel }: ChatScreenProps) {
  const [context, setContext] = useState<any>(null);
  const [conversation, setConversation] = useState<Message[]>(INITIAL_CONVERSATION);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);

  // Smooth keyboard animations
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  useEffect(() => {
    if (selectedModel) {
      loadModel(selectedModel);
    }
    return () => {
      if (context) {
        releaseAllLlama();
      }
    };
  }, [selectedModel]);

  const loadModel = async (model: Model) => {
    try {
      const destPath = `${RNFS.DocumentDirectoryPath}/${model.filename}`;
      const fileExists = await RNFS.exists(destPath);
      
      if (!fileExists) {
        Alert.alert('Model Not Found', 'Please download the model first from the Models tab.');
        return;
      }

      if (context) {
        await releaseAllLlama();
        setContext(null);
        setConversation(INITIAL_CONVERSATION);
      }

      const llamaContext = await initLlama({
        model: destPath,
        use_mlock: true,
        n_ctx: 2048,
        n_gpu_layers: 1,
      });
      
      setContext(llamaContext);
      console.log('Model loaded successfully:', model.name);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert('Error Loading Model', errorMessage);
    }
  };

  const handleSendMessage = async () => {
    if (!context) {
      Alert.alert('No Model Selected', 'Please select a model from the Models tab.');
      return;
    }
    if (!userInput.trim()) {
      return;
    }

    const newConversation: Message[] = [
      ...conversation,
      { role: 'user', content: userInput },
    ];
    setConversation(newConversation);
    setUserInput('');
    setIsLoading(true);
    setIsGenerating(true);
    setAutoScrollEnabled(true);

    try {
      const stopWords = [
        '</s>',
        '<|end|>',
        '<|im_end|>',
        '<|eot_id|>',
        '<|end_of_text|>',
      ];

      // Append placeholder for assistant's response
      setConversation((prev) => [
        ...prev,
        { role: 'assistant', content: '' },
      ]);

      let currentAssistantMessage = '';

      interface CompletionData {
        token: string;
      }

      interface CompletionResult {
        timings: {
          predicted_per_second: number;
        };
      }

      await context.completion(
        {
          messages: newConversation,
          n_predict: 2000,
          stop: stopWords,
        },
        (data: CompletionData) => {
          const token = data.token;
          currentAssistantMessage += token;

          setConversation((prev) => {
            const lastIndex = prev.length - 1;
            const updated = [...prev];
            updated[lastIndex].content = currentAssistantMessage;
            return updated;
          });

          if (autoScrollEnabled && scrollViewRef.current) {
            requestAnimationFrame(() => {
              scrollViewRef.current?.scrollToEnd({ animated: false });
            });
          }
        }
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert('Error During Inference', errorMessage);
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
    }
  };

  const handleScroll = (event: any) => {
    const currentPosition = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;

    const distanceFromBottom = contentHeight - scrollViewHeight - currentPosition;
    setAutoScrollEnabled(distanceFromBottom < 100);
  };

  const stopGeneration = async () => {
    try {
      await context.stopCompletion();
      setIsGenerating(false);
      setIsLoading(false);

      setConversation((prev) => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage.role === 'assistant') {
          return [
            ...prev.slice(0, -1),
            {
              ...lastMessage,
              content: lastMessage.content + '\n\n*Generation stopped*',
            },
          ];
        }
        return prev;
      });
    } catch (error) {
      console.error('Error stopping completion:', error);
    }
  };

  const renderMessage = (message: Message, index: number) => {
    if (message.role === 'system') return null;

    return (
      <View
        key={index}
        style={[
          styles.messageBubble,
          message.role === 'user' ? styles.userBubble : styles.assistantBubble,
        ]}
      >
        <Text style={styles.messageRole}>
          {message.role === 'user' ? 'You' : 'Survival Guide'}
        </Text>
        <Text style={styles.messageContent}>{message.content}</Text>
      </View>
    );
  };

  const renderTypingIndicator = () => {
    if (!isGenerating || conversation[conversation.length - 1]?.content) return null;
    
    return (
      <View style={[styles.messageBubble, styles.assistantBubble, styles.typingBubble]}>
        <Text style={styles.messageRole}>Survival Guide</Text>
        <View style={styles.typingIndicator}>
          <Text style={styles.typingDot}>•</Text>
          <Text style={[styles.typingDot, styles.typingDotDelay1]}>•</Text>
          <Text style={[styles.typingDot, styles.typingDotDelay2]}>•</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Survival Guide Chat</Text>
          {selectedModel && (
            <Text style={styles.modelInfo}>Model: {selectedModel.name}</Text>
          )}
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
        >
          {conversation.map((msg, idx) => renderMessage(msg, idx))}
          {renderTypingIndicator()}

          {isLoading && !isGenerating && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#FF4500" />
              <Text style={styles.loadingText}>Loading model...</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          {isGenerating && (
            <TouchableOpacity style={styles.stopButton} onPress={stopGeneration}>
              <Text style={styles.stopButtonText}>Stop</Text>
            </TouchableOpacity>
          )}
          <TextInput
            style={styles.input}
            placeholder="Ask anything..."
            placeholderTextColor="#666"
            value={userInput}
            onChangeText={setUserInput}
            multiline
            editable={!isGenerating}
          />
          <TouchableOpacity
            style={[styles.sendButton, isGenerating && styles.sendButtonDisabled]}
            onPress={handleSendMessage}
            disabled={isGenerating}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '200',
    marginBottom: 4,
  },
  modelInfo: {
    color: '#666',
    fontSize: 14,
  },
  messageBubble: {
    marginVertical: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF4500',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#333',
    borderBottomLeftRadius: 4,
  },
  messageRole: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
    opacity: 0.7,
  },
  messageContent: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 22,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  loadingText: {
    color: '#666',
    marginLeft: 8,
    fontSize: 14,
  },
  typingBubble: {
    paddingVertical: 16,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typingDot: {
    color: '#FF4500',
    fontSize: 20,
    lineHeight: 20,
    opacity: 0.4,
  },
  typingDotDelay1: {
    opacity: 0.6,
  },
  typingDotDelay2: {
    opacity: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#000000',
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    color: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    maxHeight: 100,
    borderWidth: 1,
    borderColor: '#333',
  },
  sendButton: {
    backgroundColor: '#FF4500',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonDisabled: {
    backgroundColor: '#666',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  stopButton: {
    backgroundColor: '#666',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  stopButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
