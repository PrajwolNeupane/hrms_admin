import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import getAttendanceLog from "../../app/api/getAttendanceLog";
import { AttendaceLog } from "../../type/interface";

const data = [
  {
    photo: "https://example.com/avatar1.jpg",
    first_name: "John",
    middle_name: "Michael",
    last_name: "Doe",
    email: "johndoe@example.com",
    roles: [
      {
        name: "Software Engineer",
      },
    ],
    date_joined: "2022-03-15",
    salary: 80000,
    bank: {
      name: "ABC Bank",
      branch: "Main Street",
      account_number: "1234567890",
    },
  },
  {
    photo: "https://example.com/avatar2.jpg",
    first_name: "Jane",
    middle_name: null,
    last_name: "Smith",
    email: "janesmith@example.com",
    roles: [
      {
        name: "Product Manager",
      },
    ],
    date_joined: "2021-09-01",
    salary: 120000,
    bank: {
      name: "XYZ Bank",
      branch: "Downtown",
      account_number: "0987654321",
    },
  },
  {
    photo: "https://example.com/avatar3.jpg",
    first_name: "Bob",
    middle_name: "James",
    last_name: "Williams",
    email: "bobwilliams@example.com",
    roles: [
      {
        name: "UI/UX Designer",
      },
    ],
    date_joined: "2023-01-10",
    salary: 90000,
    bank: null,
  },
];

export default function AttendancePage() {
  const [data, setData] = useState<AttendaceLog[]>([]);
  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const new_data = useMemo(() => {
    if (search != "") {
      return data.filter(
        (curr) =>
          curr?.employee.first_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          curr?.employee.middle_name
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          curr?.employee.last_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          curr.employee.email.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return data;
    }
  }, [search, data]);

  useEffect(() => {
    getAttendanceLog({
      body: { date: date },
      onSuccess: (data) => {
        console.log(data);
        setData(data);
      },
      onFailure: (error) => {
        console.log(error);
      },
    });
  }, [date]);

  return (
    <VStack padding={"20px 5%"} align={"start"} gap={"30px"}>
      <Breadcrumb
        spacing="4px"
        separator={<ChevronRightIcon color="gray.500" w={"6"} h={"6"} />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            to="/attendance"
            fontSize={"lg"}
            fontWeight={"semibold"}
            color={"dark.300"}
          >
            Attendance Log
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <HStack w={"100%"} justify={"space-between"}>
        <Text fontSize={"md"} fontWeight={"medium"}>
          Employess
          <Text as={"span"} fontSize={"xs"} color={"gray.600"}>
            ({new_data.length})
          </Text>
        </Text>
        <HStack w={"40%"} align={"center"} justify={"center"}>
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
          <Input
            fontSize={"sm"}
            w={"50%"}
            focusBorderColor="brand.500"
            type="date"
            border={"2px"}
            borderColor={"brand.500"}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </HStack>
      </HStack>
      <TableContainer w={"100%"}>
        <Table size={"sm"}>
          <Thead bg={"brand.500"}>
            <Tr>
              <Th color={"white"}>Date</Th>
              <Th color={"white"}>Employee</Th>
              <Th color={"white"}>Clock In</Th>
              <Th color={"white"}>Clock Out</Th>
              <Th color={"white"}>Total Time Worked</Th>
              <Th color={"white"}>Email</Th>
              <Th color={"white"}>Role</Th>
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
                <Td fontSize={"xs"}>
                  {moment(curr?.createdAt).format("YYYY-MM-DD")}
                </Td>
                <Td as={HStack}>
                  <Avatar size={"sm"} src={curr?.employee?.photo} />
                  {curr?.employee?.middle_name != "null" ? (
                    <Text fontSize={"xs"}>
                      {curr?.employee?.first_name +
                        " " +
                        curr?.employee?.last_name}
                    </Text>
                  ) : (
                    <Text fontSize={"xs"}>
                      {curr?.employee?.first_name +
                        " " +
                        curr?.employee?.middle_name +
                        " " +
                        curr?.employee?.last_name}
                    </Text>
                  )}
                </Td>
                <Td fontSize={"xs"}>{curr?.clockIn}</Td>
                <Td fontSize={"xs"}>{curr?.clockOut}</Td>
                <Td fontSize={"xs"}>{curr?.timeDifference}</Td>
                <Td fontSize={"xs"}>{curr?.employee?.email}</Td>
                <Td fontSize={"xs"}>{curr?.employee?.roles[0]?.name}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}
