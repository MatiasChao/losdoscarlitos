import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyB4ZqVZ18e_2JLvXdnzyvXfwY2eQYrO0q8",
    authDomain: "losdoscarlitos-c179d.firebaseapp.com",
    databaseURL: "https://losdoscarlitos-c179d.firebaseio.com",
    projectId: "losdoscarlitos-c179d",
    storageBucket: "losdoscarlitos-c179d.appspot.com",
    messagingSenderId: "345608702696",
    appId: "1:345608702696:web:b1dc4d9671e761923e975d",
    measurementId: "G-1B7L786W00"
}

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);

