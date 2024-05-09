import axios from "axios";

export default async function getAttendanceLog({
  body,
  onSuccess,
  onFailure,
}: {
  body: { date: string };
  onSuccess?: (data: any) => void;
  onFailure?: (error: any) => void;
}) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/attendance/employees`,
      {
        date: body.date,
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
