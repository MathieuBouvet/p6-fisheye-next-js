import { useState, useEffect } from "react";

type FromUrl = { url: string | null };
type FromFile = { file: File | null };
type FromBase64 = { base64: string | null };

type FileConfig = FromFile | FromBase64 | FromUrl;

function isFromUrl(fileConfig: FileConfig): fileConfig is FromUrl {
  return (fileConfig as FromUrl).url != null;
}

function isFromFile(fileConfig: FileConfig): fileConfig is FromFile {
  return (fileConfig as FromFile).file != null;
}

function isFromBase64(fileConfig: FileConfig): fileConfig is FromBase64 {
  return (fileConfig as FromBase64).base64 != null;
}

async function getFileFromUrl(url: string): Promise<File> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], "temp", { type: blob.type });
}

async function getBase64FromFile(file: File): Promise<string> {
  const reader = new FileReader();
  return new Promise<string>((resolve, reject) => {
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject();
    reader.readAsDataURL(file);
  });
}

function useBase64File(initialFile?: FileConfig) {
  const canInitializeState = initialFile == null || isFromBase64(initialFile);

  const [base64File, setBase64File] = useState<string | null>(() => {
    const canInitializeState =
      initialFile == null ||
      (isFromFile(initialFile) && initialFile.file == null) ||
      (isFromUrl(initialFile) && initialFile.url == null) ||
      isFromBase64(initialFile);

    if (canInitializeState) {
      if (initialFile != null && isFromBase64(initialFile)) {
        return initialFile.base64;
      }
    }
    return null;
  });
  const [isLoading, setIsloading] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function setFile(file: File | null) {
    const base64File = file != null ? await getBase64FromFile(file) : null;
    setBase64File(base64File);
  }

  useEffect(() => {
    if (!canInitializeState) {
      setIsloading(true);
      const filePromise = isFromUrl(initialFile)
        ? getFileFromUrl(initialFile.url!)
        : Promise.resolve(initialFile.file!);

      filePromise
        .then(getBase64FromFile)
        .then(base64 => {
          setHasError(false);
          setBase64File(base64);
        })
        .catch(() => {
          setHasError(true);
        })
        .finally(() => {
          setIsloading(false);
        });
    }
  }, []);

  return [base64File, setFile] as const;
}

export default useBase64File;
