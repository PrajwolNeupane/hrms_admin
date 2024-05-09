import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../Components/Input/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  changePasswordSchema,
  ChangePasswordSchemaInterface,
} from "../../type/form";
import { CiEdit } from "react-icons/ci";
import changePasswordAction from "../../app/api/changePasswordAction";
import { toast } from "react-toastify";

export default function ChangePasswordPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const navigate = useNavigate();

  return (
    <VStack padding={"20px 5%"} align={"start"} gap={"30px"}>
      <Breadcrumb
        spacing="4px"
        separator={<ChevronRightIcon color="gray.500" w={"6"} h={"6"} />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink
            as={Link}
            to="/password/change"
            fontSize={"lg"}
            fontWeight={"semibold"}
            color={"dark.300"}
          >
            Change Password
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack w={"40%"} align={"stretch"} gap={"20px"}>
        <CustomInput<ChangePasswordSchemaInterface>
          register={register}
          errors={errors}
          label="Current Password"
          type="password"
          name="currentPassword"
          placeholder="********"
        />
        <CustomInput<ChangePasswordSchemaInterface>
          register={register}
          errors={errors}
          label="New Password"
          type="password"
          name="newPassword"
          placeholder="********"
        />
        <CustomInput<ChangePasswordSchemaInterface>
          register={register}
          errors={errors}
          label="Confrim Password"
          type="password"
          name="confirmPassword"
          placeholder="********"
        />
        <Button
          leftIcon={<Icon as={CiEdit} h={"6"} w={"6"} />}
          fontSize={"xs"}
          fontWeight={"medium"}
          padding={"10px 7%"}
          variant={"filled"}
          _hover={{ backgroundColor: "brand.600" }}
          bgColor={"brand.500"}
          color={"white"}
          onClick={handleSubmit((val) => {
            changePasswordAction({
              body: val,
              onSuccess: () => {
                toast.success("Password Changed");
                navigate("/");
              },
              onFailure: (error) => {
                if (error.response.status < 500) {
                  toast.error(error.response.data.message);
                } else {
                  toast.error("Server Error");
                }
              },
            });
          })}
        >
          Edit
        </Button>
      </VStack>
    </VStack>
  );
}
