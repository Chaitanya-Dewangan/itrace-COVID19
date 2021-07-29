import React,{useState,useEffect} from 'react';
import "./css/StateCases.css";
// import {MapContainer,TileLayer} from "react-leaflet";
import numeral from "numeral";

function StateCases({ countries, casesType }) {
  const casesTypes = (country) => {
    if (casesType === "cases") {
      return country.cases;
    }
    if (casesType === "recovered") {
      return country.recovered;
    }
    if (casesType === "deaths") {
      return country.deaths;
    }
  };
  console.log(countries);
  return (
    <div className="stateCases">
      {countries?.map((country) => (
        <div className="stateCases__cards">
          <img src={country.countryInfo.flag} alt="" />
          <h3>{country.country}</h3>
          <h2>
            {casesType.toUpperCase()} {casesTypes(country)}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default StateCases;
