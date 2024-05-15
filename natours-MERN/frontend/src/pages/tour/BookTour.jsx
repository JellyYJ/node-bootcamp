import styled from "styled-components";
import Heading from "../../components/Heading";
import { useMe } from "../user/useMe";
import { useNavigate } from "react-router-dom";
import { getbookTourSession } from "../../api/api";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  padding: 8rem;
  margin-top: 3rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: var(--color-green-100);
  border-radius: 2%;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  background-color: var(--color-green-400);
  border: none;
  color: var(--color-green-0);
  font-size: 2rem;
  border-radius: 5px;
  padding: 1.5rem 2.5rem;
`;

function BookTour({ tourId, slug }) {
  const { isPending, me } = useMe();
  const navigate = useNavigate();

  function handBookBtnClick(e) {
    e.preventDefault();

    if (!me) navigate("/login");

    // go to stripe
    getbookTourSession(tourId);
    // window.location.href = `http://localhost:5173/tour/${slug}`;
  }

  return (
    <Container>
      <Heading as="h4">WHAT ARE YOU WAITING FOR?</Heading>
      <Button onClick={handBookBtnClick}>Book The Tour</Button>
    </Container>
  );
}

export default BookTour;
