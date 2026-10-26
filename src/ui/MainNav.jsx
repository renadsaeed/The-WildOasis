import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { MdOutlineCabin } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Styledlink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

import React from "react";

const MainNav = () => {
  return (
    <nav>
      <NavList>
        <li>
          <Styledlink to="/Dashboard">
            <TiHomeOutline />
            <span>Home</span>
          </Styledlink>
        </li>
        <li>
          <Styledlink to="/Bookings">
            <AiOutlineSchedule />
            <span>Bookings</span>
          </Styledlink>
        </li>
        <li>
          <Styledlink to="/Cabins">
            <MdOutlineCabin />
            <span>Cabins</span>
          </Styledlink>
        </li>
        <li>
          <Styledlink to="/Users">
            <FiUsers />
            <span>Users</span>
          </Styledlink>
        </li>
        <li>
          <Styledlink to="/Settings">
            <IoSettingsOutline />
            <span>Settings</span>
          </Styledlink>
        </li>
      </NavList>
    </nav>
  );
};

export default MainNav;
