import firebase from "firebase";
import { Alert } from "react-native";

import { useUser } from "./useUser";
import secureStorage from "../utilities/secureStorage";

const useAuthentication = () => {
  const { setIsLogged } = useUser();

  const logIn = (email, password, setLoading, navigation) => {
    setLoading(true);

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        secureStorage.storeUser({ email, password });

        setIsLogged(true);
        setLoading(false);

        navigation.navigate("CamelCrush");
      })
      .catch(() => {
        setLoading(false);
        Alert.alert(
          "Invalid Credentials !!",
          "The email or password is incorrect."
        );
      });
  };

  const register = (newUser, setLoading, navigation) => {
    const { email, password, username } = newUser;
    setLoading(true);

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((current) => {
        secureStorage.storeUser({ email, password });

        current.user.updateProfile({
          displayName: username,
        });

        setLoading(false);

        firebase
          .firestore()
          .collection("users")
          .doc(current.user.uid)
          .set({ babies: [] });

        navigation.navigate("Login", {
          showMessage: true,
        });
      })
      .catch((error) => {
        Alert.alert("Error !!", error.message);
        setLoading(false);
      });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        secureStorage.removeUser();
        setIsLogged(false);
      });
  };

  return { logIn, register, signOut };
};

export default useAuthentication;
