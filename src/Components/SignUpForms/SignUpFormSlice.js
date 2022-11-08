import { createSlice } from "@reduxjs/toolkit"; 
const initialState = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    passwordAgain: "",
    modalState: false,
    userData : {}
}
const SignUpFormSlice = createSlice({
    name: "signUpSlice",
    initialState,
    reducers: {
        getFirstName: (state,action) => {
            state.firstName = action.payload
        },
        getLastName: (state,action) => {
            state.lastName = action.payload
        },
        getUserName: (state,action) => {
            state.userName = action.payload
        },
        getEmail: (state,action) => {
            state.email = action.payload
        },
        getPassword: (state,action) => {
            state.password = action.payload
        },
        getPasswordAgain: (state,action) => {
            state.passwordAgain = action.payload
        },
        showModal: (state,action) => {
            state.modalState = true
            console.log(`current state: ${state.modalState}`);
        },
        hideModal: (state,action) => {
            state.modalState = false
             console.log(`current state: ${state.modalState}`);
        },
        getUserData: (state,action) => {
            state.userData = action.payload
            console.log(state.userData);
        }
    }

})
export const {
    getEmail
    ,getFirstName,
    getLastName,
    getPassword,
    getPasswordAgain,
    getUserName,
    showModal,
    hideModal,
    getUserData

} = SignUpFormSlice.actions
export default SignUpFormSlice.reducer