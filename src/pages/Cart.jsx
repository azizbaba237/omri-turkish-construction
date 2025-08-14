// src/pages/Cart.jsx
import React, { useState } from "react";
import { Box, Typography, Paper, IconButton, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Robinetterie modèle A",
      price: 20000,
      image: "/images/robinet1.jpg",
    },
    {
      id: 2,
      name: "Colonne de douche",
      price: 35000,
      image: "/images/colonne.jpg",
    },
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <Box className="p-6 bg-gray-100 min-h-screen">
      <Typography variant="h5" className="mb-6 font-bold text-blue-900">
        Mon Panier
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>Votre panier est vide.</Typography>
      ) : (
        <>
          {cartItems.map((item) => (
            <Paper
              key={item.id}
              className="flex items-center justify-between p-4 mb-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded"
                />
                <div>
                  <Typography>{item.name}</Typography>
                  <Typography color="textSecondary">
                    {item.price.toLocaleString()} FCFA
                  </Typography>
                </div>
              </div>
              <IconButton onClick={() => removeItem(item.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </Paper>
          ))}
          <Typography className="mt-4 font-bold">
            Total : {total.toLocaleString()} FCFA
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className="mt-4"
            fullWidth
          >
            Passer la commande
          </Button>
        </>
      )}
    </Box>
  );
};

export default Cart;
