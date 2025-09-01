import React from "react";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const Newsletter = () => (
  // Section newsletter avec fond bleu, texte blanc et arrondis
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
      {/* Colonne gauche : texte d'accroche */}
      <Grid item xs={12} md={6}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Restez informé
        </Typography>
        <Typography>
          Abonnez-vous à notre newsletter pour recevoir nos offres exclusives et
          actualités.
        </Typography>
      </Grid>

      {/* Colonne droite : champ email + bouton */}
      <Grid item xs={12} md={6}>
        <Box
          component="form"
          sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
        >
          {/* Champ email */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Votre email"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
          />
          {/* Bouton avec icône email */}
          <Button variant="contained" color="secondary" endIcon={<EmailIcon />}>
            S'abonner
          </Button>
        </Box>
      </Grid>
    </Grid>
  </Box>
);

export default Newsletter;
