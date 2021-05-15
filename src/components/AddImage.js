import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useStorage } from "../useStorage";

export default function AddImage({ file, setImgUrl, error }) {
  const { url, progress } = useStorage(file);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(url);
    if (url) {
      setImgUrl(url);
    }
  }, [url]);

  useEffect(() => {
    if (progress < 100) {
      setMessage("Uploading Image...");
    } else {
      setMessage(null);
    }
  }, [progress]);

  return (
    <Container>
      <div className="imgOutput">
        {message && <div className="message">{message}</div>}
        {error && <div className="error">{error}</div>}
        {file && <div className="file">{file.name}</div>}
      </div>
    </Container>
  );
}

const Container = styled.div``;
