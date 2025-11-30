import React, { useState, useEffect } from "react";
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
import { FaRegHeart, FaClipboardList, FaGraduationCap } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔹 Récupérer le profil utilisateur
  const fetchProfile = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get("http://127.0.0.1:8000/api/auth/profile/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = res.data;

      // Stocker pour Navbar
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      setLoading(false);
    } catch (err) {
      console.error("Erreur récupération profil:", err);
      localStorage.clear();
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <Typography variant="h6">Chargement du profil...</Typography>
      </Box>
    );
  }

  // Fallback pour avatar
  const avatarUrl = user.avatar || "/images/user-avatar.jpg";

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
          p: { xs: 3, md: 6 },
          width: "100%",
          maxWidth: 900,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        {/* Avatar et info utilisateur */}
        <Avatar
          src={avatarUrl}
          alt={user.username || "User"}
          sx={{ width: 120, height: 120, margin: "0 auto" }}
        />
        <Typography variant="h5" fontWeight="bold" mt={3}>
          {user.first_name || ""} {user.last_name || user.username || ""}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {user.email || "—"}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Rôle : {user.profile?.role || "—"} | Téléphone :{" "}
          {user.profile?.phone || "—"} | Inscrit depuis :{" "}
          {user.date_joined
            ? new Date(user.date_joined).toLocaleDateString()
            : "—"}
        </Typography>

        {/* Actions principales */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/profile/edit")}
          >
            Modifier Profil
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/profile/change-password")}
          >
            Changer Mot de Passe
          </Button>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Se Déconnecter
          </Button>
        </Box>

        <Divider sx={{ my: 5 }} />

        {/* Statistiques utilisateur */}
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <CardContent>
                <FaClipboardList size={30} color="#1976d2" />
                <Typography variant="h6" fontWeight="bold" mt={1}>
                  Commandes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.orders?.length || 0} effectuées
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <CardContent>
                <FaRegHeart size={30} color="#1976d2" />
                <Typography variant="h6" fontWeight="bold" mt={1}>
                  Favoris
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.favorites?.length || 0} services
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ p: 2, textAlign: "center" }}>
              <CardContent>
                <FaGraduationCap size={30} color="#1976d2" />
                <Typography variant="h6" fontWeight="bold" mt={1}>
                  Formations
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.trainings?.length || 0} suivies
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Liste des formations */}
        <Box mt={5}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Formations
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {user.trainings && user.trainings.length > 0 ? (
              user.trainings.map((training, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card sx={{ p: 2, textAlign: "center", boxShadow: 1 }}>
                    <Typography variant="body1">{training.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {training.description}
                    </Typography>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Aucune formation pour le moment.
              </Typography>
            )}
          </Grid>
        </Box>

        {/* Liste des favoris */}
        <Box mt={5}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Services favoris
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {user.favorites && user.favorites.length > 0 ? (
              user.favorites.map((fav, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card sx={{ p: 2, textAlign: "center", boxShadow: 1 }}>
                    <Typography variant="body1">{fav.name || fav}</Typography>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                Aucun service favori pour le moment.
              </Typography>
            )}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
