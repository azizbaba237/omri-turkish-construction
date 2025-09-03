import React from "react";
import { Card, Typography, Box } from "@mui/material";

const ValeurCard = ({ icon, title, desc }) => (
  <Card sx={{ textAlign: "center", p: 4, borderRadius: 3, boxShadow: 3 }}>
    <Box mb={2}>{icon}</Box>
    <Typography variant="h6" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
    <Typography color="text.secondary">{desc}</Typography>
  </Card>
);

export default ValeurCard;
