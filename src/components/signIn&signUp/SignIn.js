import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const defaultTheme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();
  const API_KEY = "AIzaSyCf0Z2VjUZDXtELLJVyvpjciwdKWxA4nxc";

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const postData = {
      email: data.get("email"),
      password: data.get("password"),
      returnSecureToken: true,
    };
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        postData
      )
      .then(() => navigate("/home", { replace: true }))
      .catch((err) => alert(err.response.data.error.message));
  };

  return (
    <div style={{background:"#010819"}}>
    <ThemeProvider theme={defaultTheme}   >
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{color:"white"}}>
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
              sx={{background:"white"}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              sx={{background:"white"}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Sign In
            </Button>
            <Grid item>
              <Link
                style={{fontSize:"14px",color:"white" }}
                to={"/signup"}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 8,color:"white" }}
        >
          {"Copyright © "}
          Pace {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </ThemeProvider>
    </div>
  );
};

export default SignIn;
