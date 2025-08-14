import React from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const Contact = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Contactez-nous
      </Typography>
      <Box component="form" display="flex" flexDirection="column" gap={2}>
        <TextField label="Nom" variant="outlined" fullWidth />
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
        />
        <Button variant="contained" color="primary" size="large">
          Envoyer
        </Button>
      </Box>
    </Container>
  );
};

export default Contact;
