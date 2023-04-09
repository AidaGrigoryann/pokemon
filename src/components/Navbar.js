import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ImageListItem from "@mui/material/ImageListItem";
import logo from "../img/logo.png";
import { ImageList } from "@mui/material";
import { TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { setSearchingValue } from "../redux/pokemonSlice";

const pages = ["Home", "Products", "Blog", "About US"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const IconButtonn = ({ handleOpenNavMenu }) => {
  const onOpenNavMenu = (event) => {
    if (typeof handleOpenNavMenu === "function") {
      handleOpenNavMenu(event);
    }
  };

  return (
    <IconButton
      edge="end"
      size="large"
      aria-label="account of current user"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      onClick={onOpenNavMenu}
      color="inherit"
      sx={{
        color: "#0c4a87",
      }}
    >
      <MenuIcon />
    </IconButton>
  );
};

function Navbar() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { searchingValue } = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearch = (e) => {
    dispatch(setSearchingValue(e.target.value));
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#fae41e" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ImageList sx={{ maxWidth: "270px", height: "50px" }}>
            <Link href="#" sx={{ coursor: "pointer" }}>
              <ImageListItem>
                <img src={logo} style={{ display: "inline-block" }} />
              </ImageListItem>
            </Link>
          </ImageList>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  color: "#0c4a87",
                  display: "flex",
                  width: "max-content",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {!isSmallScreen ? (
            <Toolbar>
              <TextField
                label="Search"
                variant="outlined"
                onChange={handleSearch}
                value={searchingValue}
              />
            </Toolbar>
          ) : null}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" sx={{ backgroundColor: "#e3e5d8" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {isSmallScreen ? (
            <IconButtonn handleOpenNavMenu={handleOpenNavMenu} />
          ) : null}
        </Toolbar>
        {isSmallScreen ? (
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: "10px",
            }}
          >
            <TextField
              onChange={handleSearch}
              value={searchingValue}
              label="Search"
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </Toolbar>
        ) : null}
      </Container>
    </AppBar>
  );
}

export default Navbar;
