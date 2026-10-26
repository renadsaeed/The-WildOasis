
import React from 'react'
import ButtonIcon from "../../ui/ButtonIcon"
import { IoLogOutOutline } from "react-icons/io5";
import { useLogout } from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';
const Logout = () => {
const {logout , isLoading} =useLogout();
  return (
    <ButtonIcon onClick={logout}>
   {isLoading ? <SpinnerMini/> :  <IoLogOutOutline  />}
     </ButtonIcon>
  )
}

export default Logout
