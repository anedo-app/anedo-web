import React, {useEffect, useState} from "react";
import {UserIcon} from "@/Icons";

interface FileFieldPreviewProps {
  className?: string;
  url?: string;
  type: string;
  name: string;
  isLarge?: number;
}

const FileFieldPreview: React.FC<FileFieldPreviewProps> = ({
  className = "",
  type,
  name,
  url,
}) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const isImage = type.startsWith("image");

  const testImage = (url: string) => {
    const img = new Image();
    img.src = url;
    img.onerror = () => setPreviewImage(undefined);
    img.onload = () => setPreviewImage(url);
  };

  useEffect(() => {
    if (url && isImage) testImage(url);
  }, [url]);

  return (
    <div
      className={`${className} w-32 rounded-2xl aspect-square flex items-center justify-center overflow-hidden`}
    >
      {previewImage && isImage ? (
        <img
          className="h-full w-full object-contain"
          src={previewImage}
          alt={name}
        />
      ) : (
        <UserIcon size={32} />
      )}
    </div>
  );
};

export default FileFieldPreview;
