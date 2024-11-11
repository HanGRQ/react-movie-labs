import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import GoogleIcon from "@mui/icons-material/Google";
import LogoutIcon from "@mui/icons-material/Logout";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import backgroundImage from "../images/background.png"; // 引入背景图片

// 自定义样式，用于加粗 "Login" 标题
const StyledTypography = styled(Typography)({
  fontWeight: "bold",
  fontSize: "2.5rem",
  fontFamily: "Brush Script MT, cursive", // 示例字体，可根据需求更改
});

// 为登录内容创建边框样式的 Box 组件
const LoginContainer = styled(Box)({
  border: "2px solid black", // 边框颜色和粗细
  borderRadius: "15px", // 圆角
  padding: "20px", // 内边距
  maxWidth: "400px", // 最大宽度
  width: "100%", // 宽度
  backgroundColor: "white", // 背景颜色
  boxSizing: "border-box",
});

const LoginPage = () => {
  const { user, signInWithGoogle, registerWithEmail, signInWithEmail, logout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  // 如果用户已经登录，直接跳转到 HomePage
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    await registerWithEmail(email, password);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    await signInWithEmail(email, password);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`, // 设置背景图片
        backgroundPosition: "left bottom", // 图片位置
        backgroundRepeat: "no-repeat", // 不重复
        backgroundSize: "contain", // 适应大小
      }}
    >
      <LoginContainer>
        <StyledTypography variant="h4" component="h1" align="center" gutterBottom>
          Login
        </StyledTypography>
        {user ? (
          <>
            <Avatar alt={user.displayName} src={user.photoURL} sx={{ width: 56, height: 56, mb: 2, mx: "auto" }} />
            <Typography variant="h6" component="div" align="center">
              Welcome, {user.displayName || user.email}
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
          <>
            <form onSubmit={isRegister ? handleEmailRegister : handleEmailLogin}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ mb: 1 }}
              >
                {isRegister ? "Register" : "Login"}
              </Button>
            </form>

            <Button
              variant="text"
              color="primary"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
            </Button>

            {/* 分割线 */}
            <Divider sx={{ width: "100%", mt: 1, mb: 1 }} />

            {/* Google 登录按钮放在最下方 */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<GoogleIcon />}
              onClick={signInWithGoogle}
              sx={{ mb: 1 }}
              fullWidth
            >
              Login with Google
            </Button>
          </>
        )}
      </LoginContainer>
    </Grid>
  );
};

export default LoginPage;
