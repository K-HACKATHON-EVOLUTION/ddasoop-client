import * as firebase from "firebase";
import config from "../../firebase.json";

const app = firebase.initializeApp(config);

const Auth = app.auth();

export const login = async ({ email, password }) => {
    const { user } = await Auth.signInWithEmailAndPassword(email, password);
    return user;
};

export const db = app.firestore();const uploadImage = async uri => {
    const { user } = await Auth.createUserWithEmailAndPassword(email, password);
    const storageUrl = photoUrl.startsWith('https')
        ? photoUrl
        : await uploadImage(photoUrl);
    await user.updateProfile({
        displayName: name,
        photoURL: storageUrl,
    })
    return user;
};

export const db = firebase.firestore();