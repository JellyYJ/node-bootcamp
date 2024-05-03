import React from "react";
import styled from "styled-components";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/api";
// import { getLogInUser } from "../api/api";
import { useUser } from "../pages/user/useUser";

const HeaderWrapper = styled.header`
  background-color: var(--color-grey-900);
  padding: 0 8rem;
  height: 8rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 50rem) {
    flex-direction: column;
  }
`;

const LogoImg = styled.img`
  height: 3.5rem;
`;

const Nav = styled.nav`
  display: flex;
`;

const NavItem = styled.a`
  color: var(--color-green-0);
  text-decoration: none;
  margin-left: 2rem;
`;

function Header() {
  // const [user, setUser] = useState(null);
  const { isLoading, user } = useUser();
  console.log(user);

  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Nav>
        <NavItem href="/">All tours</NavItem>
      </Nav>
      <LogoImg src="/logo-white.png" alt="Natours logo" />
      <Nav>
        {user ? (
          <>
            <button type="button" onClick={() => logout()}>
              Log out
            </button>
            <NavItem href="/me">
              <img
                src={`/img/users/${user?.photo}`}
                alt={`Photo of ${user?.name}`}
              />
              <span>{user?.name?.split(" ")[0]}</span>
            </NavItem>
          </>
        ) : (
          <>
            <NavItem href="/login">Log in</NavItem>
            <NavItem href="#">Sign up</NavItem>
          </>
        )}
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
