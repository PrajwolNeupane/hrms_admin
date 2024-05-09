import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Grid,
  GridItem,
  HStack,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import CustomInput from "../../Components/Input/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addEmplooyeeSchema,
  AddEmployeeSchemaInterface,
} from "../../type/form";
import addEmployeeAction from "../../app/api/addEmployeeAction";
import { toast } from "react-toastify";
import { ChevronRightIcon } from "@chakra-ui/icons";

export default function AddEmployeePage() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(addEmplooyeeSchema),
  });

  const navigate = useNavigate();

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
              to="/employee/add"
              fontSize={"lg"}
              fontWeight={"semibold"}
              color={"dark.300"}
            >
              Add
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Grid
          w={"100%"}
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={"20px"}
        >
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              label="First Name"
              placeholder="Enter First Name"
              type="text"
              register={register}
              name="firstName"
              errors={errors}
            />
          </GridItem>
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              label="Middle Name"
              placeholder="Enter Middle Name"
              type="text"
              register={register}
              name="middleName"
              errors={errors}
            />
          </GridItem>
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              label="Last Name"
              placeholder="Enter Last Name"
              type="text"
              register={register}
              errors={errors}
              name="lastName"
            />
          </GridItem>
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              label="Email"
              placeholder="Enter Email Name"
              type="email"
              register={register}
              errors={errors}
              name="email"
            />
          </GridItem>
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              label="Phone Number"
              placeholder="Enter Phone Number"
              type="number"
              register={register}
              errors={errors}
              name="phoneNumber"
            />
          </GridItem>
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              label="Date of Birth"
              placeholder="Select Date of Birth"
              type="date"
              register={register}
              errors={errors}
              name="dateOfBirth"
            />
          </GridItem>
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              label="Address"
              placeholder="Enter Address"
              type="text"
              register={register}
              errors={errors}
              name="address"
            />
          </GridItem>
          <GridItem
            as={VStack}
            align={"start"}
            fontSize={"xs"}
            fontWeight={"medium"}
          >
            <Text>Gender</Text>
            <Select
              placeholder="Select option"
              focusBorderColor="brand.500"
              fontSize={"sm"}
              {...register("gender")}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
            {errors["gender"]?.message && (
              <Text fontSize={"xs"} color={"red.500"}>
                {errors["gender"]?.message as string}
              </Text>
            )}
          </GridItem>
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              label="Date Joined"
              placeholder="Select Date Joined"
              type="date"
              register={register}
              errors={errors}
              name="dateJoined"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </GridItem>
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              label="Role"
              placeholder="Enter Employee Role"
              type="text"
              register={register}
              errors={errors}
              name="role"
            />
          </GridItem>
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              label="Salary"
              placeholder="Enter Salary"
              type="number"
              register={register}
              errors={errors}
              name="salary"
              defaultValue={0}
            />
          </GridItem>
        </Grid>
        <HStack gap={"30px"} w={"100%"} align={"center"} justify={"end"}>
          <Button
            w={"150px"}
            fontSize={"sm"}
            fontWeight={"medium"}
            color={"white"}
            bgColor={"brand.500"}
            _hover={{
              backgroundColor: "brand.600",
            }}
            onClick={handleSubmit((data) => {
              addEmployeeAction({
                body: data,
                onSuccess: () => {
                  toast.success("Employee Created");
                  navigate("/employee");
                },
                onFailure: () => {
                  toast.error("Server Error");
                },
              });
            })}
          >
            Create
          </Button>
        </HStack>
      </VStack>
    </>
  );
}
