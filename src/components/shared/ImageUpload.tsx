"use client";
import React, { useState } from "react";
// UPDATE: IKContext ki jagah ImageKitProvider import kiya hai
import { ImageKitProvider, IKUpload } from "imagekitio-next";

// Authentication function jo backend API ko call karega
const authenticator = async () => {
  try {
    const response = await fetch("/api/imagekit/auth");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export default function ImageUpload({ onUploadSuccess }: { onUploadSuccess: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);

  const onError = (err: any) => {
    console.log("Error", err);
    setUploading(false);
    alert("Upload failed! Please try again.");
  };

  const onSuccess = (res: any) => {
    console.log("Success", res);
    setUploading(false);
    onUploadSuccess(res.url); // Ye URL directly form mein chala jayega
  };

  return (
    <div className="p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 text-center">
      {/* UPDATE: Yahan bhi ImageKitProvider use kiya hai */}
      <ImageKitProvider
        publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
        authenticator={authenticator}
      >
        <p className="mb-3 text-sm font-bold text-slate-600">
          {uploading ? "Uploading Image..." : "Upload Product Image"}
        </p>
        <IKUpload
          fileName="product-image"
          onError={onError}
          onSuccess={onSuccess}
          onUploadStart={() => setUploading(true)}
          className="file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer transition-all"
        />
      </ImageKitProvider>
    </div>
  );
}