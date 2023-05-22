import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import "./Sidebar.css"
import Cards from "../Cards/Cards";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GridViewIcon from "@mui/icons-material/GridView";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import NetOption from "../netOption/NetOption";
import TradeBook from "../tradeBook/TradeBook";
import OrderBook from "../orderBook/OrderBook";
import MainDash from "../mainDash/MainDash";
import Footer from "../footer/Footer";


const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Sidebar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [optionValue, setOptionValue] = React.useState("Dashboard");
  const [selected,setSelected] = useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 const selectedValueHandler = (value) =>{
  setOptionValue(value);
 }
 
 

  return (
    <Box sx={{ display: "flex", backgroundColor:"#010819"}}>
      <CssBaseline />
      <AppBar sx={{backgroundColor:"#010819"}} position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background:"#0a0f18",
            color:"white"
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <CloseIcon sx={{color:"white"}}/>
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
          {[
            { name: "Dashboard", icon: <GridViewIcon /> },
            { name: "Order Book", icon: <MenuBookIcon /> },
            { name: "Trade Book", icon: <InboxIcon /> },
            { name: "Net Option", icon: <FilterAltIcon /> },
          ].map((ele, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ mt: 5, }}
              onClick={()=>{setSelected(index)
                selectedValueHandler(ele.name);
              }}
            >
              <ListItemButton  className={`menuItem ${selected === index ? "active" : ""}`}>
                <ListItemIcon sx={{color:"white"}}>{ele.icon}</ListItemIcon>
                <ListItemText primary={ele.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
      </Drawer>
      <Main open={open} sx={{width:"100%",}}>
        <DrawerHeader />
        {optionValue === "Dashboard" && (
          <>
          {/* <div style={{ display:"flex",flexDirection:"column"}}> */}
            <Cards/>
          <MainDash />

          {/* </div> */}
          
            <Footer />
          </>
        )}
        {optionValue === "Order Book" && <OrderBook />}
        {optionValue === "Trade Book" && <TradeBook />}
        {optionValue === "Net Option" && <NetOption />}
      </Main>
    </Box>
  );
}