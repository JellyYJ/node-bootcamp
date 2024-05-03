import { getLogInUser } from "../../api/api";

function Account() {
  getLogInUser();

  return <div>ACCOUNT PAGE</div>;
}

export default Account;
