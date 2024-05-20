import AccountSetting from "./AccountSetting";
import PasswordSetting from "./PasswordSetting";
import SplitComponent from "../../components/Split";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

function UserSettings({ user }) {
  // console.log(user);
  return (
    <MainContainer>
      <AccountSetting
        curEmail={user.email}
        curName={user.name}
        curPic={user.photo}
      />
      <SplitComponent />
      <PasswordSetting />
    </MainContainer>
  );
}

export default UserSettings;
