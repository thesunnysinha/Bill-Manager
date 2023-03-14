import React, { useState } from "react";
import { Button, Grid, TextField, Typography,Modal } from "@mui/material";
import BillList from "./BillList";
import { useSelector } from "react-redux";
import PayableBillList from "./PayableBillList";

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

const PayableBill = ({ flag, setFlag,filterMonth,filterYear }) => {
  const [inputRef, setInputRef] = useState(flag);
  const bills = useSelector((state) => state.bills.bills);
  const filteredBills = bills.filter(
    (bill) =>
      (!filterMonth ||
        (bill.date instanceof Date && bill.date.getMonth() === filterMonth)) &&
      (!filterYear ||
        (bill.date instanceof Date && bill.date.getFullYear() === filterYear))
  );

  const sortedBills = filteredBills.sort((a, b) => b.amount - a.amount);
  let totalAmount =0;
  const selectedBills = [];
  let numBills = 0;

  for(const bill of sortedBills){
    const amount = bill.amount;
    if(totalAmount + amount <= flag){
      totalAmount +=amount;
      selectedBills.push(bill);
      numBills++;
    }
  }

    const [openPaybleBillList, setOpenPaybleBillList] = useState(false);

    const handleOpenPaybleBillList = (bill) => {
      setOpenPaybleBillList(false);
    };

    const handleClosePaybleBillList = () => {
      setOpenPaybleBillList(false);
    };

  return (
    <>
      <Modal open={openPaybleBillList} onClose={handleClosePaybleBillList}>
        <div style={styles.paper}>
          <PayableBillList filteredBills={selectedBills} numBills={numBills} />
        </div>
      </Modal>
      <Grid item xs={12} spacing={2}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <h2>Payable Bills</h2>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <TextField
            label="Enter Your Monthly Budget"
            type="number"
            onChange={(e) => setInputRef(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            onClick={() => {
              setFlag(inputRef), setOpenPaybleBillList(true);
            }}
          >
            Save
          </Button>
        </Grid>
        
      </Grid>
    </>
  );
};

export default PayableBill;
