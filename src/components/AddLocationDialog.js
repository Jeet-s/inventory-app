import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormik } from "formik";

import { addLocation } from "../actions";
import store from "../store";

import "./AddLocationDialog.css";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function AddLocationDialog(props) {
  const { onClose, open } = props;
  const [countriesList, setCountriesList] = React.useState([]);
  const [blankCountriesMessage, setBlankCountriesMessage] = React.useState(
    "No Countries to show"
  );

  const locationForm = useFormik({
    initialValues: {
      region: "",
      country: "",
    },
    validate: formValidator,
    onSubmit: (values, { resetForm }) => {
      store.dispatch(addLocation(values.country));
      resetForm();
      setCountriesList([]);
      onClose();
    },
  });

  const handleRegionChange = (event) => {
    setCountriesList([]);
    setBlankCountriesMessage("Loading Countries...");
    locationForm.handleChange(event);
    fetch(`https://restcountries.com/v3.1/region/${event.target.value}`).then(
      async (res) => {
        let countries = await res.json();
        countries = getContriesObject(countries);
        setCountriesList(countries);
        setBlankCountriesMessage("");
      }
    );
  };

  return (
    <Dialog className="location-dialog" onClose={onClose} open={open}>
      <DialogTitle>ADD A LOCATION</DialogTitle>

      <form className="dialog-content" onSubmit={locationForm.handleSubmit}>
        <FormControl
          required
          error={locationForm.touched.region && !!locationForm.errors.region}
          className="form-control"
        >
          <InputLabel>Select Region</InputLabel>
          <Select
            label="Select Region"
            onChange={handleRegionChange}
            id="region"
            name="region"
            onBlur={locationForm.handleBlur}
            value={locationForm.values.region}
            MenuProps={{ PaperProps: { sx: { maxHeight: 280 } } }}
          >
            {regions.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          required
          error={locationForm.touched.country && !!locationForm.errors.country}
          className="form-control"
        >
          <InputLabel>Select Country</InputLabel>
          <Select
            label="Select Country"
            onChange={locationForm.handleChange}
            id="country"
            name="country"
            onBlur={locationForm.handleBlur}
            value={locationForm.values.country}
            MenuProps={{ PaperProps: { sx: { maxHeight: 280 } } }}
          >
            {!countriesList?.length && (
              <MenuItem disabled>{blankCountriesMessage}</MenuItem>
            )}
            {countriesList.map((c) => (
              <MenuItem key={c.key} value={c}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="text" className="add-button" type="submit">
          Add
        </Button>
      </form>
    </Dialog>
  );
}

const formValidator = (values) => {
  const errors = {};

  if (!values.region) {
    errors["region"] = "Region is required";
  }

  if (!values.country) {
    errors["country"] = "Country is required";
  }

  return errors;
};

const getContriesObject = (countries) => {
  countries = countries.filter(
    (c) => !store.getState().locations.some((x) => x.ccn3 === c.ccn3)
  );

  return countries
    .map((c) => ({
      key: c.ccn3,
      region: c.region,
      name: c.name.common,
      currency: Object.values(c.currencies)[0]["name"],
      callingCode: c.idd.root + c.idd.suffixes.join(""),
    }))
    .sort((a, b) => (a.name < b.name ? -1 : 1));
};
