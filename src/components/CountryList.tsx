import React, { ReactChild } from "react";
import { useQuery, gql } from "@apollo/client";
import CountryCard from "./CountryCard";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Country } from "../types";

import { Continent } from "./interfaces/continent";

export const GET_COUNTRIES = gql`
  query GetCountries($countryFilterInput: CountryFilterInput) {
    countries(filter: $countryFilterInput) {
      name
      code
      emoji
    }
  }
`;

export const GET_CONTINENTS = gql`
  query GetContinents($continentFilterInput: ContinentFilterInput) {
    continents(filter: $continentFilterInput) {
      name
      code
    }
  }
`;

const CountryList = () => {
  const [selectedContinent, setSelectedContinent] = React.useState("");

  const { data: continentsData } = useQuery(GET_CONTINENTS);

  const { data, error, loading } = useQuery(GET_COUNTRIES, {
    variables: {
      countryFilterInput: {
        continent: {
          eq: selectedContinent
        }
      }
    }
  });

  const { countries = [] } = data || {};
  const { continents: continentsList = [] } = continentsData || {};

  const handleChangeContinent = (event: SelectChangeEvent) => {
    setSelectedContinent(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <Typography align="center" variant="h2">
        Countries
      </Typography>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Continent</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedContinent}
          label="continent"
          onChange={handleChangeContinent}
        >
          {continentsList.map((continent: Continent) => {
            const { code, name } = continent;
            return (
              <MenuItem key={code} value={code}>
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {countries.map((country: Country) => {
          const { code, name, emoji } = country;
          return (
            <Grid item key={code}>
              <CountryCard code={code} name={name} emoji={emoji} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default CountryList;
