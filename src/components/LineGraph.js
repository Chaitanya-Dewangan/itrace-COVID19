import React,{useState,useEffect} from 'react';
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import "./css/LineGraph.css";
import Skeleton from "@material-ui/lab/Skeleton";


const options = {
  plugins:{   
    legend: {
    display: false
            },
    },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem?.value)?.format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value)?.format("0a");
          },
        },
      },
    ],
  },
};

function LineGraph({ casesType = "cases", country }) {
  let lineColor = "#f7d881";
  if (casesType === "cases") {
    lineColor = "#f7d881";
  }
  if (casesType === "recovered") {
    lineColor = "#56f96a";
  }
  if (casesType === "deaths") {
    lineColor = "#ff524a";
  }

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in country === "worldwide" ? data?.cases : data?.timeline?.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y:
            country === "worldwide"
              ? data[casesType][date] - lastDataPoint
              : data["timeline"][casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint =
        country === "worldwide"
          ? data[casesType][date]
          : data["timeline"][casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    
    const worldwide =
      "https://disease.sh/v3/covid-19/historical/all?lastdays=120";
    const url = `${
      country === "worldwide"
        ? "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
        : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`
    }`;
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(url) 
        ?.then((response) => {
          return response.json();
        })
        .then((data) => {
          let chartData = buildChartData(data, casesType);
          setData(chartData);
          setIsLoading(false);
        });
    };

    fetchData();
  }, [casesType,country]);

  return (
    <div className="lineGraph">
      {isLoading ? (
        <Skeleton animation="wave" height={330} />
      ) : (
        data?.length > 0 && (
          <Line
            data={{
              datasets: [
                {
                  backgroundColor: `${lineColor}a3`,
                  // borderColor: "#CC1034",
                  borderColor: `${lineColor}`,
                  data: data,
                  fill: true,
                },
              ],
            }}
            options={options}
          /> 
          )
          )}
    </div>
  );
}

export default LineGraph
