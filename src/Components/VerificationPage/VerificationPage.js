import { defaultListboxReducer } from "@mui/base"
import React from "react"
import styles from "./VerificationPage.module.scss"
import { useSelector,useDispatch } from "react-redux"
const VerifyEmail = ({verify = false}) => {
    //// TO DO////
    //1. Use position to dynamically render this component
    const userData = useSelector(state => state.signUpSlice.userData)
    console.log(userData.email);
    return (
        <div className={verify ? styles.verifyEmailWrapper : styles.hidden}>
            <div className={styles.innerEmmailWrapper}>
                <h3 className={styles.verifyEmailHeader}>Thanks for Registering With Us!</h3>
                <p className={styles.verifyEmailParagraph}>We just sent you a verification email. Please verify your account to complete your registration</p>
                <a href = {`mailto: ${userData.email}`}>Verify Email</a>
            </div>
            
        </div>
    )
}
export default VerifyEmail