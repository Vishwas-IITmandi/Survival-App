# Models Configuration

This directory contains configuration files for the application.

## `models.ts`

Central configuration file for all Hugging Face models used in the app.

### Structure

The file exports an array `MODELS` containing model configurations. Each model object includes:
- `id`: Unique identifier for the model
- `name`: Display name shown in the UI
- `repo`: Hugging Face repository path
- `filename`: GGUF model filename
- `size`: Approximate download size
- `downloadUrl`: Direct download URL from Hugging Face

### Adding a New Model

To add a new model to the application:

1. Open `src/config/models.ts`
2. Add a new object to the `MODELS` array:

```typescript
{
  id: 'unique-model-id',
  name: 'Model Display Name',
  repo: 'organization/repo-name',
  filename: 'model-file.gguf',
  size: '~XMB',
  downloadUrl: 'https://huggingface.co/organization/repo-name/resolve/main/model-file.gguf',
}
```

3. Save the file - the model will automatically appear in the Model Selection screen

### Removing a Model

To remove a model:

1. Open `src/config/models.ts`
2. Delete or comment out the model object from the `MODELS` array
3. Save the file - the model will no longer appear in the app

### Helper Functions

The file also exports utility functions:
- `getModelById(id)`: Get a specific model by ID
- `getAllModels()`: Get all available models
- `getModelCount()`: Get the total number of models

### Example

```typescript
import { MODELS, getModelById } from '../config/models';

// Use all models
const allModels = MODELS;

// Get a specific model
const model = getModelById('qwen-0.5b');
```

## Benefits

- **Single source of truth** for model configurations
- **Dynamic updates** - add/remove models without touching screen code
- **Type safety** with TypeScript
- **Easy maintenance** and scalability
