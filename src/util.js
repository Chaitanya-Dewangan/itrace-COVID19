
import numeral from "numeral";

export const prettyPrintStat = (stat) => (
  stat ? `${numeral(stat).format("0.0a")}` : "0"
)



export const sortData = (data) => {
  const sortedData = [...data];
            
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1:1))
};

