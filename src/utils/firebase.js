import * as firebase from "firebase";
import config from "../../firebase.json";

const app = firebase.initializeApp(config);

export const db = app.firestore();