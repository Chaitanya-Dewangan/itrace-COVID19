import React from 'react'
import "./css/Table.css";
import numeral from "numeral";
function Table({ countries }) {
  return (
    <>
    <div className="tableHeading">
      <h1>Country</h1>
      <h1>Cases</h1>
    </div>
    <div className="table">
      {countries.map((country) => (
        <tr>
          <td>
            <img src={country.countryInfo.flag} alt="" />
            {country.country}
          </td>
          <td>
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
    </>
  );
}

export default Table
