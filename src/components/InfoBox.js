import React from "react";
import "./css/InfoBox.css";
import {Card,CardContent,Typography} from "@material-ui/core";





function InfoBox({ title, cases, total , bgColor,...props}) {
  return (
    <Card className="infoBox" onClick={props.onClick}>
      <CardContent style={{ backgroundColor: `${bgColor ? bgColor : "#333"}` }}>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h1 className="infoBox__cases">
          {cases ? cases : "000"}{" "}
          <span style={{ color: "#0000002b" }}>Today</span>
        </h1>
        <Typography className="infoBox__total" color="textSecondary">
          {total ? total : "000"} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
