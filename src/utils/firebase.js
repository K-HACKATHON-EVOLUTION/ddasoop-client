import * as firebase from "firebase";
import config from "../../firebase.json";

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

const Auth = firebase.auth();

export const login = async ({ email, password }) => {
    const { user } = await Auth.signInWithEmailAndPassword(email, password);
    return user;
};

const uploadImage = async uri => {
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const user = Auth.currentUser;
    const ref = firebase.storage().ref(`/profile/${user.uid}/photo.png`);
    const snapshot = await ref.put(blob, { contentType: 'image/png' });

    blob.close();
    return await snapshot.ref.getDownloadURL();
};

export const signup = async ({ email, password, name, photoUrl }) => {
    const { user } = await Auth.createUserWithEmailAndPassword(email, password);
    const storageUrl = photoUrl.startsWith('https')
        ? photoUrl
        : await uploadImage(photoUrl);
    console.log(storageUrl);
    await user.updateProfile({
        displayName: name,
        photoURL: storageUrl,
    })
    return user;
};

export const createStorageUrl = async (req, photoUrl) => {
    const storageUrl = photoUrl.startsWith('https')
        ? photoUrl
        : await uploadImage(photoUrl);
    req["forestImg"] = storageUrl;
    return req;
};

export const db = firebase.firestore();