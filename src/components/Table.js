import React from 'react'
import "./css/Table.css";
import numeral from "numeral";
function Table({ countries, casesType }) {
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
  return (
    <>
      <div className="tableHeading">
        <h1>Country</h1>
        <h1>{casesType}</h1>
      </div>
      <div className="table">
        {countries.map((country) => (
          <tr>
            <td>
              <img src={country.countryInfo.flag} alt="" />
              {country.country}
            </td>
            <td>
              <strong>{numeral(casesTypes(country)).format("0,0")}</strong>
            </td>
          </tr>
        ))}
      </div>
    </>
  );
}

export default Table
