import styled from "styled-components";

import SideNav from "../../components/SideNav";
import Empty from "../../components/Empty";
import UserSettings from "./UserSettings";
import Spinner from "../../components/Spinner";

import { useMe } from "./useMe";

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

  @media only screen and (max-width: 1440px) {
    width: 60%;
    gap: 0rem;
  }

  @media only screen and (max-width: 768px) {
    width: 80%;
    gap: 0rem;
  }
`;

function Account() {
  const { isPending, me } = useMe();
  if (isPending) return <Spinner />;
  if (!me) return <Empty resourceName={"userProfile"} />;

  return (
    <Container>
      <MainContainer>
        <SideNav role={me.role}></SideNav>
        <UserSettings user={me} />
      </MainContainer>
    </Container>
  );
}

export default Account;
