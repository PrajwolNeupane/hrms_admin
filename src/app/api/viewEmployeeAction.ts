import axios from "axios";

export default async function viewEmployeeAction({
  id,
  onSuccess,
  onFailure,
}: {
  id: string;
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
}) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/dash/employee/view`,
      {
        id: id,
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
