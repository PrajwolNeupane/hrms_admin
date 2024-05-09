import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Grid,
  GridItem,
  HStack,
  Icon,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import viewEmployeeAction from "../../app/api/viewEmployeeAction";
import { Employee } from "../../type/interface";
import { CiEdit } from "react-icons/ci";
import { MdOutlineUpgrade } from "react-icons/md";
import moment from "moment";
import RaiseSalaryModal from "./RaiseSalaryModal";
import { ChevronRightIcon } from "@chakra-ui/icons";
import EditEmployeeModal from "./EditEmployeeModal";

export default function ViewEmployeePage() {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);

  const {
    isOpen: salaryIsOpen,
    onOpen: salaryOnOpen,
    onClose: salaryOnClose,
  } = useDisclosure();

  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onClose: editOnClose,
  } = useDisclosure();

  const fetch = () => {
    viewEmployeeAction({
      id: id!,
      onSuccess: (data) => {
        setEmployeeData(data?.employee);
      },
    });
  };

  useEffect(() => {
    if (id != "" || typeof id != "undefined") {
      fetch();
    }
  }, [id]);

  const InfoCard = ({ title, data }: { title: string; data: string }) => {
    return (
      <GridItem>
        <Text fontSize={"xs"} fontWeight={"regular"}>
          {title}
        </Text>
        <Text fontSize={"rg"} fontWeight={"medium"}>
          {data}
        </Text>
      </GridItem>
    );
  };

  if (employeeData == null) {
    return <div>Closed</div>;
  }

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
          <BreadcrumbItem>
            <BreadcrumbLink
              as={Link}
              to="/employee"
              fontSize={"lg"}
              fontWeight={"semibold"}
              color={"dark.300"}
            >
              View
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <HStack
          align={"start"}
          w={"100%"}
          padding={"40px"}
          border="2px"
          borderColor={"brand.500"}
          borderRadius={"20px"}
          gap={"50px"}
        >
          <Avatar src={employeeData?.photo} w={"200px"} h={"200px"} />
          <Grid
            w={"100%"}
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            <InfoCard
              title="Name"
              data={
                typeof employeeData?.middle_name == "object"
                  ? employeeData?.first_name + " " + employeeData?.last_name
                  : employeeData?.first_name +
                    " " +
                    employeeData?.middle_name +
                    " " +
                    employeeData?.last_name
              }
            />
            <InfoCard title="Email" data={employeeData?.email!} />
            <InfoCard
              title="Phone"
              data={employeeData?.phone ? employeeData?.phone : "Not Provided"}
            />
            <InfoCard
              title="Address"
              data={
                employeeData?.address ? employeeData?.address : "Not Provided"
              }
            />
            <InfoCard
              title="Gender"
              data={
                employeeData?.gender ? employeeData?.gender : "Not Provided"
              }
            />
            <InfoCard
              title="Date of Birth"
              data={
                employeeData?.dob
                  ? moment(employeeData?.dob).format("YYYY-MM-DD")
                  : "Not Provided"
              }
            />
            <InfoCard
              title="Role"
              data={
                employeeData?.roles
                  ? employeeData?.roles[0].name
                  : "Not Provided"
              }
            />
            <InfoCard
              title="Date of Joined"
              data={
                employeeData?.date_joined
                  ? moment(employeeData?.date_joined).format("YYYY-MM-DD")
                  : "Not Provided"
              }
            />
            <InfoCard
              title="Pan Card Number"
              data={
                employeeData?.pan_number
                  ? employeeData?.pan_number
                  : "Not Provided"
              }
            />
            <InfoCard
              title="Salary"
              data={
                employeeData?.salary
                  ? "Rs: " + employeeData?.salary
                  : "Not Provided"
              }
            />
            <InfoCard
              title="Bank Details"
              data={
                employeeData?.bank?.name
                  ? employeeData?.bank?.name + ", " + employeeData?.bank?.branch
                  : "Not Provided"
              }
            />
            <InfoCard
              title="Bank Account Number"
              data={
                employeeData?.bank?.account_number
                  ? employeeData?.bank?.account_number
                  : "Not Provided"
              }
            />
          </Grid>
        </HStack>
        <HStack w={"100%"} justify="end" gap={"20px"}>
          <Button
            leftIcon={<Icon as={MdOutlineUpgrade} h={"6"} w={"6"} />}
            fontSize={"xs"}
            fontWeight={"medium"}
            padding={"10px 2%"}
            variant={"outline"}
            border={"2px"}
            borderColor={"brand.500"}
            color={"brand.500"}
            _hover={{
              backgroundColor: "brand.500",
              color: "white",
            }}
            onClick={() => {
              salaryOnOpen();
            }}
          >
            Raise Salary
          </Button>
          <Button
            leftIcon={<Icon as={CiEdit} h={"6"} w={"6"} />}
            fontSize={"xs"}
            fontWeight={"medium"}
            padding={"10px 4%"}
            color={"whitesmoke"}
            bgColor={"brand.500"}
            _hover={{
              backgroundColor: "brand.600",
            }}
            onClick={editOnOpen}
          >
            Edit
          </Button>
        </HStack>
      </VStack>
      <RaiseSalaryModal
        onSuccess={fetch}
        isOpen={salaryIsOpen}
        onClose={salaryOnClose}
        data={{
          id: employeeData?._id!,
          salary: employeeData?.salary.toString()!,
        }}
      />
      <EditEmployeeModal
        onSuccess={fetch}
        isOpen={editIsOpen}
        onClose={editOnClose}
        data={employeeData}
      />
    </>
  );
}
