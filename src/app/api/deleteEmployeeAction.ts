import axios from "axios";

export default async function deleteEmployeeAction({
  body,
  onSuccess,
  onFailure,
}: {
  body: { ids: string[] };
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
}) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/dash/employee/delete`,
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
