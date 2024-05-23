import ApexCharts from "apexcharts";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function BarChart({
  value,
  label,
  title,
  series,
}: {
  value: number[];
  label: string[];
  title: string;
  series: string;
}) {
  const [data, setData] = useState({
    label: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    value: Array.from({ length: 30 }, () => 0),
    title: "",
  });

  useEffect(() => {
    setData({
      value: value,
      label: label,
      title,
    });
  }, [value, label]);

  const options: ApexCharts.ApexOptions = {
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.label,
    },
    stroke: {
      width: 0,
    },
    title: {
      text: title,
      align: "left",
      margin: 0,
      offsetX: 0,
      offsetY: 10, // Adjust the offsetY as needed to reduce the gap
      floating: false,
      style: {
        fontSize: "18px",
        fontWeight: "500",
        fontFamily: "Poppins",
        color: "#424242",
      },
    },
  };

  return (
    <Chart
      options={options}
      series={[
        {
          name: series,
          data: data.value,
          color: "#9d03fc",
        },
      ]}
      type="bar"
      height="350px"
      width="100%"
    />
  );
}
