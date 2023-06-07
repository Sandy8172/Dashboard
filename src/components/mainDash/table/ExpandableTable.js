import { CSVLink } from "react-csv";
import React, { useState, useCallback, useEffect } from "react";
import { FormControl, Select, InputLabel } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import {
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  Box,
  Collapse,
  IconButton,
  Checkbox,
  Modal,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { footerSliceActions } from "../../../store/footerSlice";
import axios from "axios";
import "./ExpandableTable.css";

import GetAppIcon from "@mui/icons-material/GetApp";

const ExpandableTable = React.memo((props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [optionType, setOptionType] = useState("");
  const [modalHeading, setModalHeading] = useState("");
  const [modalBackground, setModalBackground] = useState("");
  const [inputTicker, setInputTicker] = useState("");

  const selectedIndexes = useSelector((state) => state.footer.indexValue);
  const dispatch = useDispatch();
  const rowData = useSelector((state) => state.data.rows);
  const headData = useSelector((state) => state.data.headers);
  useEffect(() => {
    if (selectedRowData && selectedRowData.Ticker) {
      setInputTicker(selectedRowData.Ticker);
    }
  }, [selectedRowData]);

  const handleTickerChange = (event, value) => {
    const tickerValue = value || "";
    setInputTicker(tickerValue);
    setInputValue("");
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "+") {
        setModalHeading("Derivative Buy Order");
        setModalBackground("#03254c");
        setOpenModal(true);
      } else if (event.key === "-") {
        setModalHeading("Derivative Sell Order");
        setModalBackground("#7E2811");
        setOpenModal(true);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleCheckboxChange = useCallback(
    (e) => {
      const Idx_Num = row.Index_Num;
      dispatch(footerSliceActions.toggleIndex(Idx_Num));

      if (!selectedIndexes.includes(Idx_Num) && e.target.checked) {
        e.target.checked = false;
      }
    },
    [dispatch, row.Index_Num, selectedIndexes]
  );
  const handleInput = (event) => {
    const newValue = parseInt(event.target.value) || 0;

    const ticker = inputTicker;

    const step = ticker.includes("BANKNIFTY") ? 25 : 50;
    const min = 0;

    if (event.nativeEvent.inputType === "increment") {
      setInputValue(newValue + step);
      console.log(inputValue);
    } else if (event.nativeEvent.inputType === "decrement") {
      setInputValue(newValue - step >= min ? newValue - step : min);
    } else {
      setInputValue(newValue);
    }
  };
  const handleOptionChange = (e) => {
    setOptionType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const modalValues = {
      optionType,
      inputTicker,
      inputValue,
    };

    const number = parseInt(inputValue);

    const ticker = inputTicker;

    if (ticker.includes("BANKNIFTY")) {
      if (number % 25 !== 0) {
        alert("Please enter a number that is a multiple of 25.");
        return;
      }
    } else if (number % 50 !== 0) {
      alert("Please enter a number that is a multiple of 50.");
      return;
    } else {
      axios
        .post("http://172.16.1.24:8000/response", modalValues)
        .then((ress) => {
          console.log(ress);
        })
        .catch((err) => console.log(err));
      setInputValue("");
      setOpenModal(false);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value.trim();
    const ticker = inputTicker;

    const step = ticker.includes("BANKNIFTY") ? 25 : 50;
    if (newValue === "" || parseInt(newValue) % step === 0) {
      setInputValue(parseInt(newValue));
    }
  };

  const handleRowClick = useCallback((rowData) => {
    setSelectedRowData(rowData);
    setOpenModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  const csvData = rowData.map((row) => ({
    ...row,
    MtM: parseFloat(row.MtM), // Convert MtM value to a number if needed
  }));
  return (
    <React.Fragment>
      <TableRow sx={{ borderBottom: "2px solid #7b7b7b" }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            sx={{ color: "white" }}
            onClick={() => setOpen((prevState) => !prevState)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Checkbox
            color="success"
            onChange={handleCheckboxChange}
            checked={selectedIndexes.includes(row.Index_Num)}
            sx={{ color: "white" }}
          />
        </TableCell>
        <TableCell
          sx={{ color: "white" }}
          component="th"
          scope="row"
          align="center"
        >
          {row.Index_Num}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.Strategy_Name}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.MtM}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.Net_Qty}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.Sell_Qty}
        </TableCell>
        <TableCell sx={{ color: "white" }} align="center">
          {row.Buy_Qty}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table
                size="small"
                sx={{
                  width: "100%",
                  border: "2px #7b7b7b solid",
                  height: "10px",
                }}
                aria-label="purchases"
              >
                <TableHead>
                  <TableRow
                    sx={{ borderBottom: "2px #7b7b7b solid", height: "10px" }}
                  >
                    <TableCell>
                      {open && (
                        <TableCell
                          colSpan={8}
                          align="center"
                          sx={{ borderBottom: "none" }}
                        >
                          <CSVLink
                            data={csvData}
                            filename={"selected_row_data.csv"}
                            target="_blank"
                            className="export-button"
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<GetAppIcon />}
                            >
                              Export
                            </Button>
                          </CSVLink>
                        </TableCell>
                      )}
                    </TableCell>
                    {headData.map((ele, ind) => (
                      <TableCell
                        sx={{ color: "white" }}
                        key={ind}
                        align="center"
                      >
                        {ele}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowData.map((ele, ind) => {
                    const meetsCondition = ele.Index_Num === row.Index_Num;
                    const hasNonEmptyCells = headData.some((item) => ele[item]);
                    if (meetsCondition && hasNonEmptyCells) {
                      return (
                        <TableRow
                          sx={{
                            color: "white",
                            borderBottom: "2px solid #7b7b7b",
                            height: "10px",
                          }}
                          key={ind}
                          onClick={() => handleRowClick(ele)}
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell></TableCell>
                          {headData.map((item, ind) => (
                            <TableCell
                              sx={{ color: "white" }}
                              component="th"
                              scope="row"
                              key={ind}
                              align="center"
                            >
                              {ele.Index_Num === row.Index_Num && ele[item]}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    }
                    return null;
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {open && selectedRowData && (
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="custom-modal-title"
        >
          <div
            className="modalContent"
            style={{ backgroundColor: modalBackground }}
          >
            <h2 className="popUp_heading">{modalHeading}</h2>
            {/* <div className="container"> */}
            <div className="container">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={inputTicker}
                onChange={handleTickerChange}
                options={props.tickerArray}
                sx={{
                  width: 290,
                  color: "white",
                  "& .MuiInputBase-root": {
                    color: "white",
                    backgroundColor: "white",
                  },
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    InputLabelProps={{
                      style: {
                        color: "white",
                      },
                    }}
                    {...params}
                    label="Ticker"
                  />
                )}
              />
              <FormControl
                variant="filled"
                sx={{
                  m: 1,
                  minWidth: 130,
                  background: "transparent",
                  borderRadius: "20px",
                }}
              >
                <InputLabel id="demo-simple-select-filled-label">
                  Option Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={optionType}
                  onChange={handleOptionChange}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"CE"}>CE</MenuItem>
                  <MenuItem value={"PE"}>PE</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Qty"
                type="number"
                onInput={handleInput}
                value={inputValue}
                onChange={handleInputChange}
                style={{
                  marginBottom: "12px",
                  background: "white",
                  borderRadius: "5px",
                  padding: 0,
                }}
                className="textFieldStyle"
                inputProps={{
                  min: 0,
                  step: inputTicker.includes("BANKNIFTY") ? 25 : 50,
                }}
                InputProps={{
                  style: {
                    borderColor: "white",
                    color: "black",
                    outlineColor: "white",
                    padding: 0,
                  },
                  inputMode: "numeric",
                  onWheel: (event) => event.currentTarget.blur(),
                }}
                InputLabelProps={{
                  style: { color: "black" },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className="buttonStyle"
              >
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
});

export default ExpandableTable;
