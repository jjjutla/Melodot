import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: true,
      text: "No Air",
    },
  },
  scales: {
    x: {
      grid: {
        borderColor: "rgba(196, 196, 196, 0.4)",
        color: "transparent",
      },
    },
    y: {
      grid: {
        borderColor: "rgba(196, 196, 196, 0.4)",
        color: "rgba(196, 196, 196, 0.08)",
      },
      //   ticks: {
      //     // Include a dollar sign in the ticks
      //     callback: function (value: any) {
      //       return "$" + value;
      //     },
      //   },
      title: { text: "USD", display: true, font: { size: 16 }, padding: 20 },
    },
  },
};
const labels = [
  "2017 Q1",
  "2017 Q2",
  "2017 Q3",
  "2017 Q4",
  "2018 Q1",
  "2018 Q2",
  "2018 Q3",
  "2018 Q4",
  "2019 Q1",
  "2019 Q2",
  "2019 Q3",
  "2019 Q4",
  "2020 Q1",
  "2020 Q2",
  "2020 Q3",
  "2020 Q4",
  "2021 Q1",
  "2021 Q2",
  "2021 Q3",
  "2021 Q4",
  "2022 Q1",
  "2022 Q2",
];
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const cg = ctx?.createLinearGradient(0, 0, 0, 346);
cg?.addColorStop(0, "rgba(211, 35, 120, 0.5)");
cg?.addColorStop(1, "rgba(85, 59, 150, 0.5)");
const data = {
  labels,
  datasets: [
    {
      data: [
        697.87, 383.9, 476.27, 584.44, 692.8, 538.91, 520.59, 683.75, 673.13,
        495.09, 515.27, 946.89, 946.9, 669.2, 903.1, 1063.69, 981.22, 733.65,
        810.2, 1094.78, 858.65, 879.93,
      ],
      backgroundColor: cg,
    },
  ],
};

const BarChart = () => {
  return <Bar options={options} data={data} height={80} />;
};

export default BarChart;
