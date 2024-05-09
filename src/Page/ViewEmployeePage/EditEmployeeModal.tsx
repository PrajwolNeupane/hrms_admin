import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Text,
  ModalFooter,
  Button,
  Icon,
  Grid,
  GridItem,
  Select,
  VStack,
} from "@chakra-ui/react";
import CustomInput from "../../Components/Input/CustomInput";
import {
  addEmplooyeeSchema,
  AddEmployeeSchemaInterface,
} from "../../type/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Employee } from "../../type/interface";
import isoToDate from "../../Helper/isoToDate";
import { CiEdit } from "react-icons/ci";
import editEmployeeAction from "../../app/api/editEmployeeAction";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: Employee;
  onSuccess: () => void;
}

export default function EditEmployeeModal({
  isOpen,
  onClose,
  data,
  onSuccess,
}: Props) {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(addEmplooyeeSchema),
    defaultValues: {
      firstName: data.first_name,
      middleName: data.middle_name,
      lastName: data.last_name,
      email: data.email,
      phoneNumber: data.phone,
      address: data.address,
      gender:
        data.gender === "male" || data.gender === "Male" ? "Male" : "Female",
      dateJoined: isoToDate(data.date_joined),
      dateOfBirth: isoToDate(data.dob),
      role: data.roles[0]?.name,
      salary: data.salary,
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"6xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={"md"} fontWeight={"medium"}>
          Edit Employee
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody
          pb={6}
          as={Grid}
          gap={6}
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
        >
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              register={register}
              errors={errors}
              name="firstName"
              label="First Name"
            />
          </GridItem>
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              register={register}
              errors={errors}
              name="middleName"
              label="Middle Name"
            />
          </GridItem>
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              register={register}
              errors={errors}
              name="lastName"
              label="Last Name"
            />
          </GridItem>
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              register={register}
              errors={errors}
              name="phoneNumber"
              label="Phone"
            />
          </GridItem>
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              register={register}
              errors={errors}
              name="address"
              label="Address"
            />
          </GridItem>
          <GridItem>
            <CustomInput<AddEmployeeSchemaInterface>
              register={register}
              errors={errors}
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
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
        </ModalBody>
        <ModalFooter>
          <Button
            fontSize={"xs"}
            fontWeight={"medium"}
            padding={"10px 7%"}
            variant={"filled"}
            _hover={{ backgroundColor: "red.600" }}
            bgColor={"red.500"}
            color={"white"}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            leftIcon={<Icon as={CiEdit} h={"6"} w={"6"} />}
            ml={6}
            fontSize={"xs"}
            fontWeight={"medium"}
            padding={"10px 7%"}
            variant={"filled"}
            _hover={{ backgroundColor: "brand.600" }}
            bgColor={"brand.500"}
            color={"white"}
            onClick={handleSubmit((val) => {
              editEmployeeAction({
                body: val,
                onSuccess: () => {
                  onSuccess();
                  toast.success("Employee Edited");
                  onClose();
                },
                onFailure: () => {
                  toast.error("Server Error");
                },
              });
            })}
          >
            Edit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
