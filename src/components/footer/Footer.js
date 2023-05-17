import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./Footer.css";
import { useSelector, useDispatch } from "react-redux";
import { dataSliceActions } from "../../store/dataSlice";

export default function Footer() {
  const dispatch = useDispatch();

  const { select, symbol, Qty, order, isDisabled } = useSelector((state) => ({
    select: state.selected.select,
    symbol: state.selected.symbol,
    Qty: state.selected.Qty,
    order: state.selected.order,
    isDisabled: state.isDisabled,
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

  const formSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={formSubmitHandler} className="footer_wrapper">
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Select</InputLabel>
        <Select value={select} onChange={handleSelectChange}>
          <MenuItem>
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Strategy"}>Strategy</MenuItem>
          <MenuItem value={"Instrument"} disabled={""}>
            Instrument
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
          <MenuItem value={"Nifty"}>Nifty</MenuItem>
          <MenuItem value={"Bank Nifty"}>Bank Nifty</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Qty(%)</InputLabel>
        <Select value={Qty} onChange={handleQtyChange}>
          <MenuItem >
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
          <MenuItem value={"Buy"}>Buy</MenuItem>
          <MenuItem value={"Sell"}>Sell</MenuItem>
        </Select>
      </FormControl>
      <Stack spacing={2} direction="row">
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
