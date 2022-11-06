import React from 'react';
import styles from './SignUpForm.module.scss';
import { useFormInputValidation } from 'react-form-input-validation';
import { PasswordChecklist } from 'react-password-checklist';
import {getEmail,getFirstName,getLastName,getPassword,getPasswordAgain,getUserName} from "./SignUpFormSlice"
import { useDispatch,useSelector } from 'react-redux';
const SignUpForm = (props) => {
	const dispatch = useDispatch()
		const [ fields, errors, form ] = useFormInputValidation(
			{
				first_name: '',
				last_name: '',
				user_name: "",
				email_address: '',
				password: ""
				
			},
			{
				first_name: 'required',
				last_name: 'required',
				user_name: 'required',
				email_address: 'required|email',
				password: "required"
				
			}
		);

	const onSubmit = async (event) => {
		const isValid = await form.validate(event);
		if (isValid) {
			alert('Valid input!');
		} else {
			alert('InValid input!');
		}
	};
	
	// form.register("password",function(value,requirement,attribute){
		
	// 	return value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)
		
	// },"Password must contain at least: one uppercase,lowercase,digit and special character")
	return (
		<form className={styles.SignUpWrapper} noValidate autoComplete="off" onSubmit={onSubmit}>
			<label for= 'firstName'  className={styles.label}> <span className={styles.labelTitle}>First name</span>
				<input id ="firstName" className={styles.inputEl} type= "text" required 
				onChange={(e) => dispatch(getFirstName(e.target.value))}/>
			</label>
			<label for= 'lastName'  className={styles.label}> <span className={styles.labelTitle}>Last name</span>
				<input id ="lastName" className={styles.inputEl} type= "text" required
				onChange={(e) => dispatch(getLastName(e.target.value))}/>
			</label>
			<label for= 'userName'  className={styles.label}> <span className={styles.labelTitle}>User name</span>
				<input id ="userName" className={styles.inputEl} type= "text" required
				onChange={(e) => dispatch(getUserName(e.target.value))}/>
			</label>
			<label for= 'email'  className={styles.label}> <span className={styles.labelTitle}>email</span>
				<input id ="email" className={styles.inputEl} type= "email" required
				onChange={(e) => dispatch(getEmail(e.target.value))}/>
			</label>
			<label for= 'password'  className={styles.label}> <span className={styles.labelTitle}>Password</span>
				<input id ="password" className={styles.inputEl} type= "password" required
				onChange={(e) => dispatch(getPassword(e.target.value))}/>
			</label>
			<label for= 'confirmPassword'  className={styles.label}> <span className={styles.labelTitle}>Confirm Password</span>
				<input id ="confirmPassword" className={styles.inputEl} type= "password" required
				onChange={(e) => dispatch(getPasswordAgain(e.target.value))}/>
			</label>
			<input name='' className={[ styles.inputEl, styles.submitBtn ].join(' ')} type="submit" />

			{/* <label>
				<input onChange={form.handleChangeEvent} value={fields.first_name} name='first_name' className={styles.inputEl} type="text" placeholder="first name" />
				</label>
				<label className='error'>
					{errors.first_name ? errors.first_name : ""}
				</label>
			<label>
				<input onChange={form.handleChangeEvent} value={fields.last_name} name='last_name' className={styles.inputEl} type="text" placeholder="last name" />
				</label>
				<label className='error'>
					{errors.last_name ? errors.last_name : ""}
				</label>
			<label>
				<input onChange={form.handleChangeEvent} value={fields.user_name} name='user_name' className={styles.inputEl} type="text" placeholder="user name" />
				</label>
			<label>
				<input onChange={form.handleChangeEvent} value={fields.email_address} name='email_address' className={styles.inputEl} type="email" placeholder="you@yourEmail.com" />
			</label>
			<label className='error'>
					{errors.user_name ? errors.user_name : ""}
				</label>
			<label>
				<input onChange={form.handleChangeEvent} value={fields.password} name='password' className={styles.inputEl} type="password" placeholder="strong password" />
				</label>
				<label className='error'>
					{errors.password ? errors.password : ""}
				</label>
			<label>
				<input name='' className={[ styles.inputEl, styles.submitBtn ].join(' ')} type="submit" />
				</label> */}
		</form>
	);
};
export default SignUpForm;
