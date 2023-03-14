import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid
} from "@mui/material";

const PayableBillList = ({filteredBills,numBills}) => {
  return (
    <>
    <Grid item xs={12} spacing={2}>
      <Grid item xs={12}>
          <h2>Minimum number of bills to be paid :- {numBills}</h2>
        </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          {filteredBills ? (
            <TableBody>
              {filteredBills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell>{bill.description}</TableCell>
                  <TableCell>{bill.category}</TableCell>
                  <TableCell>${bill.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(bill.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <Typography>No Bills Yet</Typography>
          )}
        </Table>
      </TableContainer>
    </Grid>
    
    </>
  );
}

export default PayableBillList