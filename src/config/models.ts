import { Model } from '../types';

/**
 * Configuration file for all available Hugging Face models
 * 
 * To add a new model:
 * 1. Add a new object to the MODELS array below
 * 2. Provide id, name, repo, filename, size, and downloadUrl
 * 3. The model will automatically appear in the Model Selection screen
 * 
 * To remove a model:
 * 1. Simply remove or comment out the model object from the array
 */

export const MODELS: Model[] = [
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
  // Add more models here as needed
  // Example:
  // {
  //   id: 'model-id',
  //   name: 'Model Display Name',
  //   repo: 'organization/repo-name',
  //   filename: 'model-file.gguf',
  //   size: '~XMB',
  //   downloadUrl: 'https://huggingface.co/organization/repo-name/resolve/main/model-file.gguf',
  // },
];

/**
 * Get a model by its ID
 * @param id - The model ID to search for
 * @returns The model object or undefined if not found
 */
export const getModelById = (id: string): Model | undefined => {
  return MODELS.find(model => model.id === id);
};

/**
 * Get all available models
 * @returns Array of all model configurations
 */
export const getAllModels = (): Model[] => {
  return MODELS;
};

/**
 * Get the count of available models
 * @returns Number of configured models
 */
export const getModelCount = (): number => {
  return MODELS.length;
};
