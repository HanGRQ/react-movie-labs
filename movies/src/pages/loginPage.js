import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import GoogleIcon from "@mui/icons-material/Google";
import LogoutIcon from "@mui/icons-material/Logout";

const LoginPage = () => {
  const { user, signInWithGoogle, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // 如果用户已经登录，直接跳转到 HomePage
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <Grid container justifyContent="center" alignItems="center" direction="column" sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      {user ? (
        <>
          <Avatar alt={user.displayName} src={user.photoURL} sx={{ width: 56, height: 56, mb: 2 }} />
          <Typography variant="h6" component="div">
            Welcome, {user.displayName}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<LogoutIcon />}
            onClick={logout}
            sx={{ mt: 2 }}
          >
            Logout
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          startIcon={<GoogleIcon />}
          onClick={signInWithGoogle}
          sx={{ mt: 2 }}
        >
          Login with Google
        </Button>
      )}
    </Grid>
  );
};

export default LoginPage;
