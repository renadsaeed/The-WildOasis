import styled from "styled-components";
import imglogolight from "../data/img/logo-light.png";
import imglogodark from "../data/img/logo-dark.png";
import {useDarkMode} from "../context/DarkModeContext.jsx"
const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
   const {darkMode, toggleDarkMode}= useDarkMode();
    console.log('isdark' , darkMode);
  return (
    <StyledLogo>
      <Img src={darkMode? imglogodark : imglogolight} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
