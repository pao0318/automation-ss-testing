import React, { useState } from 'react';
import { Button, Select, MenuItem, InputLabel, FormControl, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  filters: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  formControl: {
    minWidth: 120,
  },
});

const Filters = ({ onFilterChange }) => {
  const classes = useStyles();
  const [statusFilter, setStatusFilter] = useState('');

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleFilterClick = () => {
    let filteredStatus = statusFilter;

    // Consider "PickupComplete" as equivalent to "Delivered"
    if (statusFilter === "Delivered") {
      filteredStatus = ["Delivered", "PickupComplete"];
    }

    onFilterChange(filteredStatus);
  };

  return (
    <div className={classes.filters}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="status-filter-label">Status</InputLabel>
        <Select
          labelId="status-filter-label"
          id="status-filter"
          value={statusFilter}
          onChange={handleStatusChange}
          label="Status"
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="InProgress">InProgress</MenuItem>
          <MenuItem value="Delivered">Delivered</MenuItem>
          <MenuItem value="Returned">Returned</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleFilterClick}>
        Filter
      </Button>
    </div>
  );
};

export default Filters;
