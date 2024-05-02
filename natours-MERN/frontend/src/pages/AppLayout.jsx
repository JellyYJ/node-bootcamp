import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-rows: 10rem 1fr;
  height: 100vh;
`;

const Main = styled.main`
  position: relative;
  background-color: var(--color-grey-0);
  padding: 5rem 6rem 8rem;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </StyledAppLayout>
  );
}

export default AppLayout;
