import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.footer`
  background-color: #f7f7f7;
  padding: 6rem 4rem 3rem 4rem;
  font-size: 1.4rem;
  display: grid;
  grid-template-columns: auto auto;
  grid-row-gap: 0.75rem;
  justify-content: space-between;

  @media only screen and (max-width: 50em) {
    grid-template-columns: 1fr;
    grid-row-gap: 1.25rem;
    justify-items: center;
  }
`;

const Logo = styled.div`
  grid-row: 1 / 3;
  align-self: center;

  @media only screen and (max-width: 50em) {
    grid-row: 1;
  }
`;

const LogoImg = styled.img`
  height: 3rem;
`;

const Nav = styled.ul`
  list-style: none;
  display: flex;
`;

const NavItem = styled.li`
  margin-left: 1.5rem;
`;

const NavLink = styled.a`
  color: #777;
  text-decoration: none !important;
  transition: all 0.2s;

  &:hover,
  &:active {
    color: #55c57a;
  }
`;

const Copyright = styled.p`
  justify-self: end;
  color: #999;

  @media only screen and (max-width: 50em) {
    justify-self: center;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Logo>
        <LogoImg src="/logo-green.png" alt="Natour logo" />
      </Logo>
      <Nav>
        <NavItem>
          <NavLink href="#">About us</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Download apps</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Become a guide</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Careers</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Contact</NavLink>
        </NavItem>
      </Nav>
      <Copyright>
        &copy; by Yijia Liu. Original from Jonas NodeJS Udemy course.
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer;
