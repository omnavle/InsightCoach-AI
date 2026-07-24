import { useState } from "react";
import type { Dataset } from "../types";
import { uploadDataset } from "../services/api";

export function useDataset() {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setIsUploading(true);
    setError(null);
    try {
      const result = await uploadDataset(file);
      setDataset(result);
      return result;
    } catch (err) {
      const message =
        (err as any)?.response?.data?.detail ?? "Something went wrong while uploading your file.";
      setError(message);
      throw err;
    } finally {
      setIsUploading(false);
    }
  }

  return { dataset, isUploading, error, upload };
}
