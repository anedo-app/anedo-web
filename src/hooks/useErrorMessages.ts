import {FirebaseError} from "firebase/app";

const useErrorMessages = () => {
  const getErrorMessage = (error: FirebaseError) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "Cet email est déjà utilisé";

      case "auth/invalid-email":
        return "Cet email est invalide";

      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Email ou mot de passe incorrect";

      case "auth/too-many-requests":
        return "Trop de tentatives de connexion";

      default:
        return "Une erreur est survenue";
    }
  };

  return {getErrorMessage};
};

export default useErrorMessages;
