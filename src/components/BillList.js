import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  TextField,
  Button,
  Grid,
  Typography,
} from "@mui/material";
import { editBill, removeBill } from "../redux/BillSlice";
import { useDispatch } from "react-redux";
import BillEditForm from "./BillEditForm";

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

const BillList = ({ filteredBills,setFilterMonth,setFilterYear }) => {
  const dispatch = useDispatch();

  const [openEditBill, setOpenEditBill] = useState(false);
  const [currentBill, setCurrentBill] = useState({
    id: "",
    description: "",
    category: "",
    amount: "",
    date: "",
  });

  const handleCloseEditBill = () => {
    setOpenEditBill(false);
  };
  const handleRemoveBill = (id) => {
    dispatch(removeBill(id));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(currentBill);
    dispatch(editBill({ ...currentBill, date: new Date(currentBill.date) }));
    // console.log(currentBill);
    setFilterMonth(bill.date.getMonth());
    setFilterYear(bill.date.getFullYear());
    setOpenEditBill(false);
  };

  return (
    <>
      {/* Modal */}
      <Modal open={openEditBill} onClose={handleCloseEditBill}>
        <BillEditForm
          handleSubmit={handleSubmit}
          currentBill={currentBill}
          setCurrentBill={setCurrentBill}
        />
      </Modal>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          {filteredBills.length !== 0 ? (
            <TableBody>
              {filteredBills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell>{bill.description}</TableCell>
                  <TableCell>{bill.category}</TableCell>
                  <TableCell>${bill.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(bill.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      onClick={() => {
                        setCurrentBill(bill);
                        setOpenEditBill(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => handleRemoveBill(bill.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <Typography>No Bills Yet</Typography>
          )}
        </Table>
      </TableContainer>
    </>
  );
};
export default BillList;
