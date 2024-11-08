import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

interface ChartAcceuilType {
  min: number;
  max: number;
  index: number;
  step: number;
  icon: JSX.Element;
  title: string;
  subTitle: string;
}

export function ChartAcceuil({
  min,
  max,
  index,
  step,
  icon,
  title,
  subTitle,
}: ChartAcceuilType) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
    scales: {
      y: {
        max: max,
        min: min,
        ticks: {
          stepSize: step,
          color: "#fff",
          font: {
            size: 20,
          },
          padding: 14,
        },
        border: {
          display: false,
          dash: [6, 12],
        },
        grid: {
          /* display: true, */ // Show grid lines
          /*  drawOnChartArea: true, */ // Draw grid lines on the chart area
          /* drawTicks: true, */ // Draw ticks on the grid lines
          color: "white", // Color of the grid lines
          /*  lineWidth: 1, */ // Width of the grid lines
          /* tickBorderDash: [45, 5], */
          /* tickBorderDashOffset: 25, */
        },
      },
      x: {
        ticks: {
          color: "#fff",
          font: {
            size: 20,
          },
          padding: 14,
        },
        border: {
          display: index === 0 ? true : false,
          dash: [6, 12],
        },
        grid: {
          display: index === 0 ? true : false, // Show grid lines
          /*  drawOnChartArea: true, */ // Draw grid lines on the chart area
          /* drawTicks: true, */ // Draw ticks on the grid lines
          color: "white", // Color of the grid lines
          /*  lineWidth: 1, */ // Width of the grid lines
          /* tickBorderDash: [45, 5], */
          /* tickBorderDashOffset: 25, */
        },
      },
    },
  };

  const labels = [
    "Jan",
    "Fev",
    "Mar",
    "Avr",
    "Mai",
    "Jun",
    "Jui",
    "Aou",
    "sep",
    "nov",
    "dec",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => faker.number.float({ min: min, max: max })),
        borderColor: "rgb(255, 255, 255)",
        backgroundColor: "rgba(255, 255, 255, 1)",
        pointRadius: 7,
        /*  pointStyle: 'circle', // Style of the points
            pointRadius: 5, // Radius of the points
            pointBackgroundColor: 'blue' // Color of the points 
            fill: false,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
             borderDash: [10, 5],
            */
      },
    ],
  };

  return (
    <div className="px-3 flex-col gap-3 bg-white shadow-2xl">
      <Line
        options={options}
        data={data}
        className={`text-white pb-5 px-3 pt-4 rounded-xl mt-10 h-[190px] ${
          (index + 1) % 2 === 0 ? "bg-[#e91e63] " : "bg-[#191919]"
        }`}
      />
      <div className="flex flex-col gap-3 text-[#191919] text-[14px]  pr-3  pb-5 mt-5">
        <div className=" flex items-center font-bold gap-3">
          {" "}
          <div className=" mr-2"> {icon} </div> <p>{title}</p>
        </div>
        <p> {subTitle} </p>
      </div>
    </div>
  );
}
