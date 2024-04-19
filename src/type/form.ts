import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: yup.string().required("Please enter a password"),
});

type LoginSchemaInterface = yup.InferType<typeof loginSchema>;

const addEmplooyeeSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  middleName: yup.string(),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: yup.string(),
  dateOfBirth: yup.string().required("Date of Birth is required"),
  address: yup.string().required("Address is required"),
  gender: yup.string().oneOf(["Male", "Female"]).required("Gender is required"),
  dateJoined: yup.string().required("Date Joined is required"),
  role: yup.string().required("Role is required"),
  salary: yup
    .number()
    .positive("Salary must be a positive number")
    .required("Salary is required"),
});

type AddEmployeeSchemaInterface = yup.InferType<typeof addEmplooyeeSchema>;

export { loginSchema, addEmplooyeeSchema };
export type { LoginSchemaInterface, AddEmployeeSchemaInterface };
