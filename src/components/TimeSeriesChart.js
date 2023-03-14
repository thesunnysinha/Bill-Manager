import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
} from "recharts";

const TimeSeriesChart = ({ filterMonth, filterYear }) => {
  const bills = useSelector((state) => state.bills.bills);
  const filteredBills = bills.filter(
    (bill) =>
      (!filterMonth ||
        (bill.date instanceof Date && bill.date.getMonth() === filterMonth)) &&
      (!filterYear ||
        (bill.date instanceof Date && bill.date.getFullYear() === filterYear))
  );

  const monthlyBills = filteredBills.reduce((acc, bill) => {
    const year = bill.date.getFullYear();
    const month = bill.date.getMonth() + 1;
    const day = bill.date.getDate();
    const key = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    if (acc[key]) {
      acc[key] += bill.amount;
    } else {
      acc[key] = bill.amount;
    }
    return acc;
  }, {});

  const data = Object.keys(monthlyBills).map((key) => ({
    date: new Date(key),
    amount: monthlyBills[key],
  }));

  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip
        labelFormatter={(label) => {
          const date = new Date(label);
          return `${date.toLocaleDateString()} - Total Amount: `;
        }}
        formatter={(value) => `$${value}`}
      />
      <Line type="monotone" dataKey="amount" stroke="#8884d8" />
    </LineChart>
  );
};

export default TimeSeriesChart;
