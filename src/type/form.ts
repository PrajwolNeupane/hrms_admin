import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
  password: yup.string().required("Please enter a password"),
});

type LoginSchemaInterface = yup.InferType<typeof loginSchema>;

const forgetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
});

type ForgetPasswordSchemaInterface = yup.InferType<typeof forgetPasswordSchema>;

const resetPasswordSchema = yup.object().shape({
  otp: yup.string().required("Please enter OTP"),
  newPassword: yup
    .string()
    .required("Please enter new password")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(passwordRules, { message: "Please enter strong password" }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords must match"),
});

type ResetPasswordSchemaInterface = yup.InferType<typeof resetPasswordSchema>;

const addEmplooyeeSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  middleName: yup.string().nullable(),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNumber: yup.string().nullable(),
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

const raiseSalarySchema = yup.object().shape({
  salary: yup
    .number()
    .positive("Salary must be a positive number")
    .required("Salary is required"),
});

type RaiseSalarySchemaInterface = yup.InferType<typeof raiseSalarySchema>;

const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Please enter current password"),
  newPassword: yup
    .string()
    .required("Please enter new password")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(passwordRules, { message: "Please enter strong password" }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords must match"),
});

type ChangePasswordSchemaInterface = yup.InferType<typeof changePasswordSchema>;

export {
  loginSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  addEmplooyeeSchema,
  raiseSalarySchema,
  changePasswordSchema,
};
export type {
  LoginSchemaInterface,
  ForgetPasswordSchemaInterface,
  ResetPasswordSchemaInterface,
  AddEmployeeSchemaInterface,
  RaiseSalarySchemaInterface,
  ChangePasswordSchemaInterface,
};
