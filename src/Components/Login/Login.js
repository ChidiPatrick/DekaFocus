import React,{useEffect,useState} from "react"
import {Link,useNavigate} from "react-router-dom"
import {auth,signInWithEmailAndPassword,signInWithGoogle} from "../Firebase/Firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import styles from "./Login.module.scss"

function Login() {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate();
    useEffect(() => {
        if(loading) {
            return
        }
        if(user) navigate("/dashboard")
    },[user,loading]);
    return (
        <div className={styles.Login}>
            <div className={styles.LoginContainer}>
                <input type="text" className={styles.LoginTextBox} value ={email} 
                onChange ={(e) => setEmail(e.target.value)}/>
            </div>
        </div>
    )
}