import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, collection, addDoc, doc, getDocs } from 'firebase/firestore';
import {getUserData} from "../SignUpForms/SignUpFormSlice"
import {useDispatch, useSelector} from "react-redux"
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
export const db = getFirestore(app);
const docsContainer = []
export const createUserCollection = async (userName, data) => {
	
	try {
		const docRef = await addDoc(collection(db,"Users"),{...data});
		console.log(docRef.id);
	} catch (err) {
		console.log(err);
	}
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