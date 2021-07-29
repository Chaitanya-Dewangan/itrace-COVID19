import React, { useState, useEffect } from "react";
import "./css/IndiaData.css";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBoxState from "./InfoBoxState";
import numeral from "numeral";
import { sortStateData } from "../util";

function CommaSep(n) {
  return numeral(n).format("0,0");
}

function turncate(str, n) {
  return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

function IndiaData() {
  const casesTypes = (state) => {
    if (casesType === "cases") {
      return state.cases;
    }
    if (casesType === "recovered") {
      return state.recovered;
    }
    if (casesType === "deaths") {
      return state.deaths;
    }
  };
  const [totalIndiaData, setTotalIndiaData] = useState();
  const [selectState, setSelectState] = useState("India");
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    const getIndiaData = async () => {
      await fetch("https://disease.sh/v3/covid-19/gov/india")
        ?.then((response) => response.json())
        ?.then((data) => {
          setTotalIndiaData(data);

        });
    };
    getIndiaData();
  }, []);
  useEffect(() => {
    const getIndiaData = async () => {
      await fetch("https://disease.sh/v3/covid-19/gov/india")
        ?.then((response) => response.json())
        ?.then((data) => {
          setTotalIndiaData(data);

        });
    };
    getIndiaData();
  }, []);
    // console.log(totalIndiaData);
  return (
    <div className="indiaData">
      {/* <div className="indiaData__left">
        <div className="indiaData__header">
          <h1>
            Covid-19 Cases <strong>{turncate(selectState, 12)}</strong>
          </h1>
          <FormControl>
            <Select
              onChange={(e) => setSelectState(e.target.value)}
              className="indiaData__headerSelect"
              variant="outlined"
              value={selectState}
            >
              <MenuItem className="indiaData__headerSelectMenu" value="India">
                India
              </MenuItem>
              {totalIndiaData?.states?.map((state) => (
                <MenuItem
                  className="indiaData__headerSelectMenu"
                  value={state.state}
                >
                  {turncate(state.state,12)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="indiaData__stats">
          <InfoBoxState
            bgColor="#ffffff3a"
            onClick={() => setCasesType("cases")}
            active={casesType === "cases"}
            // title={}
            // total={}
            // cases={}
          />
          <InfoBoxState
            bgColor="#ffffff3a"
            onClick={() => setCasesType("recovered")}
            active={casesType === "recovered"}
            // title={}
            // total={}
            // cases={}
          />
          <InfoBoxState
            bgColor="#ffffff3a"
            onClick={() => setCasesType("deaths")}
            active={casesType === "deaths"}
            // title={}
            // total={}
            // cases={}
          />
        </div>
      </div> */}
      <div className="indiaData__left">
        <div className="indiaData__rightHeading">
          <h1>India's State Data</h1>
        </div>
        <div className="indiaData__rightTable">
          {totalIndiaData?.states?.map((state) => (
            <tr>
              <td>{state.state}</td>
              <td>{casesTypes(state)}</td>
            </tr>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IndiaData;
