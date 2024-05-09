import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Text, VStack } from "@chakra-ui/react";
import CustomInput from "../../Components/Input/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  resetPasswordSchema,
  ResetPasswordSchemaInterface,
} from "../../type/form";
import { setResetPassword } from "../../app/reducer/resetPasswordReducer";
import resetPasswordAction from "../../app/api/resetPasswordAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function ResetPassword() {
  const [timer, setTimer] = useState(60); // 1 minute in seconds
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      dispatch(setResetPassword(false));
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer, dispatch]);

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
          Reset Password
        </Text>
        <CustomInput<ResetPasswordSchemaInterface>
          register={register}
          errors={errors}
          name="otp"
          label="OTP"
          placeholder="Enter OTP"
        />
        <CustomInput<ResetPasswordSchemaInterface>
          register={register}
          errors={errors}
          name="newPassword"
          label="New Password"
          placeholder="Enter New Password"
          type="password"
        />
        <CustomInput<ResetPasswordSchemaInterface>
          register={register}
          errors={errors}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Enter Confirm Password"
          type="password"
        />
        <Text color={"brand.500"} fontSize={"xxs"}>
          OTP will expire in {timer} seconds
        </Text>
        <Button
          w={"100%"}
          padding={"10px"}
          bg={"brand.300"}
          color={"dark.500"}
          fontSize={"sm"}
          fontWeight={"regular"}
          _hover={{ backgroundColor: "brand.400" }}
          onClick={handleSubmit((data) => {
            resetPasswordAction({
              body: data,
              onSuccess: () => {
                navigate("/login");
                toast.success("Password Changed");
              },
              onFailure: (error) => {
                if (error.response.status < 500) {
                  toast.error("Invalid OTP");
                } else {
                  toast.error("Server Error");
                }
              },
            });
            console.log(data);
          })}
        >
          Change
        </Button>
      </VStack>
    </VStack>
  );
}
