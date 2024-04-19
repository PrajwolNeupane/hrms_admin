import axios from "axios";
import { LoginSchemaInterface } from "../../type/form";

export default async function loginAction({
  body,
  onSuccess,
  onFailure,
}: {
  body: LoginSchemaInterface;
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
}) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/auth/admin/signin`,
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
