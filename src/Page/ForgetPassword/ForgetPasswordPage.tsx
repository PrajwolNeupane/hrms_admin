import { Button, Text, VStack } from "@chakra-ui/react";
import CustomInput from "../../Components/Input/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  forgetPasswordSchema,
  ForgetPasswordSchemaInterface,
} from "../../type/form";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { setResetPassword } from "../../app/reducer/resetPasswordReducer";
import ResetPassword from "./ResetPassword";
import forgetPasswordAction from "../../app/api/forgetPasswordAction";
import { toast } from "react-toastify";

export default function ForgetPasswordPage() {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
  });

  const { resetPassword } = useAppSelector((state) => state.ResetPassword);
  const dispatch = useAppDispatch();

  if (resetPassword) {
    return <ResetPassword />;
  }

  return (
    <VStack w={"100%"} h={"100vh"} align={"center"} justify={"center"}>
      <VStack
        w={"30%"}
        align={"stretch"}
        bg={"gray.50"}
        padding={"30px"}
        gap={"20px"}
      >
        <Text color={"brand.500"} fontSize={"rg"} fontWeight={"medium"}>
          Forget Password
        </Text>
        <CustomInput<ForgetPasswordSchemaInterface>
          register={register}
          errors={errors}
          name="email"
          label="Email"
          placeholder="Your Email"
        />
        <Button
          w={"100%"}
          padding={"10px"}
          bg={"brand.300"}
          color={"dark.500"}
          fontSize={"sm"}
          fontWeight={"regular"}
          _hover={{ backgroundColor: "brand.400" }}
          onClick={handleSubmit((data) => {
            forgetPasswordAction({
              body: data,
              onSuccess: () => {
                dispatch(setResetPassword(true));
                toast.success("OTP Send Check Mail");
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
          Send OTP
        </Button>
      </VStack>
    </VStack>
  );
}
