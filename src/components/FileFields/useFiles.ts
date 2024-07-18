const useFiles = (
  allowedExtensions: string[] | undefined,
  maxFileSizeMegaByte?: number,
) => {
  const isFileExceedingMaxSize = (fileSize: number) =>
    !!maxFileSizeMegaByte && fileSize / (1024 * 1024) > maxFileSizeMegaByte;

  const isFileSupported = (file: File) => {
    if (allowedExtensions) {
      const fileExtension = file.type;

      if (!fileExtension)
        return {
          isSupported: false,
          reason: "File extension is not supported",
        };

      if (!allowedExtensions.includes(fileExtension))
        return {
          isSupported: false,
          reason: "File extension is not supported",
        };
    }

    if (maxFileSizeMegaByte && isFileExceedingMaxSize(file.size))
      return {
        isSupported: false,
        reason: "File size is exceeding the limit",
      };

    return {
      isSupported: true,
      reason: "",
    };
  };

  const handleSingleFile = (file: File): string | undefined => {
    const {isSupported, reason} = isFileSupported(file);

    if (!isSupported) return reason;
  };

  return {
    isFileExceedingMaxSize,
    isFileSupported,
    handleSingleFile,
  };
};

export default useFiles;
