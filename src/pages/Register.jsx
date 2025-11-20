import React, { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { registerUser } from "../services/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (password !== password2) {
      setMsg("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      // Appel à l'API pour créer le compte
      const data = await registerUser({
        username,
        email,
        password,
        password2,
        first_name: firstName,
        last_name: lastName,
        phone,
      });

      // Sauvegarde des tokens reçus
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

      // Sauvegarde du profil
      localStorage.setItem("user", JSON.stringify(profile));

      // Redirection vers l’accueil
      window.location.href = "/";
    } catch (err) {
      if (err.response?.data) {
        setMsg(JSON.stringify(err.response.data, null, 2));
        console.error(err.response.data);
      } else {
        setMsg("Erreur inconnue lors de la création du compte.");
        console.error(err);
      }
    }
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100">
      <Paper className="p-8 w-full max-w-md">
        <Typography
          variant="h5"
          className="mb-6 font-bold text-center text-blue-900"
        >
          Inscription
        </Typography>

        {msg && <p className="text-center mb-3 text-red-600">{msg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Prénom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Téléphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Confirmer le mot de passe"
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            S'inscrire
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
