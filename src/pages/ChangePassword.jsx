import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
    new_password2: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    if (passwords.new_password !== passwords.new_password2) {
      setMsg("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      const token = localStorage.getItem("access");
      await axios.post(
        "/api/profile/change-password/",
        {
          old_password: passwords.old_password,
          new_password: passwords.new_password,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg("Mot de passe changé avec succès !");
      setPasswords({ old_password: "", new_password: "", new_password2: "" });
    } catch (err) {
      console.error(err);
      setMsg("Erreur lors du changement de mot de passe.");
    }
  };

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100">
      <Paper className="p-8 w-full max-w-md">
        <Typography
          variant="h5"
          className="mb-6 font-bold text-center text-blue-900"
        >
          Changer Mot de Passe
        </Typography>

        {msg && <p className="text-center mb-3 text-red-600">{msg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            fullWidth
            label="Mot de passe actuel"
            name="old_password"
            type="password"
            value={passwords.old_password}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Nouveau mot de passe"
            name="new_password"
            type="password"
            value={passwords.new_password}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Confirmer nouveau mot de passe"
            name="new_password2"
            type="password"
            value={passwords.new_password2}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Changer
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ChangePassword;
