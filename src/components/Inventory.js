import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Locations from "./Locations";
import BlankCard from "./BlankCard";

import "./Inventory.css";

export default function Inventory() {
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="inventory-container">
      <h1 className="inventory-container__title">Inventory</h1>
      <Tabs
        className="inventory-container__tabs"
        value={value}
        onChange={handleTabChange}
      >
        <Tab label="LOCATIONS" />
        <Tab label="COMPANIES" />
        <Tab label="STATS" />
      </Tabs>
      <div hidden={value !== 0}>
        <Locations />
      </div>
      <div hidden={value !== 1}>
        <BlankCard message="No Companies to show currently" />
      </div>
      <div hidden={value !== 2}>
        <BlankCard message="No Stats to show currently" />
      </div>
    </div>
  );
}
