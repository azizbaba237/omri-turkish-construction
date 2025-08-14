// src/pages/Profile.jsx
import React from "react";
import { Box, Typography, Avatar, Paper, Button } from "@mui/material";

const Profile = () => {
  // Simulé pour l'exemple
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/images/user-avatar.jpg",
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100">
      <Paper className="p-8 w-full max-w-md text-center">
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{ width: 100, height: 100, margin: "0 auto" }}
        />
        <Typography variant="h6" className="mt-4 font-bold">
          {user.name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {user.email}
        </Typography>
        <Box className="mt-6 space-x-4">
          <Button variant="contained" color="primary">
            Modifier Profil
          </Button>
          <Button variant="outlined" color="error">
            Se Déconnecter
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
