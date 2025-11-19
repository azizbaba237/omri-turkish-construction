import React, { useState } from "react";
import { Box, Grid, Typography, TextField, Button, Alert } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/newsletter/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const err = await response.json();
        setError(err.error || "Erreur lors de l'abonnement.");
        return;
      }

      const data = await response.json();
      setSuccess(data.message);
      setEmail("");
    } catch (err) {
      setError("Erreur de connexion au serveur.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#1E40AF",
        color: "white",
        p: 5,
        mt: 8,
        borderRadius: 2,
      }}
    >
      <Grid container spacing={4} alignItems="center">

        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Restez informé
          </Typography>
          <Typography>
            Abonnez-vous à notre newsletter pour recevoir nos offres exclusives et actualités.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            component="form"
            onSubmit={handleSubscribe}
            sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />

            <Button type="submit" variant="contained" color="secondary" endIcon={<EmailIcon />}>
              S'abonner
            </Button>
          </Box>

          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
          )}
        </Grid>

      </Grid>
    </Box>
  );
};

export default Newsletter;
