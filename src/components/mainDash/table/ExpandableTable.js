import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Checkbox from "@mui/material/Checkbox";
import { Modal, Button, TextField } from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { MenuItem } from "@mui/material";
import { useState } from "react";

function ExpandableTable(props) {
  const { row, rowData, headData } = props;
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [selectedRowData, setSelectedRowData] = React.useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleOptionClick = (value) => {
    setInputValue(value);
  };

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const wrapper = {
    display: "flex",

    alignItems: "center",
    justifyContent: "flex-end",
    gap: "10px",
    fontSize: "10px",
  };

  const modalContentStyle = {
    display: "flex",
    fontSize: "10px",
    alignItems: "center",
    justifyContent: "space-evenly", // Center content vertically
    backgroundColor: "blue",
    padding: "16px",
    borderRadius: "4px",
    width: "700px",

    margin: "0 auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    color: "white",
    transform: "translate(-50%, -50%)",
  };
  const container = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  };

  const textFieldStyle = {
    width: "35%",
    color: "white",
    marginBottom: "16px",
  };

  const buttonStyle = {
    backgroundColor: "grey",

    marginRight: "8px",
    marginTop: "8px",
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Checkbox color="success" />
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {row.Index_Num}
        </TableCell>
        <TableCell align="center">{row.Strategy_Name}</TableCell>
        <TableCell align="center">{row.MtM}</TableCell>
        <TableCell align="center">{row.Net_Qty}</TableCell>
        <TableCell align="center">{row.Sell_Qty}</TableCell>
        <TableCell align="center">{row.Buy_Qty}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {headData.map((ele, ind) => {
                      return (
                        <TableCell key={ind} align="center">
                          {ele}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowData.map((ele, ind) => {
                    const meetsCondition = ele.Index_Num === row.Index_Num;

                    const hasNonEmptyCells = headData.some((item) => ele[item]);

                    if (meetsCondition && hasNonEmptyCells) {
                      return (
                        <TableRow
                          key={ind}
                          onClick={() => handleRowClick(ele)}
                          style={{ cursor: "pointer" }}
                        >
                          {headData.map((item, ind) => (
                            <TableCell
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
          <div style={modalContentStyle}>
            <div style={container}>
              <h2
                style={{
                  position: "absolute",
                  top: -30,
                  left: 4,
                  color: "black",
                }}
              >
                Derivates Buy Order
              </h2>
              <h2>Ticker: {selectedRowData?.Ticker}</h2>
              <h2>Option Type: {selectedRowData?.Option_Type}</h2>
            </div>

            <div style={wrapper}>
              <TextField
                label="QTY"
                value={inputValue}
                onChange={handleInputChange}
                style={{ height: "40px", ...textFieldStyle }}
                InputProps={{
                  style: {
                    borderColor: "white",
                    color: "white",
                    outlineColor: "white",
                  },
                  endAdornment: (
                    <Button
                      onClick={handleDropdownToggle}
                      endIcon={<ExpandMoreIcon />}
                    />
                  ),
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
              />
              {isDropdownOpen && (
                <div>
                  <MenuItem onClick={() => handleOptionClick("25%")}>
                    25%
                  </MenuItem>
                  <MenuItem onClick={() => handleOptionClick("50%")}>
                    50%
                  </MenuItem>
                  <MenuItem onClick={() => handleOptionClick("75%")}>
                    75%
                  </MenuItem>
                </div>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={buttonStyle}
              >
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
}

export default ExpandableTable;
