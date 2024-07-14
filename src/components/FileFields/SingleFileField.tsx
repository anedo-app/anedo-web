import Error from "../Error";
import Button from "../Button";
import useFiles from "./useFiles";
import FileFieldPreview from "./FileFieldPreview";
import React, {useEffect, useRef, useState} from "react";

interface SingleFileFieldProps {
  value: File | string | undefined;
  onChange: (files: File | undefined) => void;
  onUnsupportedFile?: (e: string) => void;
  className?: string;
  maxFileSizeMegaByte?: number;
  allowedExtensions?: string[];
  button: string;
  error?: string;
  disabled?: boolean;
}

const SingleFileField: React.FC<SingleFileFieldProps> = ({
  value,
  onChange,
  onUnsupportedFile,
  className = "",
  maxFileSizeMegaByte = 500,
  allowedExtensions,
  error: externalError,
  button,
  disabled,
}) => {
  const {handleSingleFile} = useFiles(allowedExtensions, maxFileSizeMegaByte);

  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>();

  const [file, setFile] = useState<File | string | undefined>(value);

  const onFileError = (reason: string) => {
    onUnsupportedFile?.(reason);
    setError(reason);
    inputRef.current!.value = "";
  };

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const fileList = Array.from(files);
    const file = fileList?.[0];

    if (!file) return;

    const failedReason = handleSingleFile(file);
    if (failedReason) {
      onFileError(failedReason);
      return;
    }

    setError("");
    setFile(file);
  };

  const onClick = () => inputRef.current?.click();

  const Preview = () => {
    if (!file) return null;
    if (file instanceof File)
      return (
        <FileFieldPreview
          type={file.type}
          url={URL.createObjectURL(file)}
          name={file.name}
          isLarge={120}
        />
      );
    return (
      <FileFieldPreview type="image" url={file} name="Preview" isLarge={120} />
    );
  };

  useEffect(() => {
    if (file instanceof File) onChange(file);
  }, [file]);

  return (
    <div className={`${className} flex gap-6`}>
      <input
        className="hidden"
        type="file"
        onChange={(e) => handleFileChange(e.target.files)}
        ref={inputRef}
        accept={allowedExtensions?.join(",")}
      />
      <Preview />

      <div className="flex grow flex-col items-start justify-center gap-2">
        <div className="flex items-center gap-2 w-full">
          <Button className="grow" onClick={onClick} disabled={disabled}>
            {button}
          </Button>
          <Error error={error || externalError} />
        </div>
      </div>
    </div>
  );
};

export default SingleFileField;
