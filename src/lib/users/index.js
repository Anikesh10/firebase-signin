import { firestore } from "../../config/firebase";

class Users {
  postUserData = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, firstName, lastName, age, address, photoURL } = user;
      try {
        await userRef.set({
          firstName,
          lastName,
          email,
          age,
          address,
          photoURL,
          ...additionalData,
        });
      } catch (error) {
        console.error("Error creating user document", error);
        return {
          isError: true,
          ...error,
        };
      }
    }
    return this.getUserDocument(user.uid);
  };

  getUserDocument = async (uid) => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data(),
      };
    } catch (error) {
      console.error("Error fetching user", error);
      return {
        isError: true,
        ...error,
      };
    }
  };

  updateUserDocument = async (uid, data) => {
    if (!uid) return null;
    const userRef = await firestore.doc(`users/${uid}`);
    const snapshot = await userRef.get();

    if (snapshot.exists) {
      try {
        await userRef.update({
          ...data,
        });
      } catch (error) {
        console.error("Error updating user", error);
        return {
          isError: true,
          ...error,
        };
      }

      return this.getUserDocument(uid);
    }
  };
}

export default new Users();
