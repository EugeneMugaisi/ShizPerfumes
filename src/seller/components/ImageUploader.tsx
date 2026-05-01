// src/seller/components/ImageUploader.tsx
import { useRef, useState, useEffect } from "react";
import { useImageUpload } from "../hooks/useImageUpload";

interface ImageUploaderProps {
  currentImage: string;
  onUploadComplete: (url: string) => void;
}

const ImageUploader = ({ currentImage, onUploadComplete }: ImageUploaderProps) => {
  const { uploadImage, uploading, uploadProgress, uploadError } = useImageUpload();
  const [preview, setPreview] = useState<string>(currentImage || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync preview with currentImage prop when it changes (e.g. switching between products being edited)
  useEffect(() => {
    setPreview(currentImage || "");
  }, [currentImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      const downloadUrl = await uploadImage(file);
      onUploadComplete(downloadUrl);
    } catch (error: any) {
      alert(error.message || "Upload failed. Please try again.");
      setPreview(currentImage || "");
    }
  };

  return (
    <div>
      <label style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 500 }}>
        Product Image
      </label>

      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        style={{
          width: "100%", height: "180px", borderRadius: "10px",
          border: "2px dashed #ddd", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: uploading ? "not-allowed" : "pointer",
          backgroundColor: "#fafafa", position: "relative",
          marginBottom: "0.75rem",
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="Product preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{ textAlign: "center", color: "#aaa" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📷</div>
            <p style={{ margin: 0, fontSize: "0.85rem" }}>Click to upload image</p>
            <p style={{ margin: "0.25rem 0 0", fontSize: "0.75rem" }}>PNG, JPG up to 5MB</p>
          </div>
        )}

        {uploading && (
          <div style={{
            position: "absolute", inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            color: "white",
          }}>
            <p style={{ margin: "0 0 0.75rem", fontWeight: 600 }}>
              Uploading... {uploadProgress}%
            </p>
            <div style={{
              width: "60%", height: "6px",
              backgroundColor: "rgba(255,255,255,0.3)",
              borderRadius: "3px", overflow: "hidden",
            }}>
              <div style={{
                width: `${uploadProgress}%`, height: "100%",
                backgroundColor: "white", borderRadius: "3px",
                transition: "width 0.3s ease",
              }} />
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          type="button"
          onClick={() => !uploading && fileInputRef.current?.click()}
          disabled={uploading}
          style={{
            padding: "0.5rem 1rem", backgroundColor: "white",
            border: "1px solid #ddd", borderRadius: "8px",
            cursor: uploading ? "not-allowed" : "pointer",
            fontSize: "0.85rem", opacity: uploading ? 0.6 : 1,
          }}
        >
          {preview ? "Change Image" : "Choose Image"}
        </button>

        {preview && !uploading && (
          <button
            type="button"
            onClick={() => {
              setPreview("");
              onUploadComplete("");
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            style={{
              padding: "0.5rem 1rem", backgroundColor: "white",
              border: "1px solid #ef4444", borderRadius: "8px",
              cursor: "pointer", fontSize: "0.85rem", color: "#ef4444",
            }}
          >
            Remove
          </button>
        )}
      </div>

      {uploadError && (
        <p style={{ color: "#ef4444", fontSize: "0.82rem", margin: "0.5rem 0 0" }}>
          {uploadError}
        </p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUploader;