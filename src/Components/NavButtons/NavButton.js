import { HiChevronLeft } from "react-icons/hi";
import { useNavigate } from "react-router";
import style from "./NavButton.module.scss"
export const ButtonBack = (props) =>{
    const navigate = useNavigate();
    const moveToPreviousePage = () => {
      navigate(-1);
    };
    return (
        <button onClick={moveToPreviousePage} className ={style.backBtn}><HiChevronLeft className={style.navigateBackIcon}/></button>
    )
}
export const ButtonForward  = (props) =>{
    const navigate = useNavigate();
    const moveToPreviousePage = () => {
      navigate(1);
    };
    return (
        <button><HiChevronLeft/></button>
    )
}