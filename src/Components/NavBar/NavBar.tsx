import { FC } from "react";
import {
  Avatar,
  Button,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import SideBar from "../SideBar/SideBar";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import logoutAction from "../../app/api/logoutAction";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../app/store";

interface Props {}

let NavBar: FC<Props> = ({}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigation = useNavigate();
  const { auth } = useAppSelector((state) => state.Auth);

  return (
    <>
      <HStack
        w={"100%"}
        bgColor={"brand.500"}
        padding={"10px 5%"}
        justify={"space-between"}
      >
        <IconButton
          icon={<Icon as={RxHamburgerMenu} h={"7"} w={"7"} />}
          aria-label="Icon Button"
          onClick={onOpen}
          bg={"transparent"}
          color={"white"}
          _hover={{
            color: "white",
            backgroundColor: "transparent",
          }}
        />
        <HStack justify={"center"} align={"center"} gap={"10px"}>
          <Avatar
            src={auth.photo}
            size={"md"}
            border={"2px"}
            borderColor={"white"}
          />
          <VStack align={"start"} color={"white"} gap={"0px"}>
            <Text fontSize={"xxs"}>Hello,</Text>
            <Text>{auth.email}</Text>
          </VStack>
          <Button
            onClick={() => {
              logoutAction({
                onSuccess: () => {
                  navigation("/login");
                },
              });
            }}
            ml={"40px"}
            variant={"outline"}
            border={"2px"}
            borderColor={"white"}
            padding={"10px 10px"}
            fontSize={"sm"}
            fontWeight={"medium"}
            color={"white"}
            w={"120px"}
            _hover={{
              backgroundColor: "transparent",
            }}
            rightIcon={
              <Icon as={IoIosLogOut} color={"white"} w={"6"} h={"6"} />
            }
          >
            Logout
          </Button>
        </HStack>
      </HStack>
      <SideBar isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
};

export default NavBar;
