import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { TfiDashboard } from "react-icons/tfi";
import { GoPeople } from "react-icons/go";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

function DrawerExample({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const path = useLocation();

  const links = [
    {
      icon: TfiDashboard,
      title: "Dashboard",
      link: "/",
    },
    {
      icon: GoPeople,
      title: "View Employee",
      link: "/employee",
    },
    {
      icon: IoIosAddCircleOutline,
      title: "Add Employee",
      link: "/employee/add",
    },
  ];

  const LinkItem = ({
    title,
    icon,
    link,
  }: {
    title: string;
    icon: IconType;
    link: string;
  }) => {
    const isActive = path.pathname === link;
    if (isActive) {
      return (
        <HStack
          gap={"20px"}
          cursor={"pointer"}
          as={Link}
          to={link}
          onClick={onClose}
        >
          <Icon as={icon} w={"6"} h={"6"} color={"brand.500"} />
          <Text fontSize={"rg"} fontWeight={"medium"} color={"brand.500"}>
            {title}
          </Text>
        </HStack>
      );
    } else {
      return (
        <HStack
          gap={"20px"}
          cursor={"pointer"}
          as={Link}
          to={link}
          onClick={onClose}
        >
          <Icon as={icon} w={"6"} h={"6"} />
          <Text fontSize={"rg"} fontWeight={"medium"}>
            {title}
          </Text>
        </HStack>
      );
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            as={VStack}
            alignItems={"flex-start"}
            justifyItems={"flex-start"}
          >
            <Image
              src="https://5.imimg.com/data5/SELLER/Default/2021/11/VM/HB/DS/33697925/hrms-computer-software-developers-500x500.jpg"
              width={"120px"}
            />
          </DrawerHeader>
          <DrawerBody gap={"20px"} as={VStack} align={"start"}>
            {links.map((curr, indx) => (
              <LinkItem
                title={curr.title}
                icon={curr.icon}
                link={curr.link}
                key={indx}
              />
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default DrawerExample;
