import styled from "styled-components";
import React, { useState, useEffect } from "react";

import UserNav from "./UserNav";
import AdminNav from "./AdminNav";
import OverlayMenu from "./OverlayMenu";
import Split from "./Split";

import { useDetectClickOutside } from "../utils/useDetectClickOutside";
import { IoMdMenu } from "react-icons/io";

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  position: relative;
`;

const ToggleButton = styled.button`
  border-radius: 0.8rem;
  background-color: var(--color-green-50);
  color: var(--color-green-800);
  font-size: 2.5rem;
  top: 1rem;
  left: 1.5rem;
  border: none;
  cursor: pointer;
  position: absolute;
  z-index: 1000;
`;

function SideNav({ role }) {
  const [isCollapse, setIsCollapse] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const collapseRef = useDetectClickOutside(() => setIsCollapse(true));

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1440);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggle = () => setIsCollapse(!isCollapse);

  return (
    <nav ref={collapseRef}>
      {role === "admin" ? (
        <>
          {isSmallScreen ? (
            <ToggleButton onClick={toggle}>
              <IoMdMenu />
            </ToggleButton>
          ) : (
            <NavContainer>
              <UserNav />
              <Split />
              <AdminNav />
            </NavContainer>
          )}

          {isSmallScreen && !isCollapse && (
            <NavContainer>
              <OverlayMenu>
                <UserNav />
                <AdminNav />
              </OverlayMenu>
            </NavContainer>
          )}
        </>
      ) : (
        <>
          {isSmallScreen ? (
            <ToggleButton onClick={toggle}>
              <IoMdMenu />
            </ToggleButton>
          ) : (
            <NavContainer>
              <UserNav />
            </NavContainer>
          )}

          {isSmallScreen && !isCollapse && (
            <NavContainer>
              <OverlayMenu>
                <UserNav />
              </OverlayMenu>
            </NavContainer>
          )}
        </>
      )}
    </nav>
  );
}

export default SideNav;
