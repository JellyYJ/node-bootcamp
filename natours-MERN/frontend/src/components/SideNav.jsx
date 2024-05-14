// import React, { useState, useEffect } from "react";
// import UserNav from "./UserNav";
// import AdminNav from "./AdminNav";
// import styled from "styled-components";
// import { useDetectClickOutside } from "../utils/useDetectClickOutside";
// import { IoMdMenu } from "react-icons/io";

// const NavContainer = styled.div`
//   display: ${(props) => (props.isCollapse ? "none" : "flex")};
//   flex-direction: column;
//   gap: 5rem;
//   position: relative;

//   @media only screen and (min-width: 1024px) {
//     display: flex;
//   }
// `;

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 999;
// `;

// const ToggleButton = styled.button`
//   border-radius: 0.8rem;
//   background-color: var(--color-green-50);
//   color: var(--color-green-800);
//   font-size: 2.5rem;
//   top: 1rem;
//   left: 1.5rem;
//   border: none;
//   cursor: pointer;
//   position: absolute;
//   z-index: 2;

//   @media only screen and (min-width: 1024px) {
//     display: none;
//   }
// `;

// function SideNav({ role }) {
//   const [isCollapse, setIsCollapse] = useState(true);
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
//   const collapseRef = useDetectClickOutside(() => setIsCollapse(true));

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth < 1024);
//     };

//     handleResize(); // Initial check
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggle = () => setIsCollapse(!isCollapse);

//   return (
//     <nav ref={isSmallScreen ? collapseRef : null}>
//       {role === "admin" ? (
//         <>
//           {isSmallScreen && (
//             <ToggleButton onClick={toggle}>
//               <IoMdMenu />
//             </ToggleButton>
//           )}

//           <NavContainer isCollapse={isCollapse}>
//             <ModalOverlay onClick={toggle}>
//               <UserNav />
//               <AdminNav />
//             </ModalOverlay>
//           </NavContainer>
//         </>
//       ) : (
//         <UserNav />
//       )}
//     </nav>
//   );
// }

// export default SideNav;

// import React, { useState, useEffect } from "react";
// import UserNav from "./UserNav";
// import AdminNav from "./AdminNav";
// import styled from "styled-components";
// import { useDetectClickOutside } from "../utils/useDetectClickOutside";
// import { IoMdMenu } from "react-icons/io";
// import OverlayMenu from "./OverlayMenu";

// const NavContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 5rem;
//   position: relative;

//   @media only screen and (min-width: 1024px) {
//     display: ${(props) => (props.isCollapse ? "none" : "flex")};
//   }
// `;

// const ToggleButton = styled.button`
//   border-radius: 0.8rem;
//   background-color: var(--color-green-50);
//   color: var(--color-green-800);
//   font-size: 2.5rem;
//   top: 1rem;
//   left: 1.5rem;
//   border: none;
//   cursor: pointer;
//   position: absolute;
//   z-index: 999;

//   @media only screen and (min-width: 1024px) {
//     display: none;
//   }
// `;

// function SideNav({ role }) {
//   const [isCollapse, setIsCollapse] = useState(true);
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
//   const collapseRef = useDetectClickOutside(() => setIsCollapse(true));

//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth < 1024);
//     };

//     handleResize(); // Initial check
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggle = () => setIsCollapse(!isCollapse);

//   return (
//     <nav ref={isSmallScreen ? collapseRef : null}>
//       {role === "admin" ? (
//         <>
//           {isSmallScreen && (
//             <ToggleButton onClick={toggle}>
//               <IoMdMenu />
//             </ToggleButton>
//           )}

//           {isSmallScreen && !isCollapse ? (
//             <NavContainer>
//               <OverlayMenu>
//                 <UserNav />
//                 <AdminNav />
//               </OverlayMenu>
//             </NavContainer>
//           ) : (
//             <NavContainer>
//               <UserNav />
//               <AdminNav />
//             </NavContainer>
//           )}
//         </>
//       ) : (
//         <UserNav />
//       )}
//     </nav>
//   );
// }

// export default SideNav;

import React, { useState, useEffect } from "react";
import UserNav from "./UserNav";
import AdminNav from "./AdminNav";
import styled from "styled-components";
import { useDetectClickOutside } from "../utils/useDetectClickOutside";
import { IoMdMenu } from "react-icons/io";
import OverlayMenu from "./OverlayMenu";

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
  z-index: 1000; /* Increased z-index */
`;

function SideNav({ role }) {
  const [isCollapse, setIsCollapse] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const collapseRef = useDetectClickOutside(() => setIsCollapse(true));

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
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
        <UserNav />
      )}
    </nav>
  );
}

export default SideNav;
