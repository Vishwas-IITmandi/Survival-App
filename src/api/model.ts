import RNFS from "react-native-fs";

export const downloadModel = async (
  modelName: string,
  modelUrl: string,
  onProgress: (progress: number) => void
): Promise<string> => {
  const destPath = `${RNFS.DocumentDirectoryPath}/${modelName}`;
  try {
    const fileExists = await RNFS.exists(destPath);

    // If it exists, delete it
    if (fileExists) {
      await RNFS.unlink(destPath);
      console.log(`Deleted existing file at ${destPath}`);
    }
    console.log("Starting download...");
    console.log("modelUrl: ", modelUrl);

    const downloadResult = await RNFS.downloadFile({
      fromUrl: modelUrl,
      toFile: destPath,
      progressDivider: 5,
      begin: (res) => {
        console.log("Download started");
        console.log(res);
      },
      progress: ({ bytesWritten, contentLength }: { bytesWritten: number; contentLength: number }) => {
        const progress = (bytesWritten / contentLength) * 100;
        console.log("Download progress: ", progress.toFixed(2) + "%");
        onProgress(Math.floor(progress));
      },
    }).promise;

    if (downloadResult.statusCode === 200) {
      console.log("Download complete:", destPath);
      return destPath;
    } else {
      throw new Error(`Download failed with status code: ${downloadResult.statusCode}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to download model: ${error.message}`);
    } else {
      throw new Error('Failed to download model: Unknown error');
    }
  }
};

export const checkModelExists = async (modelName: string): Promise<boolean> => {
  const destPath = `${RNFS.DocumentDirectoryPath}/${modelName}`;
  return await RNFS.exists(destPath);
};
