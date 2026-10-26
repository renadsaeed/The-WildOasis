import React from 'react'
import { HiOutlineMoon } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { IoSunnyOutline } from "react-icons/io5";
import {useDarkMode} from "../context/DarkModeContext.jsx"
const DarkMoodTaggle = () => {
    const {darkMode, toggleDarkMode}= useDarkMode();
    console.log('isdark' , darkMode);
  return (
 <ButtonIcon onClick={toggleDarkMode}>
    {darkMode ? <IoSunnyOutline /> :  <HiOutlineMoon /> }
    
     </ButtonIcon>
  )
}

export default DarkMoodTaggle
