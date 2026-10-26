import {styled} from "styled-components"
import  ButtonIcon from "./ButtonIcon"
import { FaRegUser } from "react-icons/fa";
import React from 'react'
import { useNavigate } from "react-router-dom";
import Logout from "../features/authentication/Logout";
import DarkMoodTaggle from "./DarkMoodTaggle";
const StyledMenu = styled.ul`
display:flex ;
gap:0.4rem;
`;
const HeaderMenu = () => {
const navigate = useNavigate();

  return (
    <StyledMenu>
      <li>
        <ButtonIcon onClick={()=>navigate('/Account')}>
          <FaRegUser />
        </ButtonIcon>
      </li>
     <li>
      <DarkMoodTaggle />
       </li>
      <li>
         <Logout/>
      </li>
    </StyledMenu>
  )
}

export default HeaderMenu
