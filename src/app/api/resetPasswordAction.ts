import axios from "axios";
import { ResetPasswordSchemaInterface } from "../../type/form";

export default async function resetPasswordAction({
  body,
  onSuccess,
  onFailure,
}: {
  body: ResetPasswordSchemaInterface;
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
}) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/auth//admin/resetpassword`,
      {
        token: body.otp,
        password: body.newPassword,
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
