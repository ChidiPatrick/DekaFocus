import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, collection, addDoc, doc, getDocs } from 'firebase/firestore';
import {
	getAuth,
	createUserWithEmailAndPassword, 
	signInWithEmailAndPassword, 
	onAuthStateChanged,
	sendEmailVerification
} from "firebase/auth"
import {getUserData} from "../SignUpForms/SignUpFormSlice"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from 'react-router'
import uuid from "react-uuid"
import { getEmailVerificationState } from '../SignUpForms/SignUpFormSlice';



export const firebaseConfig = {
	apiKey: 'AIzaSyDgPSVF17YyYfv05yNIKxgdXUSpndfYeUE',
	authDomain: 'dekafocusetodo.firebaseapp.com',
	projectId: 'dekafocusetodo',
	storageBucket: 'dekafocusetodo.appspot.com',
	messagingSenderId: '321937121437',
	appId: '1:321937121437:web:cf86ed2d058e824decb474',
	measurementId: 'G-0GZHB3MRTK'
};
const app = initializeApp(firebaseConfig);
// export const db = getDatabase(app);
export const auth = getAuth(app)
const docsContainer = []
export const db = getFirestore(app)
export const createUserCollection = async (userName = uuid().slice(0,6), data) => {
	const userCollection = collection(db,"Users")
	const user = `${data.userName}${uuid().slice(0,8)}`
	const userRef = doc(userCollection,user)
	// await addDoc(userRef,{})
	
	//Create Project collection

	const projectRef = doc(userRef, "Projects Folder", "Projects")
	await addDoc(projectRef,{...data})

};
export const getUsersData = async () => {
	const usersCollectionRef = collection(db, "Users")
	await getDocs(usersCollectionRef)
	.then(res => {
		console.log(res.docs);
		res.docs.forEach(doc => {
			docsContainer.push({...doc.data(), id: doc.id })
		})
	})
	console.log(docsContainer);
}
 const createNewUser = async (values) => {
	
	await createUserWithEmailAndPassword(auth, values.email, values.password)
	.then(userCredentials => {
		console.log(userCredentials);
		sendEmailVerification(userCredentials.user)
		const dispatch = useDispatch()
		
		return userCredentials.user
	})
}
export const signInExistingUser = async (values) => {
	try{
	await signInWithEmailAndPassword(auth,values.email,values.password)
	.then(res => {
		console.log(res);
		if(res.user && res.user.emailVerified){
			return true
		}
		else{
			alert("Not registered")
		}
	})
	}
	catch(err) {
		// console.log(err);
		alert(err)
	}
}

// export const authStateObserver =  () => {
// 	 onAuthStateChanged(auth, (user) => {
// 		 if(user.emailVerified) return user.emailVerified
// 		 else{
// 			console.log('email not verified');
// 		console.log(user.emailVerified);
// 		 }
// 		 return user.emailVerified
// 	 })
// }