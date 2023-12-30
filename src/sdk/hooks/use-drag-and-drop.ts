import { useState } from "react";
import { useDropzone } from "react-dropzone";

export const useDragAndDrop = () => {
  const [file, setFile] = useState<File | null>(null);

  const fileMaxSize: number = 5000000; //5 megabytes max, 5MB
  const acceptedFileTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
  ];

  /** Verifies acceptability of files */
  const verifyFile = (files: File[]): boolean | void => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;

      if (!acceptedFileTypes.includes(currentFileType)) {
        alert("Unsupported file. Images only");

        return false;
      }

      if (currentFileSize > fileMaxSize) {
        alert("The selected image is too large. Tips: 5MB recommended");

        return false;
      }

      return true;
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
      "image/gif": [],
    },

    multiple: false,
    maxSize: fileMaxSize,

    onDrop: async (files, rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        verifyFile(rejectedFiles as unknown as File[]);
      }

      if (files && files.length > 0) {
        const isVerified = verifyFile(files);

        if (isVerified) {
          const currentFile = files[0];

          setFile(currentFile);
        }
      }
    },
  });

  return {
    getRootProps,
    getInputProps,
    file,
  };
};
