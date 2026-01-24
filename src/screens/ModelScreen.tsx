import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../components/ProgressBar';
import { downloadModel, checkModelExists } from '../api/model';
import { Model } from '../types';
import { MODELS } from '../config/models';
import { modelScreenStyles as styles } from '../styles/modelScreenStyles';

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
