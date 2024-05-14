import { useUser } from "./useUser";
import SideNav from "../../components/SideNav";
import Empty from "../../components/Empty";
import styled from "styled-components";
import UserSettings from "./UserSettings";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

const MainContainer = styled.div`
  width: 50%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10rem;

  @media only screen and (max-width: 1024px) {
    width: 60%;
    gap: 0rem;
  }

  @media only screen and (max-width: 768px) {
    width: 80%;
    gap: 0rem;
  }
`;

function Account() {
  const { isPending, user } = useUser();

  return (
    <Container>
      {user ? (
        <MainContainer>
          <SideNav role={user.role}></SideNav>
          <UserSettings user={user} />
        </MainContainer>
      ) : (
        <Empty resourceName={"user"} />
      )}
    </Container>
  );
}

export default Account;
