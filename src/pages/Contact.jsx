import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Link,
  Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici tu peux ajouter l'envoi via API ou Email
    console.log(formData);
    alert("Message envoyé !");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Contactez-nous
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Remplissez le formulaire ou utilisez vos comptes Google/Facebook
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {/* Formulaire */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              gap={2}
              onSubmit={handleSubmit}
            >
              <TextField
                label="Nom"
                name="name"
                variant="outlined"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                label="Téléphone"
                name="phone"
                variant="outlined"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
              />
              <TextField
                label="Message"
                name="message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                required
                value={formData.message}
                onChange={handleChange}
              />

              <Button variant="contained" color="primary" size="large" type="submit">
                Envoyer
              </Button>

              <Divider sx={{ my: 2 }}>OU</Divider>

              {/* Connexion Google / Facebook */}
              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                fullWidth
                sx={{ mb: 1 }}
                onClick={() => alert("Connexion Google")}
              >
                Se connecter avec Google
              </Button>
              <Button
                variant="outlined"
                startIcon={<FacebookIcon />}
                fullWidth
                onClick={() => alert("Connexion Facebook")}
              >
                Se connecter avec Facebook
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Infos de contact */}
        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Informations de contact
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <EmailIcon color="primary" sx={{ mr: 1 }} />
              <Link href="mailto:contact@exemple.com" underline="hover">
                contact@exemple.com
              </Link>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <PhoneIcon color="primary" sx={{ mr: 1 }} />
              <Link href="tel:+237123456789" underline="hover">
                +237 123 456 789
              </Link>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocationOnIcon color="primary" sx={{ mr: 1 }} />
              <Typography>Douala, Cameroun</Typography>
            </Box>

            {/* Carte Google Maps */}
            <Box sx={{ mt: 3 }}>
              <iframe
                title="location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.437206948309!2d9.682689314203782!3d4.053838843187775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10610e7b9a25b61b%3A0xcfc0295ec67c3b72!2sDouala%2C%20Cameroun!5e0!3m2!1sfr!2s!4v1692080000000!5m2!1sfr!2s"
                width="100%"
                height="250"
                style={{ border: 0, borderRadius: 8 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
