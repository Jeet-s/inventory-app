import * as React from "react";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";

import AddLocationDialog from "./AddLocationDialog";
import BlankCard from "./BlankCard";
import store from "../store";

import "./Locations.css";

export default function Locations() {
  const [open, setOpen] = React.useState(false);
  const [locations, setLocations] = React.useState(
    store.getState()?.locations || []
  );

  React.useEffect(() => {
    let unsubscribe = store.subscribe(() => {
      setLocations(store.getState()?.locations || []);
    });

    return unsubscribe;
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div className="locations-container">
      <Fab className="add-button" onClick={handleClickOpen}>
        <span>+</span>
      </Fab>
      <AddLocationDialog open={open} onClose={handleClose} />
      <div className="table-container">
        <table cellSpacing="0" className="table">
          <thead>
            <tr>
              <th>REGION</th>
              <th>COUNTRY</th>
              <th>CURRENCY</th>
              <th align="center">CALLING CODE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {locations.map((row) => (
              <tr key={row.key}>
                <td>{row.region}</td>
                <td>{row.name}</td>
                <td>{row.currency}</td>
                <td align="center">{row.callingCode}</td>
                <td align="center">
                  <Button variant="text" className="edit-button">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!locations?.length && (
          <BlankCard message="Please add new Location by clicking on Add (+) button" />
        )}
      </div>
    </div>
  );
}
