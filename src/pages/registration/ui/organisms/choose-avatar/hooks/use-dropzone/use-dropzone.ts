import { useCallback, useState } from "react";

export const useDropzone = () => {
  const [isDropActive, setIsDropActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onDragStateChange = useCallback((dragActive: boolean) => {
    setIsDropActive(dragActive);
  }, []);

  const removeFile = useCallback(() => {
    setFile(null);
  }, [setFile, file]);

  const onFilesDrop = useCallback((newFile: File) => {
    setFile(newFile);
  }, []);

  return { onDragStateChange, onFilesDrop, file, removeFile, isDropActive };
};
