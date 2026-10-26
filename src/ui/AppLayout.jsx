import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Aside from "./Aside";
import styled from "styled-components";
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
   overflow-x: hidden;
  overflow-y: auto;
   scrollbar-width: thin;
  scrollbar-color: #888 transparent;
`;
const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
   background-color:var(--color-grey-0);
  height: 100vh;
`;
const Container = styled.div`
  margin: 0 auto;

  max-width: 120rem;
//  background-color:var(--color-grey-0);

padding:1.5rem;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;
const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Header />
      <Aside />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;
