import { FC, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import authAction from "../app/api/authAction";
import { Text } from "@chakra-ui/react";
import { useAppDispatch } from "../app/store";
import { setAuth } from "../app/reducer/authReducer";

interface Props {}

let MainLayout: FC<Props> = ({}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    authAction({
      onSuccess: (data) => {
        dispatch(setAuth(data.employee));
        setLoading(false);
      },
      onFailure: () => {
        navigate("/login");
        setLoading(false);
      },
    });
  }, []);

  if (loading) return <Text>Loading</Text>;

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
export default MainLayout;
