import React from "react";
import styled from "styled-components";
import { useUser } from "../pages/user/useUser";
import { useLogout } from "../pages/user/useLogout";

const HeaderWrapper = styled.header`
  background-color: var(--color-grey-900);
  padding: 0 5rem;
  height: 8rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const LogoImg = styled.img`
  height: 3.5rem;
  display: block;

  @media only screen and (max-width: 768px) {
    display: none; /* Hide logo on smaller screens */
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

const NavItem = styled.a`
  color: var(--color-green-0);
  text-decoration: none;
  margin-left: 3rem;
  transition: transform 0.3s ease;
  font-size: 1.5rem;

  &:hover {
    transform: translateY(-0.3rem);
  }
`;

const ProfileImg = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--color-white);
  cursor: pointer;
  transition: color 0.3s;
`;

function Header() {
  const { isPending, user } = useUser();
  const { isLoggingout, logout } = useLogout();

  return (
    <HeaderWrapper>
      <LogoImg src="/logo-white.png" alt="Natours logo" />
      <Nav>
        <NavItem href="/">ALL TOURS</NavItem>
        {user ? (
          <>
            <NavItem>
              <LogoutButton
                disabled={isPending || isLoggingout}
                onClick={logout}
              >
                LOG OUT
              </LogoutButton>
            </NavItem>

            <NavItem href="/me">
              <ProfileImg
                src={`/img/users/${user.photo}`}
                alt={`Photo of ${user.name}`}
              />
              {/* <UserName>{user?.name?.split(" ")[0]}</UserName> */}
            </NavItem>
          </>
        ) : (
          <>
            <NavItem href="/login">LOG IN</NavItem>
            <NavItem href="/signup">SIGN UP</NavItem>
          </>
        )}
      </Nav>
    </HeaderWrapper>
  );
}

export default Header;
