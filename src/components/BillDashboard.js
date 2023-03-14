import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBill } from "../redux/BillSlice";
import BillForm from "./BillForm";
import TimeSeriesChart from "./TimeSeriesChart";
import BillList from "./BillList";
import BillFilters from "./BillFilters";
import { Button, Grid, Modal } from "@mui/material";
import PayableBill from "./PayableBill";

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

const BillDashboard = () => {
  // Redux selectors and dispatch
  const bills = useSelector((state) => state.bills.bills);
  const dispatch = useDispatch();

  // Local state
  const [openAddBill, setOpenAddBill] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All Categories");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [flag, setFlag] = useState();

  // Handlers
  const handleAddBill = (bill) => {
    dispatch(addBill(bill));
    setFilterMonth(bill.date.getMonth());
    setFilterYear(bill.date.getFullYear());
    setOpenAddBill(false);
  };

  const handleCloseAddBill = () => {
    setOpenAddBill(false);
  };

  // Calculations
  const totalBilledAmount = bills
    ? bills.reduce((total, bill) => total + bill.amount, 0)
    : 0;

  const months = [...new Set(bills.map((bill) => bill.date.getMonth()))];
  const years = [...new Set(bills.map((bill) => bill.date.getFullYear()))];

  // Filter bills by category, month, and year
  const filteredBills = bills.filter(
    (bill) =>
      (!filterCategory ||
        filterCategory === "All Categories" ||
        bill.category === filterCategory) &&
      (!filterMonth ||
        (bill.date instanceof Date && bill.date.getMonth() === filterMonth)) &&
      (!filterYear ||
        (bill.date instanceof Date && bill.date.getFullYear() === filterYear))
  );

  return (
    <>
      {/* Modal */}
      <Modal open={openAddBill} onClose={handleCloseAddBill}>
        <div style={styles.paper}>
          <BillForm onSubmit={handleAddBill} />
        </div>
      </Modal>

      {/* Grid */}
      <Grid container spacing={2}>
        {/* Title */}
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <h2>Bills Dashboard</h2>
        </Grid>

        {/* Total billed amount and time series chart */}
        <Grid item xs={12} md={6}>
          <h3>Total Monthly Billed Amount: {totalBilledAmount}</h3>
          {bills && (
            <TimeSeriesChart
              filterMonth={filterMonth}
              filterYear={filterYear}
            />
          )}
        </Grid>

        {/* Add bill button and filters */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {/* Add bill button */}
            <Grid item xs={12} md={3}>
              <Button variant="contained" onClick={() => setOpenAddBill(true)}>
                Add Bill
              </Button>
            </Grid>

            {/* Filters */}
            <Grid item xs={12} md={9}>
              <BillFilters
                months={months}
                years={years}
                filterCategory={filterCategory}
                setFilterCategory={setFilterCategory}
                filterMonth={filterMonth}
                setFilterMonth={setFilterMonth}
                filterYear={filterYear}
                setFilterYear={setFilterYear}
              />
            </Grid>
          </Grid>
          {/* Bill list */}
          <Grid item xs={12}>
            <BillList
              filteredBills={filteredBills}
              setFilterMonth={setFilterMonth}
              setFilterYear={setFilterYear}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <PayableBill
            flag={flag}
            setFlag={setFlag}
            filterMonth={filterMonth}
            filterYear={filterYear}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default BillDashboard;
