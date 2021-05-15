import { useState, useEffect } from "react";
import { storage, db } from "./config/firebase";

export const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [uploadError, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
      console.log("File: ",file)
    const storageRef = storage.ref();
    const productRef = storageRef.child(file.name);

    console.log(productRef)
    productRef.put(file).on(
      "state_changed",
      (snap) => {
        let percent = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percent);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await productRef.getDownloadURL();
        console.log(url)
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, url, uploadError };
};

// export default useStorage;
