import logo from './logo.svg';
import './App.scss';
import FrontPage from './Components/FrontPage/FrontPage';
import { Routes, Route, Link } from 'react-router';
import { useSelector } from 'react-redux';
import BreakUI from './Components/BreakUI/BreakUI';
import UserAccountUI from './Components/UserAccount/UserAccount';
import AddTask from './Components/addTask/addTask';
import Setting from './Components/Settings/Settings';
import Settings from './Components/Settings/Settings';
import AlarmTones from './Components/AlarmTones/AlarmTone';
import { initializeApp } from 'firebase/app';
import { doc, DocumentSnapshot, getDoc, getDocs, getFirestore, setDoc, updateDoc, query } from 'firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import { createUserCollection, firebaseConfig } from './Components/Firebase/Firebase';
import SignUpForm from './Components/SignUpForms/SignUpForm';
// const analytics = getAnalytics(app);

//////////////////////////////////////
function App() {
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);
	let folder = null;
	createUserCollection('Patrick okafor');
	// const initializeMyDB = async () => {
	// 	try {
	// 		folder = await setDoc(doc(db, 'Users folder', 'User bio'), {
	// 			Name: 'Patrick Chidiebere',
	// 			address: 'No. 4 Okwuego street',
	// 			country: 'Nigeria'
	// 		});
	// 		// const docRef = await addDoc(collection(db, "users"),{
	// 		//     first: "Pat",
	// 		//     last: "Lovelace",
	// 		//     DOB: 1996
	// 		// })
	// 		// s
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };
	// const getData = async () => {
	// 	try {
	// 		const docRef = setDoc(doc(db, 'Obodo', 'SF'), {
	// 			title: 'Engr',
	// 			occupation: 'Software developer',
	// 			address: 'AWAKA'
	// 		});

	// 		const colRef = collection(db, 'users');
	// 		await getDocs(colRef).then((res) => {
	// 			let books = [];
	// 			console.log(res.docs);
	// 			res.docs.forEach((doc) => {
	// 				books.push({ ...doc.data(), id: doc.id });
	// 			});
	// 			console.log(books);
	// 		});
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	// const data = getData();
	// console.log(data);
	// const userBio = async () => {
	// 	try {
	// 		const testBio = await addDoc(collection(db, 'userBio'), {
	// 			gender: '',
	// 			age: 20,
	// 			stateOfOrigin: ''
	// 		});
	// 	} catch (err) {}
	// };
	// userBio();
	// initializeMyDB();
	// ///////////////////////////////////////////////////
	// const queryDocs = async () => {
	// 	const docs = await getDocs(collection(db, 'users'));
	// 	console.log(docs);
	// };
	// queryDocs();
	// const setADoc = async (collection, document) => {
	// 	const data = await setDoc(doc(db, collection, document), {
	// 		first: 'Patrick',
	// 		last: 'Chidiebele',
	// 		DOB: 1996
	// 	});
	// 	console.log(data);
	// };

	// const update = async () => {
	// 	await updateDoc(setADoc, {
	// 		first: 'Rapheal',
	// 		last: 'Patrick'
	// 	});
	// };
	// update();
	////////////////////////////////////////////////////
	const time = new Date();
	const minute = useSelector((state) => state.frontPage.minute5);
	time.setSeconds(time.getSeconds() + minute);
	const displayBreak = useSelector((state) => state.frontPage.break);
	console.log(displayBreak);
	let frontpage = null;
	if (displayBreak) {
		frontpage = <BreakUI expiryTimestamp={time} />;
	} else {
		frontpage = <FrontPage expiryTimestamp={time} />;
	}
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={frontpage} />
				<Route path="/UserAccount" element={<UserAccountUI />} />
				<Route path="//todayTodo" element={<AddTask />} />
				<Route path="/tomorrowTodo" element={<AddTask />} />
				<Route path="/upcomingTodo" element={<AddTask />} />
				<Route path="/somedayTodo" element={<AddTask />} />
				<Route path="/events" element={<AddTask />} />
				<Route path="/completed" element={<AddTask />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/settings/workAlarm" element={<AlarmTones />} />
				<Route path="/signUPForm" element={<SignUpForm />} />
			</Routes>
		</div>
	);
}

export default App;
