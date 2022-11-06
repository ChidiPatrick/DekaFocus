import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, collection, addDoc, doc } from 'firebase/firestore';

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

export const createUserCollection = async (userName = 'User name') => {
	try {
		const docRef = await setDoc(doc(db, 'users', userName), {
			fullName: 'Patrick Chidiebele',
			email: 'okafor@gmail.com',
			password: 12345
		});
	} catch (err) {
		console.log(err);
	}
};
