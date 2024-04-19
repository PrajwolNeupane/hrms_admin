import axios from "axios";
import { AddEmployeeSchemaInterface } from "../../type/form";

export default async function addEmployeeAction({
  body,
  onSuccess,
  onFailure,
}: {
  body: AddEmployeeSchemaInterface;
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
}) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/auth/employee/signup`,
      {
        first_name: body.firstName,
        middle_name: body.middleName,
        last_name: body.lastName,
        email: body.email,
        phone: body.phoneNumber,
        gender: body.gender,
        dob: body.dateOfBirth,
        address: body.address,
        date_joined: body.dateJoined,
        salary: body.salary,
        role: body.role,
      },
      { withCredentials: true }
    );
    if (onSuccess) {
      onSuccess(response.data);
    }
  } catch (e) {
    if (onFailure) {
      onFailure(e);
    }
  }
}
