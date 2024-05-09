export default function isoToDate(timestamp: string) {
    const date = new Date(timestamp);
    return date.toISOString().split("T")[0];
  }