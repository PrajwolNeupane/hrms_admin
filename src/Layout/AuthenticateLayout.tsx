import { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import authAction from "../app/api/authAction";
import { Text } from "@chakra-ui/react";

interface Props {}

let AuthenticateLayout: FC<Props> = ({}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authAction({
      onSuccess: () => {
        navigate("/");
        setLoading(false);
      },
      onFailure: () => {
        setLoading(false);
      },
    });
  }, []);
  if (loading) return <Text>Loading</Text>;

  return (
    <>
      <Outlet />
    </>
  );
};
export default AuthenticateLayout;
