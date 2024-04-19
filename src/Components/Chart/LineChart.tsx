import ApexCharts from "apexcharts";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function LineChart({
  value,
  label,
  title,
}: {
  value: number[];
  label: number[];
  title: string;
}) {
  const [data, setData] = useState({
    label: Array.from({ length: 30 }, (_, i) => i + 1),
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

  const series = [
    {
      name: "Total Works Worked",
      data: data.value,
      color: "#9d03fc",
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      id: "basic-line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: data.label,
    },
    stroke: {
      width: 3,
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
      series={series}
      type="line"
      height="350px"
      width="100%"
    />
  );
}
