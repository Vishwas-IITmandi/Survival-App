import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../components/ProgressBar';
import { downloadModel, checkModelExists } from '../api/model';
import { Model } from '../types';

const MODELS: Model[] = [
  {
    id: 'qwen-0.5b',
    name: 'Qwen 0.5B',
    repo: 'Qwen/Qwen2.5-0.5B-Instruct-GGUF',
    filename: 'qwen2.5-0.5b-instruct-q4_k_m.gguf',
    size: '~350MB',
    downloadUrl: 'https://huggingface.co/Qwen/Qwen2.5-0.5B-Instruct-GGUF/resolve/main/qwen2.5-0.5b-instruct-q4_k_m.gguf',
  },
  {
    id: 'qwen-1.5b',
    name: 'Qwen 1.5B',
    repo: 'Qwen/Qwen2.5-1.5B-Instruct-GGUF',
    filename: 'qwen2.5-1.5b-instruct-q4_k_m.gguf',
    size: '~950MB',
    downloadUrl: 'https://huggingface.co/Qwen/Qwen2.5-1.5B-Instruct-GGUF/resolve/main/qwen2.5-1.5b-instruct-q4_k_m.gguf',
  },
];

interface ModelCardProps {
  model: Model;
  onModelSelected: (model: Model) => void;
  isActive: boolean;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onModelSelected, isActive }) => {
  const [progress, setProgress] = React.useState(0);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isDownloaded, setIsDownloaded] = React.useState(false);

  React.useEffect(() => {
    checkIfDownloaded();
  }, []);

  const checkIfDownloaded = async () => {
    const exists = await checkModelExists(model.filename);
    setIsDownloaded(exists);
  };

  const handleDownload = async () => {
    if (isDownloaded) {
      onModelSelected(model);
      return;
    }

    Alert.alert(
      'Download Model',
      `Download ${model.name} (${model.size})?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Download',
          onPress: async () => {
            setIsDownloading(true);
            setProgress(0);
            try {
              await downloadModel(model.filename, model.downloadUrl, setProgress);
              setIsDownloaded(true);
              Alert.alert('Success', `${model.name} downloaded successfully!`);
              onModelSelected(model);
            } catch (error) {
              Alert.alert('Error', `Failed to download model: ${error}`);
            } finally {
              setIsDownloading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.modelCard,
        isActive && styles.modelCardActive,
      ]}
      onPress={handleDownload}
      disabled={isDownloading}
    >
      <View style={styles.modelHeader}>
        <Text style={styles.modelName}>{model.name}</Text>
        <Text style={styles.modelSize}>{model.size}</Text>
      </View>
      <Text style={styles.modelRepo}>{model.repo}</Text>
      
      {isDownloading && <ProgressBar progress={progress} />}
      
      {isDownloaded && !isDownloading && (
        <Text style={styles.downloadedText}>✓ Downloaded</Text>
      )}
      
      {!isDownloaded && !isDownloading && (
        <Text style={styles.downloadPrompt}>Tap to download</Text>
      )}
    </TouchableOpacity>
  );
};

interface ModelScreenProps {
  onModelSelected: (model: Model) => void;
  selectedModel: Model | null;
}

export default function ModelScreen({ onModelSelected, selectedModel }: ModelScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>Model Selection</Text>
        <Text style={styles.subtitle}>Choose a model to download</Text>
      </View>

      <View style={styles.modelList}>
        {MODELS.map((model) => (
          <ModelCard
            key={model.id}
            model={model}
            onModelSelected={onModelSelected}
            isActive={selectedModel?.id === model.id}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 20,
  },
  header: {
    marginTop: 8,
    marginBottom: 30,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '200',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
    fontSize: 16,
  },
  modelList: {
    gap: 16,
  },
  modelCard: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  modelCardActive: {
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  modelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modelName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  modelSize: {
    color: '#666',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  modelRepo: {
    color: '#888',
    fontSize: 12,
    marginBottom: 12,
  },
  downloadedText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  downloadPrompt: {
    color: '#FF4500',
    fontSize: 14,
    marginTop: 8,
  },
});
