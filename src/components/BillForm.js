import React, { useState } from "react";
import { Button, Grid, Select, MenuItem, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const BillForm = ({ onSubmit }) => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());

  const categories = [
    "FoodNDining",
    "Utility",
    "Shopping",
    "Education",
    "Personal Care",
    "Travel",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBill = {
      id: uuidv4(),
      description,
      category,
      amount: parseFloat(amount),
      date,
    };
    onSubmit(newBill);
    setDescription("");
    setCategory("");
    setAmount(0);
    setDate(new Date());
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                label="Category"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <MenuItem value="" disabled>
                  Select a category
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amount"
                variant="outlined"
                type="number"
                inputMode="numeric"
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                type="date"
                value={date.toISOString().slice(0, 10)}
                onChange={(e) => setDate(new Date(e.target.value))}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default BillForm;
