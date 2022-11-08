import React,{useState} from 'react';
import styles from './SignUpForm.module.scss';
import { useFormInputValidation } from 'react-form-input-validation';
import PasswordChecklist from "react-password-checklist"
import {getEmail,getFirstName,getLastName,getPassword,getPasswordAgain,getUserName} from "./SignUpFormSlice"
import { useDispatch,useSelector } from 'react-redux';
import PopUpUI from '../PopUpUI/PopUpUI';
import { showModal,hideModal,getUserData } from './SignUpFormSlice';
import { useFormik} from 'formik';
import {createUserCollection} from "../Firebase/Firebase"
const SignUpForm = (props) => {
	const password = useSelector((state) => state.signUpSlice.password) 
	const passwordAgain = useSelector((state) => state.signUpSlice.passwordAgain) 
	const firstName= useSelector((state) => state.signUpSlice.firstName) 
	const lastName = useSelector((state) => state.signUpSlice.lastName) 
	const userName = useSelector((state) => state.signUpSlice.userName)
	const email = useSelector((state) => state.signUpSlice.email)
	const modalState = useSelector((state) => state.signUpSlice.modalState)
	const dispatch = useDispatch()
	const onSubmit = (event) => {
		event.preventDefault()
		const validEmail = validate(email);
		console.log(validEmail);
		if(!password || !passwordAgain || !firstName || !lastName || !userName || !email || !validEmail){
			dispatch(showModal())
			console.log("show modal invoked");
		}
	};
	const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	
	/////////////////////////////////////////////
	//Form Validation function///
const validate = values => {
   const errors = {};
   if (!values.firstName) {
     errors.firstName = 'Required';
   } else if (values.firstName.length > 15) {
     errors.firstName = 'Must be 15 characters or less';
   }
 
   if (!values.lastName) {
     errors.lastName = 'Required';
   } else if (values.lastName.length > 20) {
     errors.lastName = 'Must be 20 characters or less';
   }
 
   if (!values.email) {
     errors.email = 'Required';
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Invalid email address';
   }
   if (!values.userName) {
     errors.userName = 'Required';
   } else if (values.userName.length > 20) {
     errors.userName = 'Must be Unique';
   }
   if (!strongRegex.test(values.password) || !values.password ) {
     errors.password = 'Password must contain an uppercase character,a digit and a special character';
   }
   if(values.password && !strongRegex.test(values.password)){
	   errors.password = "Password must be at least characters with an uppercase and spacial characters"
   }
   if (!strongRegex.test(values.passwordAgain) || !values.passwordAgain ) {
     errors.passwordAgain = 'Password must contain an uppercase character,a digit and a special character';
   }
   if(values.passwordAgain && !strongRegex.test(values.passwordAgain)){
	   errors.passwordAgain = "Password must be at least characters with an uppercase and spacial characters"
   }	
//    if (!values.password) {
//      errors.password = 'Required';
//    } 
 
   return errors;
 };
 const userData = []
 const formik = useFormik({
		initialValues: {
			email: "",
			lastName: "",
			firstName: "",
			userName: "",
			password: "",
			passwordAgain: ""
		},
		validate,
		onSubmit: values => {
       alert(JSON.stringify(values, null, 2));
	   userData.push(values)
	   console.log(userData);
	   dispatch(getUserData({...values}))
	   createUserCollection(values.userName,{...values})
     },
	})
	return (
		<form className={styles.SignUpWrapper} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
			
			 {/* <PopUpUI heading="ERROR" modalState={modalState} message="Fill out every field with correct and complete data"/> */}
			<label htmlFor= 'firstName'  className={styles.label}> <span className={styles.labelTitle}>First name</span>
				<input onChange={formik.handleChange} id ="firstName" className={styles.inputEl} type= "text" required 
				 value={formik.values.firstName}/>
			</label>
			{formik.errors.firstName ? <div className={styles.required}>{formik.errors.firstName}</div> : null}
			<label htmlFor= 'lastName'  className={styles.label}> <span className={styles.labelTitle}>Last name</span>
				<input onChange={formik.handleChange} id ="lastName" className={styles.inputEl} type= "text" required
				 value={formik.values.lastName}/>
			</label>
			{formik.errors.firstName ? <div className={styles.required}>{formik.errors.lastName}</div> : null}
			<label htmlFor= 'userName'  className={styles.label}> <span className={styles.labelTitle}>User name</span>
				<input onChange={formik.handleChange} id ="userName" className={styles.inputEl} type= "text" required
				 value={formik.values.userName}/>
			</label>
			{formik.errors.firstName ? <div className={styles.required}>{formik.errors.userName}</div> : null}
			<label htmlFor= 'email'  className={styles.label}> <span className={styles.labelTitle}>email</span>
				<input onChange={formik.handleChange} id ="email" className={styles.inputEl} type= "email" required value={formik.values.email}/>
			</label>
			{formik.errors.firstName ? <div className={styles.required}>{formik.errors.email}</div> : null}
			<label htmlFor= 'password'  className={styles.label}> <span className={styles.labelTitle}>Password</span>
				<input onChange={formik.handleChange} id ="password" placeholder="Yourpassword9!@#?" className={styles.inputEl} type= "password" required value={formik.values.password}/>
			</label>
			{formik.errors.password ? <div className={styles.required}>{formik.errors.password}</div> : null}
			<label htmlFor= 'passwordAgain'  className={styles.label}> <span className={styles.labelTitle}>Confirm Password</span>
				<input onChange={formik.handleChange} id ="passwordAgain" className={styles.inputEl} placeholder="Yourpassword9!@#?" type= "password" required
				value={formik.values.passwordAgain}/>
			</label>
			{formik.errors.passwordAgain ? <div className={styles.required}>{formik.errors.passwordAgain}</div> : null}
			<input name='' className={[ styles.inputEl, styles.submitBtn ].join(' ')} type="submit" />
		</form>
	);
};

export default SignUpForm;
