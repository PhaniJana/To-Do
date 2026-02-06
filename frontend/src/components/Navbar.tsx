import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Button,
  Box,
} from "@mui/material";

import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Link } from "react-router-dom";
import { useUserData } from "../context/userContext/useUserData";

const Navbar = () => {
  const { darkMode, toggleTheme, user, LogoutUser, isAuthenticated } = useUserData()
  const username = user ? user.name : "Guest";

  const onLogout = () => {
    LogoutUser();
  };
  return (
    <AppBar
      position="static"
      className="bg-indigo-600! dark:bg-slate-800! transition-colors"
    >
      <Toolbar className="flex justify-between">

        {/* App Name */}
        <Typography variant="h6" className="font-semibold">
          TodoPro
        </Typography>

        {/* Right Section */}
        <Box className="flex items-center gap-3">

          {/* Username */}
          <Typography className="hidden sm:block">
            {username}
          </Typography>

          {/* Sun Icon */}
          <LightModeIcon fontSize="small" />

          {/* Theme Switch */}
          <Switch
            checked={darkMode}
            onChange={toggleTheme}
          />

          {/* Moon Icon */}
          <DarkModeIcon fontSize="small" />

          {isAuthenticated ? (
            <Button
              variant="contained"
              color="error"
              onClick={onLogout}
            >
              Logout
            </Button>
          ) : (
            <Box className="flex gap-2">
              <Button component={Link} to="/login" variant="outlined" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/register" variant="contained" color="success">
                Register
              </Button>
            </Box>
          )}

        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
