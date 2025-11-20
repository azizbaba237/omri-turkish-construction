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
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useContext(CartContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [elevated, setElevated] = useState(false);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🟦 Vérifier la connexion
  useEffect(() => {
    const access = localStorage.getItem("access");
    const userStored = localStorage.getItem("user");

    if (access && userStored) {
      setUser(JSON.parse(userStored));
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      localStorage.setItem("productSearch", searchTerm);
      window.location.href = "/products";
    }
  };

  const navItems = [
    { text: "Accueil", path: "/" },
    { text: "Produits", path: "/products" },
    { text: "Services", path: "/services" },
    { text: "À propos", path: "/about" },
    { text: "Contact", path: "/contact" },
  ];

  // 🟦 Drawer mobile (design 100% gardé)
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

        {/* 🔥 Menu dynamique mobile */}
        {!user && (
          <>
            <ListItem button component={Link} to="/login">
              Connexion
            </ListItem>
            <ListItem button component={Link} to="/register">
              S'inscrire
            </ListItem>
          </>
        )}

        {user && (
          <>
            <ListItem button component={Link} to="/profile">
              Profil
            </ListItem>
            <ListItem button onClick={handleLogout}>
              Déconnexion
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  // 🟦 Shadow dynamique
  useEffect(() => {
    const handleScroll = () => {
      setElevated(window.scrollY > 50);
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
            OMRI TURKISH CONSTRUCTION
          </Typography>

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
          </Box>

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

          {/* Panier + Profil + Menu mobile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Panier visible partout */}
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

            {/* Profil Desktop */}
            <IconButton
              color="inherit"
              onClick={handleMenu}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <AccountCircle />
            </IconButton>

            {/* Menu Desktop dynamique */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {user ? (
                <>
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleClose}
                  >
                    Mon profil
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleLogout();
                      handleClose();
                    }}
                  >
                    Déconnexion
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem component={Link} to="/login" onClick={handleClose}>
                    Connexion
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/register"
                    onClick={handleClose}
                  >
                    S'inscrire
                  </MenuItem>
                </>
              )}
            </Menu>

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

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
