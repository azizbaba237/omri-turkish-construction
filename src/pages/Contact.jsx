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
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err?.message || "Erreur lors de l'envoi");
        setLoading(false);
        return;
      }

      setSuccess("Message envoyé avec succès !");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
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
        <Grid item xs={12} md={5}>
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

              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={loading}
              >
                {loading ? "Envoi..." : "Envoyer"}
              </Button>

              {success && (
                <Typography color="success.main" mt={2}>
                  {success}
                </Typography>
              )}
              {error && (
                <Typography color="error.main" mt={2}>
                  {error}
                </Typography>
              )}
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
