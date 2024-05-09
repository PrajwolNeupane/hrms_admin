import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Button,
  Text,
  Icon,
} from "@chakra-ui/react";
import CustomInput from "../../Components/Input/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { raiseSalarySchema, RaiseSalarySchemaInterface } from "../../type/form";
import { MdOutlineUpgrade } from "react-icons/md";
import raiseSalaryAction from "../../app/api/raiseSalaryAction";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: { id: string; salary: string };
  onSuccess: () => void;
}

export default function RaiseSalaryModal({
  isOpen,
  onClose,
  data,
  onSuccess,
}: Props) {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ resolver: yupResolver(raiseSalarySchema) });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={"md"}>Raise Salary</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text fontSize={"sm"} fontWeight={"semibold"}>
            Current Salary
          </Text>
          <Text fontSize={"md"} fontWeight={"medium"} my={"5px"}>
            {data.salary}
          </Text>
          <CustomInput<RaiseSalarySchemaInterface>
            label={"Raise Salary By"}
            register={register}
            errors={errors}
            name={"salary"}
            type="number"
            defaultValue={0}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            leftIcon={<Icon as={MdOutlineUpgrade} h={"6"} w={"6"} />}
            mr={3}
            fontSize={"xs"}
            fontWeight={"medium"}
            padding={"10px 7%"}
            variant={"filled"}
            _hover={{ backgroundColor: "brand.600" }}
            bgColor={"brand.500"}
            color={"white"}
            onClick={handleSubmit((val) => {
              raiseSalaryAction({
                body: { id: data.id, salary: val.salary },
                onSuccess: () => {
                  onSuccess();
                  onClose();
                  toast.success(`Salary Raised by ${val.salary}`);
                },
                onFailure: () => {
                  toast.error("Server Error");
                },
              });
            })}
          >
            Raise
          </Button>
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
