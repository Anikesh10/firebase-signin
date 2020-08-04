import { firebaseStorage } from "../../config/firebase";

class uploadUtils {
  handleFireBaseUpload = async (imageAsFile, uid) => {
    // async magic goes here...
    if (imageAsFile === "") {
      return {
        isError: true,
        message: `Not an image, the image file is a ${typeof imageAsFile}`,
      };
    }

    try {
      const uploadTask = await firebaseStorage
        .ref(`/images/${uid}`)
        .put(imageAsFile);

      const downloadUrl = await firebaseStorage
        .ref("images")
        .child(uploadTask.metadata.name)
        .getDownloadURL();
      return downloadUrl;
    } catch (error) {
      return {
        isError: true,
        message: "Could not complete upload process. Please try again.",
      };
    }
  };
}

export default new uploadUtils();
