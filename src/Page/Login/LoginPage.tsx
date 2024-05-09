import { Button, Input, Text, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, LoginSchemaInterface } from "../../type/form";
import loginAction from "../../app/api/loginAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaInterface>({
    resolver: yupResolver(loginSchema),
  });

  const navigate = useNavigate();

  //hrms_innovation@gmail.com
  //S@fn39tb$$

  return (
    <VStack
      align={"center"}
      w={"100%"}
      h={"100vh"}
      bg={"text.200"}
      justify={"center"}
      as={"form"}
      onSubmit={handleSubmit((data) => {
        loginAction({
          body: data,
          onSuccess: () => {
            navigate("/");
          },
          onFailure: (data) => {
            console.log(data);
            toast.error(data.response.data.message);
          },
        });
      })}
    >
      <VStack
        w={"30%"}
        bg={"white"}
        borderRadius={"8px"}
        padding={"20px"}
        align={"start"}
        gap={"20px"}
      >
        <Text fontSize={"xl"} color={"brand.500"} fontWeight={"medium"}>
          Login
        </Text>
        <VStack w={"100%"} align={"start"} mt={"20px"}>
          <Text fontSize={"xs"} color={"dark.500"} fontWeight={"regular"}>
            Email
          </Text>
          <Input
            placeholder="Your Email"
            fontSize={"xs"}
            type="email"
            focusBorderColor="brand.400"
            {...register("email")}
          />
          {errors["email"] && (
            <Text fontSize={"xxs"} color={"red"} fontWeight={"regular"}>
              {errors["email"].message}
            </Text>
          )}
        </VStack>
        <VStack w={"100%"} align={"start"}>
          <Text fontSize={"xs"} color={"dark.500"} fontWeight={"regular"}>
            Password
          </Text>
          <Input
            placeholder="Your Password"
            fontSize={"xs"}
            type="password"
            focusBorderColor="brand.400"
            {...register("password")}
          />
          {errors["password"] && (
            <Text fontSize={"xxs"} color={"red"} fontWeight={"regular"}>
              {errors["password"].message}
            </Text>
          )}
        </VStack>
        <Text as={Link} to={"/password/forget"} fontSize={"xxs"} color={'gray.600'}>Forget Password</Text>
        <Button
          w={"100%"}
          padding={"10px"}
          bg={"brand.300"}
          color={"dark.500"}
          fontSize={"sm"}
          fontWeight={"regular"}
          _hover={{ backgroundColor: "brand.400" }}
          type="submit"
        >
          Login
        </Button>
      </VStack>
    </VStack>
  );
}
