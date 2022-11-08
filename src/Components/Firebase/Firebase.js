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

export const createUserCollection = async (userName, data) => {
	
	try {
		const docRef = await setDoc(doc(db, 'users', userName), {...data});
	} catch (err) {
		console.log(err);
	}
};
export const getUsersData = async () => {
	const usersCollectionRef = collection(db, "users")
	await getDocs(usersCollectionRef)
	.then(res => {
		console.log(res.docs);
	})
}