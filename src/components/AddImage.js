import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { db } from "../config/firebase";
import { useStorage } from "../useStorage";

export default function AddImage({file, setSelectedFile, setImgUrl}) {
  const { progress, url } = useStorage(file);
  const [error, setError] = useState();

  const types = ["image/png", "image/jpeg"];

  useEffect(() => {
    console.log(url);
    if (url) {
      setImgUrl(url);
      setSelectedFile(null);
    }
  }, [url]);

  return (
    <Container>
      <div className="imgOutput">
        {error && <div className="error">{error}</div>}
        {file && <div className="file">{file.name}</div>}
      </div>
    </Container>
  );
}

const Container = styled.div``;
