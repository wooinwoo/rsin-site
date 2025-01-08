import { ReactNode, useRef, useState } from "react";
import { getFullImageUrl } from "~/shared/utils/imges";
interface ImageUploadProps {
  defaultImageUrl?: string;
  children?: ReactNode;
  onChange: (file: File) => void;
  accept?: string;
  className?: string;
  currentImageUrl?: string;
}

export function ImageUpload({
  defaultImageUrl,
  onChange,
  accept = "image/*",
  className,
  currentImageUrl,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImageUrl ?? null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
      onChange(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      onChange(file);
    }
  };

  const imageUrl = previewUrl || currentImageUrl;

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative group cursor-pointer ${className || ""}`}
    >
      <input
        type="file"
        ref={inputRef}
        onChange={handleChange}
        accept={accept}
        className="hidden"
      />
      <div
        className={`
          flex flex-col items-center justify-center w-24 h-24 xs:w-32 xs:h-32 rounded-full
          border-2 border-dashed transition-all duration-200
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          ${imageUrl ? "bg-gray-100" : "bg-gray-50 hover:bg-gray-100"}
          overflow-hidden
        `}
      >
        {imageUrl ? (
          <div className="relative w-full h-full group">
            <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
              <div className="text-white opacity-0 group-hover:opacity-100 transition-all duration-200 text-center">
                <svg
                  className="w-6 h-6 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-2">
            <svg
              className={`w-6 h-6 mb-1 transition-colors duration-200 ${
                isDragging ? "text-blue-500" : "text-gray-500"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="text-xs text-gray-500 text-center">
              클릭 또는
              <br />
              드래그
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
