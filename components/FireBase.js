import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove } from "firebase/database";
import { connect } from 'react-redux';

const firebaseConfig = {
    apiKey: "AIzaSyCNyuV28oGqEbZ8WfmvnlmlKh_Xu-3lx04",
    authDomain: "project-3525675811712123634.firebaseapp.com",
    databaseURL: "https://project-3525675811712123634-default-rtdb.firebaseio.com",
    projectId: "project-3525675811712123634",
    storageBucket: "project-3525675811712123634.appspot.com",
    messagingSenderId: "379466024187",
    appId: "1:379466024187:web:84e6b46e113ae91ce79c5e"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const tasksRef = ref(database, 'tasks');

export { firebaseConfig, tasksRef, database, onValue, ref, push, remove };