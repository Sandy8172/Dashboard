import React from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
} from "@mui/material";
import "./Footer.css";
import { useSelector, useDispatch } from "react-redux";
import { footerSliceActions } from "../../store/footerSlice";
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
    indexValue: state.footer.indexValue,
    select: state.footer.selected.select,
    symbol: state.footer.selected.symbol,
    Qty: state.footer.selected.Qty,
    order: state.footer.selected.order,
    option: state.footer.selected.option,
    isDisabled: state.footer.isDisabled,
    isChecked: state.footer.isChecked,
  }));

  const handleSelectChange = (event) => {
    const value = event.target.value;
    dispatch(footerSliceActions.selectedValueHandler(value));
  };
  const handleSymbolChange = (event) => {
    const value = event.target.value;
    dispatch(footerSliceActions.symbolValueHandler(value));
  };

  const handleQtyChange = (event) => {
    const value = event.target.value;
    dispatch(footerSliceActions.QtyValueHandler(value));
  };

  const handleOrderChange = (event) => {
    const value = event.target.value;
    dispatch(footerSliceActions.orderValueHandler(value));
  };
  const handleOptionChange = (event) => {
    const value = event.target.value;
    dispatch(footerSliceActions.optionValueHandler(value));
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
    if (select === "" || Qty === "" || order === "" || option === "") {
      alert("please fill all the fields");
    } else if (select === "INSTRUMENT" && symbol === "") {
      alert("please fill all the fields");
    } else if (select === "STRATEGY" && indexValue.length === 0) {
      alert("please check atleast one strategy");
    } else {
      axios
        .post("http://172.16.1.24:5000/response", selectedData)
        .then((ress) => {
          console.log(ress);
          dispatch(footerSliceActions.resetForm());
          console.log(selectedData);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="footer_wrapper">
      <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={select}
          onChange={handleSelectChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"STRATEGY"}>Strategy</MenuItem>
          <MenuItem value={"INSTRUMENT"} disabled={isChecked}>
            Instrument
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 130 }}>
        <InputLabel id="demo-simple-select-filled-label">
          Symbol Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={symbol}
          onChange={handleSymbolChange}
          disabled={isDisabled}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"NIFTY"}>Nifty</MenuItem>
          <MenuItem value={"BANK NIFTY"}>Bank Nifty</MenuItem>
          <MenuItem value={"NIFTY, BANK NIFTY"}>Both</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 130 }}>
        <InputLabel id="demo-simple-select-filled-label">Qty%</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={Qty}
          onChange={handleQtyChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={25}>25%</MenuItem>
          <MenuItem value={50}>50%</MenuItem>
          <MenuItem value={75}>75%</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 130 }}>
        <InputLabel id="demo-simple-select-filled-label">Order Type</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={order}
          onChange={handleOrderChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"BUY"}>BUY</MenuItem>
          <MenuItem value={"SELL"}>SELL</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="filled" sx={{ m: 1, minWidth: 130 }}>
        <InputLabel id="demo-simple-select-filled-label">
          Option Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={option}
          onChange={handleOptionChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"CE"}>CE</MenuItem>
          <MenuItem value={"PE"}>PE</MenuItem>
          <MenuItem value={"CE , PE"}>BOTH</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
};

export default Footer;
