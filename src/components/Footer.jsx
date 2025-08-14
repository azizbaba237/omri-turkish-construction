// src/components/Footer.jsx
import React from "react";
import { Box, Typography, Grid, Link as MuiLink } from "@mui/material";
import { Container, Button, Divider, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#1E40AF", color: "white", py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Omri Turkish Construction
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Votre partenaire en solutions sanitaires et services de
              construction.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <IconButton aria-label="Facebook" color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="Instagram" color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="Twitter" color="inherit">
                <TwitterIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Contact
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOnIcon sx={{ mr: 1 }} />
              <Typography>123 Rue des Entrepreneurs, 75000 Paris</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography>01 23 45 67 89</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <EmailIcon sx={{ mr: 1 }} />
              <Typography>contact@turkishomri.com</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Horaires
            </Typography>
            <Typography>Lundi - Vendredi: 9h - 18h</Typography>
            <Typography>Samedi: 10h - 15h</Typography>
            <Typography>Dimanche: Fermé</Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                color="inherit"
                component={Link}
                to="/contact"
                sx={{ mt: 1 }}
              >
                Nous contacter
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, backgroundColor: "rgba(255,255,255,0.2)" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography>
            © {new Date().getFullYear()} Omri Turkish Construction. Tous droits
            réservés.
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/cgv">
              CGV
            </Button>
            <Button color="inherit" component={Link} to="/mentions-legales">
              Mentions légales
            </Button>
            <Button color="inherit" component={Link} to="/confidentialite">
              Confidentialité
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
