// src/pages/Profile.jsx
import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Button,
  Grid,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import { FaRegHeart, FaClipboardList } from "react-icons/fa";

const Profile = () => {
  // Exemple de données utilisateur
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/images/user-avatar.jpg",
    role: "Client",
    joined: "2024-05-10",
    favorites: ["Service 1", "Service 2"],
    orders: 5,
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        py: 8,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 6,
          width: "100%",
          maxWidth: 800,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        {/* Avatar et info utilisateur */}
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{ width: 120, height: 120, margin: "0 auto" }}
        />
        <Typography variant="h5" fontWeight="bold" mt={3}>
          {user.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {user.email}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Rôle : {user.role} | Inscrit depuis : {user.joined}
        </Typography>

        {/* Actions principales */}
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
          <Button variant="contained" color="primary">
            Modifier Profil
          </Button>
          <Button variant="outlined" color="secondary">
            Changer Mot de Passe
          </Button>
          <Button variant="outlined" color="error">
            Se Déconnecter
          </Button>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Statistiques utilisateur */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <CardContent>
                <FaClipboardList size={30} color="#1976d2" />
                <Typography variant="h6" fontWeight="bold" mt={1}>
                  Commandes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.orders} effectuées
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <CardContent>
                <FaRegHeart size={30} color="#1976d2" />
                <Typography variant="h6" fontWeight="bold" mt={1}>
                  Favoris
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.favorites.length} services
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Liste des favoris */}
        <Box mt={5}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Services favoris
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {user.favorites.map((fav, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{ p: 2, textAlign: "center", boxShadow: 1 }}>
                  <Typography variant="body1">{fav}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
