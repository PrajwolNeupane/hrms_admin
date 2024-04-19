import { Input, Text, VStack, InputProps } from "@chakra-ui/react";
import {
  UseFormRegister,
  FieldValues,
  Path,
  FieldErrors,
} from "react-hook-form";

interface Props<T extends FieldValues> extends InputProps {
  label: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  name: Path<T>;
}

export default function CustomInput<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  ...props
}: Props<T>) {
  return (
    <VStack align={"start"} fontSize={"xs"} fontWeight={"medium"}>
      <Text>{label}</Text>
      <Input
        fontSize={"sm"}
        focusBorderColor="brand.400"
        {...register(name)}
        {...props}
      />
      {errors[name]?.message && (
        <Text fontSize={"xs"} color={"red.500"}>
          {errors[name]?.message as string}
        </Text>
      )}
    </VStack>
  );
}
