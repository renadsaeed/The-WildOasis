import { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { IoIosMenu } from "react-icons/io";
import { createPortal } from "react-dom";
import { useOutsideClicking } from "../hooks/useOutsideClicking";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;


const MenusContext = createContext();

const Menus = ({children }) => {
  const [selectMenu , setSelectedMenu] = useState('');
  const [position , setPosition] = useState('');
  const closeMenu = ()=>setSelectedMenu('');
  
  return (
   <MenusContext.Provider value={{selectMenu , closeMenu , setSelectedMenu , position , setPosition}}>
    
      {children}
    
   </MenusContext.Provider>
  )
}
function Toggle({id }){
  const {setSelectedMenu , closeMenu , selectMenu , setPosition} = useContext(MenusContext);
  function handelToggleMenu(e){
        e.stopPropagation();
    const rect = e.target.closest('button').getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x ,
      y: rect.height + rect.y + 8
    });

    console.log('rect' , rect);
selectMenu === ''|| selectMenu !== id ? setSelectedMenu(id) : closeMenu();
  }
  

  return (
    <StyledToggle onClick={handelToggleMenu}>
      <IoIosMenu />
    </StyledToggle>
  )
} 
function List({children , id}){
    const { selectMenu  ,  position , closeMenu} = useContext(MenusContext);
     
      const {ref} = useOutsideClicking(()=>{
        closeMenu();
      },false);
  console.log('id', id);
   if (selectMenu !== id) return null;

  return createPortal(
    <StyledList position={ position} ref={ref} >
      {children}
    </StyledList>,
    document.body
  );
}
function Button({children  , icon  , onClick}){
  const {closeMenu} = useContext(MenusContext);

  console.log('onClick' , onClick);
  console.log('Clicked' );
  function handelClick(){
    onClick?.();
    console.log('execed');
    closeMenu();

  }
  return (
    <li >
      <StyledButton onClick={handelClick} >
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  )

}

Menus.Menu = Menu ;
Menus.Toggle = Toggle ;
Menus.List = List ;
Menus.Button = Button ;
export default Menus
