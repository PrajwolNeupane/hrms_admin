import axios from "axios";

export default async function authAction({
  onSuccess,
  onFailure,
}: {
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
}) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_API_URL}/auth`,
      { withCredentials: true }
    );
    if (onSuccess != undefined) {
      onSuccess(response.data);
    }
  } catch (e) {
    if (onFailure != undefined) {
      onFailure(e);
    }
  }
}
