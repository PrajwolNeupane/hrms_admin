import axios from "axios";

export default async function logoutAction({
  onSuccess,
  onFailure,
}: {
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
}) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_API_URL}/auth/signout`,
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
