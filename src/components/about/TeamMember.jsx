import React from "react";
import { Grid, Avatar, Typography } from "@mui/material";

const TeamMember = ({ name, role, img }) => (
  <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
    <Avatar alt={name} src={img} sx={{ width: 140, height: 140, mb: 2, mx: "auto" }} />
    <Typography variant="h6" fontWeight="bold">{name}</Typography>
    <Typography color="text.secondary">{role}</Typography>
  </Grid>
);

export default TeamMember;
