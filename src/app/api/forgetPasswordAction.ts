import axios from "axios";
import { ForgetPasswordSchemaInterface } from "../../type/form";

export default async function forgetPasswordAction({
  body,
  onSuccess,
  onFailure,
}: {
  body: ForgetPasswordSchemaInterface;
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
}) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/auth/forgetpassword`,
      {
        email: body.email,
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
