// src/components/Navbar.jsx
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
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useContext(CartContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [elevated, setElevated] = useState(false);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // 🔥 Pour détecter les changements de route

  // ⚡ Vérifier si l'utilisateur est connecté
  const checkAuthStatus = () => {
    const access = localStorage.getItem("access");
    const userStored = localStorage.getItem("user");

    if (access && userStored) {
      setUser(JSON.parse(userStored));
    } else {
      setUser(null);
    }
  };

  // 🔥 Vérifier au montage ET à chaque changement de route
  useEffect(() => {
    checkAuthStatus();
  }, [location.pathname]); // Se déclenche à chaque changement d'URL

  // 🔥 Écouter les changements de localStorage (optionnel mais recommandé)
  useEffect(() => {
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    // Écouter l'événement storage (pour les autres onglets)
    window.addEventListener("storage", handleStorageChange);

    // Polling léger pour détecter les changements dans le même onglet
    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
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
      navigate("/products"); // ✅ Utiliser navigate au lieu de window.location
    }
  };

  const navItems = [
    { text: "Accueil", path: "/" },
    { text: "Produits", path: "/products" },
    { text: "Services", path: "/services" },
    { text: "À propos", path: "/about" },
    { text: "Contact", path: "/contact" },
  ];

  // Drawer mobile
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

  // Shadow dynamique au scroll
  useEffect(() => {
    const handleScroll = () => setElevated(window.scrollY > 50);
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

      {/* Drawer mobile */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
