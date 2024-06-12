import {useCookies} from "react-cookie";

const useUser = () => {
  const [cookies] = useCookies(["user"]);

  return cookies.user;
};

export default useUser;
