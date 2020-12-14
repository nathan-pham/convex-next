import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import query from "./query"

const firebaseConfig = {
    apiKey: "AIzaSyDf_hJg46TJDv1mmRxSXx_KfXcH2yUe0eI",
    authDomain: "convex-cd1c6.firebaseapp.com",
    databaseURL: "https://convex-cd1c6.firebaseio.com",
    projectId: "convex-cd1c6",
    storageBucket: "convex-cd1c6.appspot.com",
    messagingSenderId: "918467383085",
    appId: "1:918467383085:web:dca9a04e1e27112f1b4da4",
    measurementId: "G-2E6LVCBSB2"
}
  
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
  
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)

// const login = async (email, password) => {
// 	let idToken
// 	try {
// 		let { user } = await firebase.auth().signInWithEmailAndPassword(email, password)
// 		idToken = await firebase.auth().currentUser.getIdToken()
// 	}
// 	catch(e) {
// 		return createAlert('Incorrect username or password.')
// 	}

// 	let details = await query('/u/login', { idToken })
	
// 	if(details.hasOwnProperty('error')) {
// 		createAlert(details.error)
// 	}
// 	else {
// 		await firebase.auth().signOut()
// 		window.location.assign(details.success)
// 	}
// }