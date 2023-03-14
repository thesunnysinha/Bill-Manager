import React from "react";
import { Grid, MenuItem, Select } from "@mui/material";

const BillFilters = ({ months, years, filterCategory, setFilterCategory,filterMonth,
setFilterMonth,
filterYear,
setFilterYear }) => {

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            fullWidth
          >
            <MenuItem value="All Categories">All Categories</MenuItem>
            <MenuItem value="FoodNDining">Food & Dining</MenuItem>
            <MenuItem value="Utility">Utility</MenuItem>
            <MenuItem value="Shopping">Shopping</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Personal Care">Personal Care</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} md={4}>
          {months.length!== 0 ? (
            <Select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              fullWidth
              displayEmpty
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {new Date(0, month).toLocaleString("default", {
                    month: "long",
                  })}
                </MenuItem>
              ))}
            </Select>
          ) : null}
        </Grid>
        <Grid item xs={12} md={4}>
          {years.length !== 0 ? (
            <Select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              fullWidth
              displayEmpty
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

export default BillFilters;
