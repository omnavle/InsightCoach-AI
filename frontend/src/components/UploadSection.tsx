import { useRef, useState } from "react";
import type { DragEvent } from "react";

interface UploadSectionProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
  error: string | null;
}

export default function UploadSection({ onUpload, isUploading, error }: UploadSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.name.toLowerCase().endsWith(".csv")) return;
    onUpload(file);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }

  return (
    <section>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer border px-6 py-10 text-center transition-colors ${
          isDragging ? "border-pine-500 bg-pine-50" : "border-line bg-card hover:border-ink-400"
        }`}
        style={{ borderStyle: isDragging ? "solid" : "dashed" }}
      >
        <p className="font-display text-lg text-ink-900">
          {isUploading ? "Reading your file…" : "Drop a CSV here, or click to choose one"}
        </p>
        <p className="text-sm text-ink-500 mt-1 font-mono">.csv only</p>
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
      {error && <p className="mt-3 text-sm text-red-700 font-mono">{error}</p>}
    </section>
  );
}
