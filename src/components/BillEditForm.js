import React, { useEffect } from "react";
import { TextField, Button, Grid, MenuItem } from "@mui/material";

const styles = {
  paper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "2rem",
  },
};

const categories = [
  "Food and Dining",
  "Utility",
  "Shopping",
  "Education",
  "Personal Care",
  "Travel",
];

const BillEditForm = ({ handleSubmit, currentBill, setCurrentBill }) => {
  return (
    <div style={styles.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  value={currentBill.description}
                  onChange={(e) =>
                    setCurrentBill({
                      ...currentBill,
                      description: e.target.value,
                    })
                  }
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Category"
                  variant="outlined"
                  value={currentBill.category}
                  onChange={(e) =>
                    setCurrentBill({
                      ...currentBill,
                      category: e.target.value,
                    })
                  }
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amount"
                  variant="outlined"
                  type="number"
                  min="0"
                  step="0.01"
                  value={currentBill.amount}
                  onChange={(e) =>
                    setCurrentBill({
                      ...currentBill,
                      amount: parseFloat(e.target.value),
                    })
                  }
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="date"
                  value={new Date(currentBill.date)
                    .toISOString()
                    .substring(0, 10)}
                  onChange={(e) =>
                    setCurrentBill({
                      ...currentBill,
                      date: e.target.value,
                    })
                  }
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
    </div>
  );
};

export default BillEditForm;
