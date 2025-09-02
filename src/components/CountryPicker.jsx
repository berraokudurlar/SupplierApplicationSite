import React, { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

export function CountryPicker({ value, onChange }) {
  const options = useMemo(() => countryList().getData(), []);

  return (
    <Select
      options={options}
      value={options.find((c) => c.value === value)}
      onChange={(c) => onChange(c.value)}
    />
  );
}
