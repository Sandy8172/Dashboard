import React from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Stack,
  Button,
} from "@mui/material";
import "./Footer.css";
import { useSelector, useDispatch } from "react-redux";
import { dataSliceActions } from "../../store/dataSlice";
import axios from "axios";

const Footer = () => {
  const dispatch = useDispatch();

  const {
    indexValue,
    select,
    symbol,
    Qty,
    order,
    option,
    isDisabled,
    isChecked,
  } = useSelector((state) => ({
    indexValue: state.indexValue,
    select: state.selected.select,
    symbol: state.selected.symbol,
    Qty: state.selected.Qty,
    order: state.selected.order,
    option: state.selected.option,
    isDisabled: state.isDisabled,
    isChecked: state.isChecked,
  }));

  const handleSelectChange = (event) => {
    const value = event.target.value;
    dispatch(dataSliceActions.selectedValueHandler(value));
  };
  const handleSymbolChange = (event) => {
    const value = event.target.value;
    dispatch(dataSliceActions.symbolValueHandler(value));
  };

  const handleQtyChange = (event) => {
    const value = event.target.value;
    dispatch(dataSliceActions.QtyValueHandler(value));
  };

  const handleOrderChange = (event) => {
    const value = event.target.value;
    dispatch(dataSliceActions.orderValueHandler(value));
  };
  const handleOptionChange = (event) => {
    const value = event.target.value;
    dispatch(dataSliceActions.optionValueHandler(value));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const selectedData = {
      Idx_Num: indexValue,
      select: select,
      symbol: symbol,
      Qty: Qty,
      order: order,
      option: option,
    };
    axios
      .post("http://172.16.1.24:5000/response", selectedData)
      .then((ress) => {
        console.log(ress);
        dispatch(dataSliceActions.resetForm());
      })
      .catch((err) => console.log(err));
    console.log(selectedData);
  };

  return (
    <form onSubmit={formSubmitHandler} className="footer_wrapper">
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel >Select</InputLabel>
        <Select value={select} onChange={handleSelectChange}>
          <MenuItem>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"STRATEGY"}>STRATEGY</MenuItem>
          <MenuItem value={"INSTRUMENT"} disabled={isChecked}>
            INSTRUMENT
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Symbol Type</InputLabel>
        <Select
          value={symbol}
          onChange={handleSymbolChange}
          disabled={isDisabled}
        >
          <MenuItem>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"NIFTY"}>Nifty</MenuItem>
          <MenuItem value={"BANK NIFTY"}>Bank Nifty</MenuItem>
          <MenuItem value={"NIFTY, BANK NIFTY"}>BOTH</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Qty(%)</InputLabel>
        <Select value={Qty} onChange={handleQtyChange}>
          <MenuItem>
            <em>None</em>
          </MenuItem>
          <MenuItem value={25}>25%</MenuItem>
          <MenuItem value={50}>50%</MenuItem>
          <MenuItem value={75}>75%</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Order</InputLabel>
        <Select value={order} onChange={handleOrderChange}>
          <MenuItem>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"BUY"}>BUY</MenuItem>
          <MenuItem value={"SELL"}>SELL</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Option Type</InputLabel>
        <Select value={option} onChange={handleOptionChange}>
          <MenuItem>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"CE"}>CE</MenuItem>
          <MenuItem value={"PE"}>PE</MenuItem>
          <MenuItem value={"CE , PE"}>BOTH</MenuItem>
        </Select>
      </FormControl>
      <Stack spacing={2} direction="row">
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default Footer;
