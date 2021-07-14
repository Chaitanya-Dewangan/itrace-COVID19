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
import {sortData } from "./util";
import {prettyPrintStat } from "./util";

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
            value: country.countryInfo.iso2,
            flag:country.countryInfo.flag
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

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>iTracer</h1>
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
                  {country.name}{" "}
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
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            onClick={(e) => setCasesType("recovered")}
            bgColor="#8bd483"
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            onClick={(e) => setCasesType("deaths")}
            bgColor="#ff6f68"
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>
      </div>
      <div className="app__right">
        <Card className="app__right">
          <CardContent className="app__rightCardContent">
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
