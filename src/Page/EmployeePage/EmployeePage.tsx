import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Checkbox,
  Button,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useEffect, useMemo, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import getEmployeeAction from "../../app/api/getEmployeeAction";
import { Employee } from "../../type/interface";
import moment from "moment";
import deleteEmployeeAction from "../../app/api/deleteEmployeeAction";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function EmployeePage() {
  const [data, setData] = useState<Employee[]>([]);

  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    getEmployeeAction({
      onSuccess: (data) => {
        setData(data?.employee);
      },
    });
  }, []);

  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<string[]>([]);

  const new_data = useMemo(() => {
    if (search != "") {
      setSelectedEmployee([]);
      return data.filter(
        (curr) =>
          curr.first_name.toLowerCase().includes(search.toLowerCase()) ||
          curr.middle_name?.toLowerCase().includes(search.toLowerCase()) ||
          curr.last_name.toLowerCase().includes(search.toLowerCase()) ||
          curr.email.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return data;
    }
  }, [search, data]);

  const handleCheckboxChange = (id: string) => {
    if (selectedEmployee.includes(id)) {
      setSelectedEmployee(selectedEmployee.filter((i) => i !== id));
    } else {
      setSelectedEmployee([...selectedEmployee, id]);
    }
  };

  const handleHeaderCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setSelectedEmployee(new_data.map((curr) => curr._id));
    } else {
      setSelectedEmployee([]);
    }
  };

  const view = (id: string) => {
    navigate(`/employee/${id}`);
  };

  return (
    <>
      <VStack padding={"20px 5%"} align={"start"} gap={"30px"}>
        <Breadcrumb
          spacing="4px"
          separator={<ChevronRightIcon color="gray.500" w={"6"} h={"6"} />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to="/employee"
              fontSize={"lg"}
              fontWeight={"semibold"}
              color={"dark.300"}
            >
              Employee
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HStack w={"100%"} justify={"space-between"}>
          <Text fontSize={"md"} fontWeight={"medium"}>
            Employess{" "}
            <Text as={"span"} fontSize={"xs"} color={"gray.600"}>
              ({data.length})
            </Text>
          </Text>
          <HStack w={"40%"}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={CiSearch} h={"6"} w={"6"} color={"brand.500"} />
              </InputLeftElement>
              <Input
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                type="text"
                placeholder="Search Employee"
                fontSize={"sm"}
                colorScheme="purple"
                focusBorderColor="brand.500"
                borderColor={"brand.500"}
                borderWidth={"2px"}
                _hover={{
                  borderColor: "brand.500",
                }}
              />
            </InputGroup>
            <Button
              as={Link}
              leftIcon={<Icon as={IoAddOutline} h={"6"} w={"6"} />}
              fontSize={"xs"}
              fontWeight={"medium"}
              padding={"10px 7%"}
              variant={"outline"}
              border={"2px"}
              borderColor={"brand.500"}
              color={"brand.500"}
              _hover={{
                backgroundColor: "brand.500",
                color: "white",
              }}
              to={"add"}
            >
              Add Employee
            </Button>
            <IconButton
              bgColor={"red.500"}
              color={"white"}
              aria-label="Delete Employee"
              icon={<Icon as={MdDeleteOutline} w={"6"} h={"6"} />}
              _hover={{
                backgroundColor: "red.600",
              }}
              onClick={onOpen}
              isDisabled={selectedEmployee.length === 0}
              _disabled={{
                backgroundColor: "red.400",
              }}
            />
          </HStack>
        </HStack>
        <TableContainer w={"100%"}>
          <Table size={"sm"}>
            <Thead bg={"brand.500"}>
              <Tr>
                <Th padding={"18px"}>
                  <Checkbox
                    colorScheme={"whiteAlpha"}
                    isChecked={selectedEmployee.length === new_data.length}
                    onChange={handleHeaderCheckboxChange}
                  />
                </Th>
                <Th color={"white"}>Employee</Th>
                <Th color={"white"}>Email</Th>
                <Th color={"white"}>Role</Th>
                <Th color={"white"}>Date Joined</Th>
                <Th color={"white"}>Salary</Th>
                <Th color={"white"}>Bank Details</Th>
                <Th color={"white"}>Account Number</Th>
              </Tr>
            </Thead>
            <Tbody>
              {new_data.map((curr, indx) => (
                <Tr
                  cursor={"pointer"}
                  key={indx}
                  _hover={{
                    backgroundColor: "gray.100",
                  }}
                >
                  <Td>
                    <Checkbox
                      colorScheme={"purple"}
                      isChecked={selectedEmployee.includes(curr._id)}
                      onChange={() => {
                        handleCheckboxChange(curr._id);
                      }}
                    />
                  </Td>
                  <Td
                    as={HStack}
                    onClick={() => {
                      view(curr._id);
                    }}
                  >
                    <Avatar size={"sm"} src={curr.photo} />
                    {curr.middle_name != "null" ? (
                      <Text fontSize={"xs"}>
                        {curr.first_name + " " + curr.last_name}
                      </Text>
                    ) : (
                      <Text fontSize={"xs"}>
                        {curr.first_name +
                          " " +
                          curr.middle_name +
                          " " +
                          curr.last_name}
                      </Text>
                    )}
                  </Td>
                  <Td
                    fontSize={"xs"}
                    onClick={() => {
                      view(curr._id);
                    }}
                  >
                    {curr.email}
                  </Td>
                  <Td
                    fontSize={"xs"}
                    onClick={() => {
                      view(curr._id);
                    }}
                  >
                    {curr.roles[0].name}
                  </Td>
                  <Td
                    fontSize={"xs"}
                    onClick={() => {
                      view(curr._id);
                    }}
                  >
                    {moment(curr.date_joined).format("YYYY-MM-DD")}
                  </Td>
                  <Td
                    fontSize={"xs"}
                    onClick={() => {
                      view(curr._id);
                    }}
                  >
                    Rs: {curr.salary}
                  </Td>
                  {curr.bank ? (
                    <Td
                      fontSize={"xs"}
                      onClick={() => {
                        view(curr._id);
                      }}
                    >
                      {curr?.bank?.name + ", " + curr?.bank?.branch}
                    </Td>
                  ) : (
                    <Td
                      fontSize={"xs"}
                      onClick={() => {
                        view(curr._id);
                      }}
                    >
                      ---{" "}
                    </Td>
                  )}
                  {curr?.bank ? (
                    <Td
                      fontSize={"xs"}
                      onClick={() => {
                        view(curr._id);
                      }}
                    >
                      {curr?.bank?.account_number}
                    </Td>
                  ) : (
                    <Td
                      fontSize={"xs"}
                      onClick={() => {
                        view(curr._id);
                      }}
                    >
                      ---
                    </Td>
                  )}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"md"} fontWeight={"medium"}>
            Delete Employee
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>Do you want to delete selected employee ?</ModalBody>
          <ModalFooter gap={"20px"}>
            <Button
              fontSize={"xs"}
              fontWeight={"medium"}
              padding={"10px 7%"}
              variant={"outline"}
              _hover={{
                backgroundColor: "transparent",
              }}
              color={"brand.500"}
              onClick={onClose}
              border={"2px"}
              borderColor={"brand.500"}
            >
              Close
            </Button>
            <Button
              fontSize={"xs"}
              fontWeight={"medium"}
              padding={"10px 7%"}
              variant={"filled"}
              _hover={{
                backgroundColor: "red.600",
              }}
              bgColor={"red.500"}
              color={"white"}
              onClick={() => {
                onClose();
                deleteEmployeeAction({
                  body: { ids: selectedEmployee },
                  onSuccess: () => {
                    toast.success("Employee Account Deleted");
                    getEmployeeAction({
                      onSuccess: (data) => {
                        setData(data?.employee);
                      },
                    });
                  },
                  onFailure: () => {
                    toast.error("Server Error");
                  },
                });
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
