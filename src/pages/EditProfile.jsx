import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // ⚡ Récupérer les infos du user
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access");
      if (!token) return navigate("/login");

      try {
        const res = await axios.get("/api/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData({
          username: res.data.username,
          first_name: res.data.first_name || "",
          last_name: res.data.last_name || "",
          email: res.data.email,
          phone: res.data.profile?.phone || "",
        });
      } catch (err) {
        console.error(err);
        localStorage.clear();
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const token = localStorage.getItem("access");
      await axios.put("/api/profile/update/", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg("Profil mis à jour avec succès !");
    } catch (err) {
      console.error(err);
      setMsg("Erreur lors de la mise à jour du profil.");
    }
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100">
      <Paper className="p-8 w-full max-w-md">
        <Typography
          variant="h5"
          className="mb-6 font-bold text-center text-blue-900"
        >
          Modifier Profil
        </Typography>

        {msg && <p className="text-center mb-3 text-red-600">{msg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Nom d'utilisateur"
            name="username"
            value={userData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Prénom"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Nom"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Téléphone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Enregistrer
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EditProfile;
