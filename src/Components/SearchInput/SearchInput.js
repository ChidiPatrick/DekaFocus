import React from "react"
import style from "./SearchInput.module.scss"
const SearchInput = (props) =>{
    return(
        <input type= "search" className={style.search}
        placeholder="Search"/>
    )
}
export default SearchInput 