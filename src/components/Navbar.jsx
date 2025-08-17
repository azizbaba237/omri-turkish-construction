import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  InputBase,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useContext(CartContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [elevated, setElevated] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Recherche:", searchTerm);
  };

  const navItems = [
    { text: "Accueil", path: "/" },
    { text: "Produits", path: "/products" },
    { text: "Services", path: "/services" },
    { text: "Contact", path: "/contact" },
    { text: "À propos", path: "/about" },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <ListItem button component={Link} to="/cart">
          <ShoppingCartIcon className="mr-2" /> Panier ({cartCount})
        </ListItem>
        <ListItem button component={Link} to="/profile">
          Profil
        </ListItem>
        <ListItem button component={Link} to="/login">
          Connexion
        </ListItem>
      </List>
    </Box>
  );

  // Shadow dynamique au scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setElevated(true);
      else setElevated(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={elevated ? 8 : 0}
        sx={{
          backgroundColor: "#1E40AF",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
          zIndex: 1100,
        }}
      >
        <Toolbar className="flex justify-between">
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
              letterSpacing: 1,
            }}
          >
            OMRI TURKISH
          </Typography>

          {/* Barre de recherche */}
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: { xs: "none", sm: "flex" },
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: 2,
              paddingX: 1,
              alignItems: "center",
              boxShadow: 1,
            }}
          >
            <InputBase
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ ml: 1, flex: 1 }}
            />
            <IconButton type="submit">
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Menu Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1.5,
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  color: "white",
                  textTransform: "none",
                  fontSize: "16px",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                }}
              >
                {item.text}
              </Button>
            ))}

            {/* Profil */}
            <IconButton color="inherit" onClick={handleMenu}>
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/profile" onClick={handleClose}>
                Mon profil
              </MenuItem>
              <MenuItem component={Link} to="/login" onClick={handleClose}>
                Connexion
              </MenuItem>
              <MenuItem onClick={handleClose}>Déconnexion</MenuItem>
            </Menu>
          </Box>

          {/* Panier + Menu mobile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Panier visible sur tous les écrans */}
            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              sx={{ display: "block" }}
            >
              <Badge id="cart-badge" badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Menu mobile */}
            <IconButton
              color="inherit"
              edge="end"
              sx={{ display: { xs: "block", md: "none" } }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer mobile */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
