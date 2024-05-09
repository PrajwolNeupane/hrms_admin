import axios from "axios";
import { RaiseSalarySchemaInterface } from "../../type/form";

interface Body extends RaiseSalarySchemaInterface {
  id: string;
}

export default async function raiseSalaryAction({
  body,
  onSuccess,
  onFailure,
}: {
  body: Body;
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
}) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/dash/employee/salary`,
      body,
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
