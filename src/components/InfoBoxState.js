import React,{useEffect} from "react";
import "./css/InfoBox.css";
import {Card,CardContent,Typography} from "@material-ui/core";





function InfoBoxState({ title, cases, total ,active, bgColor,...props}) {
  
  return (
    <Card
      className={`infoBox ${active && "infoBoxMain--selected"} `}
      style={{ bordeBottomColor: `9x solid ${bgColor}` }}
      onClick={props.onClick}
    >
      <CardContent
        className={`infoBoxCard ${active && "infoBox--selected"}`}
        style={{ backgroundColor: `${bgColor ? bgColor : "#333"}` }}
      >
        <Typography className="infoBox__title" color="textSecondary">
          {title ? title : "Covid19 cases"}
        </Typography>
        <h1 className="infoBox__cases">
          {cases ? `+${cases}` : "000"}
          {/* <span style={{ color: "#0000002b" }}>Today </span>  */}
        </h1>
        <Typography className="infoBox__total" color="textSecondary">
          {total ? total : "000"} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBoxState;
