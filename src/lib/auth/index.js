import { firebaseAuth } from "../../config/firebase";

/**  API Calling methods integrated with axios */

class auth {
  signUp = async (email, password) => {
    try {
      const response = await firebaseAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return response;
    } catch (error) {
      return {
        isError: true,
        ...error,
      };
    }
  };

  signIn = async (email, password) => {
    try {
      const response = await firebaseAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return response;
    } catch (error) {
      return {
        isError: true,
        ...error,
      };
    }
  };

  signOut = async () => {
    try {
      const response = await firebaseAuth.signOut();
      return response;
    } catch (error) {
      return {
        isError: true,
        ...error,
      };
    }
  };
}

export default new auth();
