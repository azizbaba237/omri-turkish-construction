import React, { useState, useContext } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { CartContext } from "../context/CartContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { loadUserCart } = useContext(CartContext); // 🔥 Importer le context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Login via API
      const data = await loginUser(email, password);

      // 2. Sauvegarde des tokens
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // 3. Récupération du profil utilisateur
      const response = await fetch("http://127.0.0.1:8000/api/auth/profile/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.access}`,
        },
      });

      const profile = await response.json();
      localStorage.setItem("user", JSON.stringify(profile));

      // 🔥 4. NE PAS appeler loadUserCart ici !
      // Le CartContext s'en charge automatiquement au prochain rendu

      // 5. Redirection SANS recharger la page
      navigate("/");
    } catch (err) {
      setError("Email ou mot de passe incorrect");
      console.error(err);
    }
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100">
      <Paper className="p-8 w-full max-w-md">
        <Typography
          variant="h5"
          className="mb-6 font-bold text-center text-blue-900"
        >
          Connexion
        </Typography>

        {error && <p className="text-red-600 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" fullWidth>
            Se connecter
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
