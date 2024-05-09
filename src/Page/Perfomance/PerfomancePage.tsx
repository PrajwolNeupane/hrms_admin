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
  Button,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { IoAddOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useEffect, useMemo, useState } from "react";
import { EmployeePerfomance } from "../../type/interface";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import getEmployeePerfomance from "../../app/api/getEmployeePerfomance";

export default function EmployeePage() {
  const [data, setData] = useState<EmployeePerfomance[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getEmployeePerfomance({
      onSuccess: (data) => {
        setData(data);
      },
    });
  }, []);

  const [search, setSearch] = useState("");

  const new_data = useMemo(() => {
    if (search != "") {
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
              Performance
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
          </HStack>
        </HStack>
        <TableContainer w={"100%"}>
          <Table size={"sm"}>
            <Thead bg={"brand.500"}>
              <Tr>
                <Th color={"white"}>Employee</Th>
                <Th color={"white"}>Email</Th>
                <Th color={"white"}>Total Hours Worked</Th>
                <Th color={"white"}>Hours Work (Month)</Th>
                <Th color={"white"}>Average Working Hour</Th>
                <Th color={"white"}>Total Absent (Month)</Th>
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
                  <Td
                    as={HStack}
                    onClick={() => {
                      view(curr.id);
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
                      view(curr.id);
                    }}
                  >
                    {curr.email}
                  </Td>
                  <Td
                    fontSize={"xs"}
                    onClick={() => {
                      view(curr.id);
                    }}
                  >
                    {curr.totalWorkedTime}
                  </Td>
                  <Td
                    fontSize={"xs"}
                    onClick={() => {
                      view(curr.id);
                    }}
                  >
                    {curr.totalWorkedTimeThisMonth}
                  </Td>
                  <Td
                    fontSize={"xs"}
                    onClick={() => {
                      view(curr.id);
                    }}
                  >
                    {curr.averageWorkedTime}
                  </Td>
                  <Td
                    fontSize={"xs"}
                    onClick={() => {
                      view(curr.id);
                    }}
                  >
                    {curr.totalAbsentThisMonth}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </>
  );
}
