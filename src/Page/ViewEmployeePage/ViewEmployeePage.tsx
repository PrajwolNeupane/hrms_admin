import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import viewEmployeeAction from "../../app/api/viewEmployeeAction";
import { Employee } from "../../type/interface";
import moment from "moment";

export default function ViewEmployeePage() {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState<Employee | null>(null);

  useEffect(() => {
    if (id != "" || typeof id != "undefined") {
      viewEmployeeAction({
        id: id!,
        onSuccess: (data) => {
          setEmployeeData(data?.employee);
        },
      });
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

  return (
    <>
      <VStack padding={"20px 5%"} align={"start"} gap={"30px"}>
        <Breadcrumb>
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
      </VStack>
    </>
  );
}
