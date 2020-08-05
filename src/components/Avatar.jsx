import React, { useRef, useEffect, useState } from "react";
import ReactAvatar from "react-avatar";
import styled from "styled-components";

const Avatar = (props) => {
  let inputRef = useRef();
  let [imageSrc, setImage] = useState("");
  const { onFileSelect } = props;

  useEffect(() => {
    let inputElement = inputRef.current;

    // Get Image url on file selection
    const getImageUrl = (file) => {
      let url = "";
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          // convert image file to base64 string
          url = reader.result;
          setImage(url);
          if (onFileSelect) onFileSelect(file, url);
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    };

    // File select callback
    const handleFileSelect = (e) => {
      if (e.target.files && e.target.files.length) {
        getImageUrl(e.target.files[0]);
      }
    };

    if (inputElement) {
      inputElement.addEventListener("change", handleFileSelect);
    }

    return () => {
      inputElement.removeEventListener("change", handleFileSelect);
    };
  }, [onFileSelect]);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  let { name, image } = props;
  let selectedImage = imageSrc || image;
  return (
    <AvatarWrapper>
      <ReactAvatar
        size={150}
        round
        color={"#21d4fd"}
        onClick={handleClick}
        src={selectedImage}
        name={name}
      />
      <FileInput type={"file"} ref={inputRef} accept="image/*" />
    </AvatarWrapper>
  );
};

export default Avatar;

const AvatarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em 0 2em;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;
