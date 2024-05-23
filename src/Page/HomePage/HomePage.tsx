import { FC, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import LineChart from "../../Components/Chart/LineChart";
import BarChart from "../../Components/Chart/BarChart";
import dashAction from "../../app/api/dashAction";
import { AdminDashboardData } from "../../type/interface";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";

interface Props {}

const HomePage: FC<Props> = ({}) => {
  const [data, setData] = useState<AdminDashboardData>();

  useEffect(() => {
    dashAction({
      onSuccess: (data) => {
        setData(data);
      },
    });
  }, []);

  return (
    <VStack padding={"20px 5%"} align={"start"} gap={"30px"}>
      <Breadcrumb
        spacing="4px"
        separator={<ChevronRightIcon color="gray.500" w={"6"} h={"6"} />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            to="/"
            fontSize={"lg"}
            fontWeight={"semibold"}
            color={"dark.300"}
          >
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Grid
        w={"100%"}
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        <GridItem
          w="100%"
          padding={"20px"}
          border={"2px"}
          borderColor={"brand.500"}
          borderRadius={"10px"}
        >
          <Text fontWeight={"medium"}>Total Employee</Text>
          <Text fontWeight={"medium"} fontSize={"xl"}>
            {data?.employeeCount}
          </Text>
        </GridItem>
        <GridItem
          w="100%"
          padding={"20px"}
          border={"2px"}
          borderColor={"brand.500"}
          borderRadius={"10px"}
        >
          <Text fontWeight={"medium"}>Hours Worked in Week</Text>
          <Text fontWeight={"medium"} fontSize={"xl"}>
            {data?.totalHoursThisWeek}
          </Text>
        </GridItem>
        <GridItem
          w="100%"
          padding={"20px"}
          border={"2px"}
          borderColor={"brand.500"}
          borderRadius={"10px"}
        >
          <Text fontWeight={"medium"}>Employee Present Today</Text>
          <Text fontWeight={"medium"} fontSize={"xl"}>
            {data?.employeesPresentToday}
          </Text>
        </GridItem>
        <GridItem
          w="100%"
          padding={"20px"}
          border={"2px"}
          borderColor={"brand.500"}
          borderRadius={"10px"}
        >
          <Text fontWeight={"medium"}>Employee Absent Today</Text>
          <Text fontWeight={"medium"} fontSize={"xl"}>
            {data?.employeesAbsentToday}
          </Text>
        </GridItem>
      </Grid>
      <HStack w={"100%"} gap={6}>
        <VStack
          align={"stretch"}
          w={"50%"}
          border={"2px"}
          borderColor={"brand.500"}
          borderRadius={"10px"}
          padding={"20px"}
        >
          <LineChart
            series="Attendance"
            title="Total Attendance"
            value={data?.employeeAttendance!}
            label={Array.from({ length: 30 }, (_, i) => i + 1)}
          />
        </VStack>
        <VStack
          align={"stretch"}
          w={"50%"}
          border={"2px"}
          borderColor={"brand.500"}
          borderRadius={"10px"}
          padding={"20px"}
        >
          <BarChart
            series="Total Employee Added"
            title="Employee Number"
            value={data?.employeeCreated!}
            label={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
          />
        </VStack>
      </HStack>
      <VStack
        align={"stretch"}
        w={"100%"}
        border={"2px"}
        borderColor={"brand.500"}
        borderRadius={"10px"}
        padding={"20px"}
      >
        <LineChart
          series="Hours worked"
          title="Hours Worked"
          value={data?.employeeWorkHour!}
          label={Array.from({ length: 30 }, (_, i) => i + 1)}
        />
      </VStack>
    </VStack>
  );
};

export default HomePage;
