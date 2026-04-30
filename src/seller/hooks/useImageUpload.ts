// src/seller/hooks/useImageUpload.ts
import { useState } from "react";

const IMGBB_API_KEY = "48e0107202d9f8e104ab77c8eeb35f98";

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string> => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("Please select an image file.");
    }

    // Validate file size - max 5MB
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image must be smaller than 5MB.");
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    try {
      // Convert image to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          resolve(result.split(",")[1]); // strip the data:image/...;base64, prefix
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      setUploadProgress(50); // halfway after reading file

      // Upload to ImgBB
      const formData = new FormData();
      formData.append("image", base64);
      formData.append("key", IMGBB_API_KEY);

      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error("ImgBB upload failed. Please try again.");
      }

      setUploadProgress(100);
      return data.data.url; // permanent image URL

    } catch (error: any) {
      setUploadError(error.message || "Upload failed. Please try again.");
      throw error;
    } finally {
      setUploading(false);
    }
  };

  // No-op for ImgBB since we don't need to delete from their servers
  const deleteImage = async (_imageUrl: string) => {};

  return { uploadImage, deleteImage, uploading, uploadProgress, uploadError };
};