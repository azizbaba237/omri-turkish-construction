import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { loginUser } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Login via API
      const data = await loginUser(email, password);

      // Sauvegarde des tokens
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      // Récupération du profil utilisateur
      const response = await fetch("http://127.0.0.1:8000/api/auth/profile/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.access}`,
        },
      });

      const profile = await response.json();

      // Sauvegarde du profil dans le localStorage
      localStorage.setItem("user", JSON.stringify(profile));

      // Redirection vers la page d’accueil
      window.location.href = "/";
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
