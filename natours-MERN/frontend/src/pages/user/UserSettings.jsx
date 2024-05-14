import AccountSetting from "./AccountSetting";
import PasswordSetting from "./PasswordSetting";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function UserSettings({ user }) {
  return (
    <MainContainer>
      <AccountSetting curEmail={user.email} curName={user.name} />
      <PasswordSetting />
    </MainContainer>
  );
}

export default UserSettings;
