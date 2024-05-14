import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 15rem;
  left: 0;
  height: 100vh;
  width: 35%;
  background-color: white;
  z-index: 999;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;

  @media only screen and (max-width: 512px) {
    width: 50%;
  }
`;

function OverlayMenu({ children }) {
  return <ModalOverlay>{children}</ModalOverlay>;
}

export default OverlayMenu;
