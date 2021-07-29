import "./App.css";
import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from "./components/InfoBox";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import StateCases from "./components/StateCases";
import {sortData } from "./util";
import {prettyPrintStat } from "./util";
import IndiaData from "./components/IndiaData";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  useEffect(() => {
    const fetchData = async () => {
    await fetch("https://corona.lmao.ninja/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })}
    fetchData();
  }, [])
  useEffect(() => {
    
    const getCountriesData = async () => {
      await fetch("https://corona.lmao.ninja/v3/covid-19/countries")
        ?.then((response) => response.json())
        ?.then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.country,
            flag: country.countryInfo.flag,
          }));
          const sortedData =sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide" 
        ? "https://corona.lmao.ninja/v3/covid-19/all"
        : `https://corona.lmao.ninja/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);

    })
  };
 
  const [totalIndiaData, setTotalIndiaData] = useState();
  useEffect(() => {
    const getIndiaData = async () => {
      await fetch("https://disease.sh/v3/covid-19/gov/india")
        ?.then((response) => response.json())
        ?.then((data) => setTotalIndiaData(data));
    };
    getIndiaData();
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/india">
          <IndiaData/>
        </Route>
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        {/* ///////////////////////////////////// */}
        <Route path="/">
          <div className="app">
            <div className="app__left">
              <div className="app__header">
                <h1>Covid-19 {country.toLocaleUpperCase()}</h1>
                <FormControl>
                  <Select
                    onChange={onCountryChange}
                    variant="outlined"
                    className="app__select"
                    value={country}
                  >
                    <MenuItem value="worldwide" className=" app__selectMenu">
                      Worldwide
                    </MenuItem>
                    {countries?.map((country) => (
                      <MenuItem className="app__menu" value={country.value}>
                        {country.name}
                        <img
                          className="app__menuFlag"
                          src={country.flag}
                          alt={country.name}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="app__stats">
                <InfoBox
                  onClick={(e) => setCasesType("cases")}
                  bgColor="#f7d881"
                  title="Covid-19 cases"
                  active={casesType === "cases"}
                  cases={prettyPrintStat(countryInfo.todayCases)}
                  total={prettyPrintStat(countryInfo.cases)}
                />
                <InfoBox
                  onClick={(e) => setCasesType("recovered")}
                  bgColor="#8bd483"
                  title="Recovered"
                  active={casesType === "recovered"}
                  cases={prettyPrintStat(countryInfo.todayRecovered)}
                  total={prettyPrintStat(countryInfo.recovered)}
                />
                <InfoBox
                  onClick={(e) => setCasesType("deaths")}
                  bgColor="#ff6f68"
                  title="Deaths"
                  active={casesType === "deaths"}
                  cases={prettyPrintStat(countryInfo.todayDeaths)}
                  total={prettyPrintStat(countryInfo.deaths)}
                />
              </div>
              <div className="app__stateCases">
                <LineGraph
                  casesType={casesType}
                  country={country.toLocaleLowerCase()}
                />
              </div>
            </div>
            <div className="app__right">
              <Card className="app__right">
                <CardContent className="app__rightCardContent">
                  <Table countries={tableData} casesType={casesType} />
                  <h3>
                    {country} new {casesType}
                  </h3>
                  <LineGraph
                    casesType={casesType}
                    country={country.toLocaleLowerCase()}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
