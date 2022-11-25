import React,{useState} from 'react';
import styles from './SignUpForm.module.scss';
import {getEmail,getEmailVerificationState,getFirstName,getLastName,getPassword,getPasswordAgain,getUserName} from "./SignUpFormSlice"
import { useDispatch,useSelector } from 'react-redux';
import { showModal,hideModal,getUserData } from './SignUpFormSlice';
import { useFormik} from 'formik';
import {createUserCollection,getUsersDatas,auth, authStateObserver} from "../Firebase/Firebase"
import {createNewUser} from "../Firebase/Firebase"
import {useNavigate} from "react-router"
import * as Yup from 'yup';
import VerifyEmail from '../VerificationPage/VerificationPage';
import { onAuthStateChanged,createUserWithEmailAndPassword,sendEmailVerification } from 'firebase/auth';
import { createUniqueUserName } from '../AddProject/AddProjectSlice';
import uuid from "react-uuid"
const SignUpForm = () => {
	const password = useSelector((state) => state.signUpSlice.password) 
	const passwordAgain = useSelector((state) => state.signUpSlice.passwordAgain) 
	const firstName= useSelector((state) => state.signUpSlice.firstName) 
	const lastName = useSelector((state) => state.signUpSlice.lastName) 
	const userName = useSelector((state) => state.signUpSlice.userName)
	const email = useSelector((state) => state.signUpSlice.email)
	const modalState = useSelector((state) => state.signUpSlice.modalState)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [verifyEmail, setVerifyEmail] = useState(false)
	const emailVerified = useSelector(state => state.signUpSlice.emailVerified)

	const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	
	/////////////////////////////////////////////
	//Form Validation function///
// 
	// onAuthStateChanged(auth, user => {
	// if(emailVerified){
	// 	navigate('/settings')
	// 	console.log(emailVerified);
	// }

	// })
	////////////////////////////////////////////////////
	//Create new user function///
	const createNewUser = async (values) => {
	await createUserWithEmailAndPassword(auth, values.email, values.password)
	.then(userCredentials => {
		console.log(userCredentials);
		sendEmailVerification(userCredentials.user)
		dispatch(getEmailVerificationState(userCredentials.user.emailVerified))
		return userCredentials.user
	})
}
 
 const userData = []
 const formik = useFormik({
		initialValues: {
			email: "",
			lastName: "",
			firstName: "",
			userName: "",
			password: "",
			// passwordAgain: ""
		},
		validationSchema: Yup.object({
			firstName: Yup.string().required('Required'),
			lastName: Yup.string().required("Required"),
			email: Yup.string().email('Invalid email address').required('Required'),
			userName: Yup.string().required("Required"),
			password: Yup.string().min(8, "Password must be at least 8 alpha numeric characters").required("Required")

		}),

		onSubmit: values => {
	   userData.push(values)
	   console.log(userData);
	   dispatch(getUserData({...values}))
	  createNewUser(values)
	   navigate('/verifyEmail')
	//    dispatch(createUniqueUserName(`${values.userName}${uuid().slice(0,7)}`))
	   createUserCollection(values)

     },
	})
	// let form = 
	return (
		<form className={styles.SignUpWrapper}  onSubmit={formik.handleSubmit}>
			
			 {/* <PopUpUI heading="ERROR" modalState={modalState} message="Fill out every field with correct and complete data"/> */}
			<label htmlFor= 'firstName'  className={styles.label}> <span className={styles.labelTitle}>First name</span>
				<input onBlur = {formik.handleBlur} onChange={formik.handleChange} id ="firstName" className={styles.inputEl} type= "text" required 
				 value={formik.values.firstName} name = "firstName"/>
			</label>
			{formik.errors.firstName ? <div className={styles.required}>{formik.errors.firstName}</div> : null}
			<label htmlFor= 'lastName'  className={styles.label}> <span className={styles.labelTitle}>Last name</span>
				<input onBlur = {formik.handleBlur} onChange={formik.handleChange} id ="lastName" className={styles.inputEl} type= "text" required
				 value={formik.values.lastName} name = "lastName"/>
			</label>
			{formik.errors.firstName ? <div className={styles.required}>{formik.errors.lastName}</div> : null}
			<label htmlFor= 'userName'  className={styles.label}> <span className={styles.labelTitle}>User name</span>
				<input onBlur = {formik.handleBlur} onChange={formik.handleChange} id ="userName" className={styles.inputEl} type= "text" required
				 value={formik.values.userName} name = "userName"/>
			</label>
			{formik.errors.firstName ? <div className={styles.required}>{formik.errors.userName}</div> : null}
			<label htmlFor= 'email'  className={styles.label}> <span className={styles.labelTitle}>email</span>
				<input onBlur = {formik.handleBlur} onChange={formik.handleChange} id ="email" 
				className={styles.inputEl} type= "email" 
				required value={formik.values.email} name = "email"/>
			</label>
			{formik.errors.firstName ? <div className={styles.required}>{formik.errors.email}</div> : null}
			<label htmlFor= 'password'  className={styles.label}> <span className={styles.labelTitle}>Password</span>
				<input onBlur = {formik.handleBlur} onChange={formik.handleChange} id ="password" 
				placeholder="Yourpassword9!@#?" 
				className={styles.inputEl} type= "password" 
				required value={formik.values.password} name = "password"/>
			</label>
			{formik.errors.password ? <div className={styles.required}>{formik.errors.password}</div> : null}
			<button  className={[ styles.inputEl, styles.submitBtn ].join(' ')} type="submit" >SignUp</button>
		</form>

	);
};

export default SignUpForm;
