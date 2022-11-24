import React from "react"
import styles from "./SignUpForm.module.scss"
import {useNavigate} from "react-router"
import { useFormik} from 'formik';
import {signInExistingUser,authStateObserver,auth} from "../Firebase/Firebase"

import * as Yup from 'yup';
const SignInUser = () => {
   const navigate = useNavigate()
    const goToSettings = () => {
        navigate("/settings")
        
    }
   
 const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Required'),
			password: Yup.string().min(8, "Password must be at least 8 alpha numeric characters").required("Required")

		}),
		onSubmit: (values) => {
           const user =  signInExistingUser(values)
           if(user) navigate('/settings')
           else{
            alert("Sign up first!")
           }
     },
	})
    return (
        <form className={styles.signInUserForm}   autoComplete="off" onSubmit={formik.handleSubmit}>
            <label htmlFor="email" className={styles.label}>
                <span>Email</span>
                <input 
                type="email" 
                className={styles.inputEl} 
                id ="email" 
                onChange={formik.handleChange} 
                required
                value={formik.values.email}
                />
            </label>
            {formik.errors.userName ? <div className={styles.required}>{formik.errors.userName}</div> : null}
            <label htmlFor="password" className={styles.label}>
                <span>Password</span>
                <input 
                type ="password" 
                className={styles.inputEl} 
                onChange={formik.handleChange} 
                id ="password" 
                required
                value= {formik.values.password}
                />
            </label>
            {formik.errors.password ? <div className={styles.required}>{formik.errors.password}</div> : null}
            <div className={styles.CTAButtons}>
                <input 
                type = "submit" 
                className ={[styles.ctaBtn,styles.signIn].join(" ")} 
                value ="SignIn"
                // onClick={goToSettings}
                />
                <input 
                type = "submit" 
                className ={[styles.ctaBtn,styles.signUp].join(' ')} 
                value ="SignUp"
                onClick={() => navigate("/signUpForm")}
                />
            </div>
        </form>
    )
}
export default SignInUser