import axios from "axios";
import { ChangePasswordSchemaInterface } from "../../type/form";

export default async function changePasswordAction({
  body,
  onSuccess,
  onFailure,
}: {
  body: ChangePasswordSchemaInterface;
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
}) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/auth/admin/changepassword`,
      { currentPassword: body.currentPassword, newPassword: body.newPassword },
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
