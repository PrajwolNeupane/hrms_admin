import axios from "axios";

export default async function getEmployeeAction({
  onSuccess,
  onFailure,
}: {
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
}) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_API_URL}/dash/employee`,
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
