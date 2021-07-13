import React from "react";
import "./css/InfoBox.css";
import {Card,CardContent,Typography} from "@material-ui/core";

function abbreviateNumber(value) {
  var newValue = value;
  if (value >= 1000) {
    var suffixes = ["", "k", "m", "b", "t"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = "";
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum !== 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision)
      );
      var dotLessShortValue = (shortValue + "").replace(/[^a-zA-Z 0-9]+/g, "");
      if (dotLessShortValue.length <= 2) {
        break;
      }
    }
    if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
    newValue = shortValue + suffixes[suffixNum];
  }
  return newValue;
}


function InfoBox({ title, cases, total , bgColor}) {
  return (
    <Card className="infoBox">
      <CardContent style={{ backgroundColor: `${bgColor ? bgColor : "#333"}` }}>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h1 className="infoBox__cases">
          {cases ? abbreviateNumber(cases)  : "000"} <span style={{ color: "#0000002b" }}>Today</span>
        </h1>
        <Typography className="infoBox__total" color="textSecondary">
          {total ? abbreviateNumber(total)  : "000"} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
