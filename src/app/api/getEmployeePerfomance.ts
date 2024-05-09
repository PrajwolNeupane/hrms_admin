import axios from "axios";

export default async function getEmployeePerfomance({
  onSuccess,
  onFailure,
}: {
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
}) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_REACT_API_URL}/dash/admin/performance`,
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
