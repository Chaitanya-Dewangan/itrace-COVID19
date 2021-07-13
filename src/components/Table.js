import React from 'react'
import "./css/Table.css";
function Table({ countries }) {
  return (
    <div className="table">
      {countries.map((country) => (
        <tr>
          <td>
            <img src={country.countryInfo.flag} alt="" />
            {country.country}
          </td>
          <td>
            <strong>{country.cases}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table
