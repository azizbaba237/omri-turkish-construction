import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, cartTotal, updateQuantity } =
    useContext(CartContext);
  const navigate = useNavigate();

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.color || "", item.size || "", item.quantity + 1);
  };

  const handleDecrease = (item) => {
    updateQuantity(item.id, item.color || "", item.size || "", item.quantity - 1);
  };

  return (
    <Box className="p-6 bg-gray-100 min-h-screen">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/products")}
        className="mb-6 bg-white hover:bg-gray-200 transition"
      >
        Retour aux produits
      </Button>

      <Typography
        variant="h4"
        className="mb-8 font-bold text-blue-900 lg:text-center text-center md:text-left"
      >
        Mon Panier
      </Typography>

      {cartItems.length === 0 ? (
        <Typography className="text-center text-gray-600 mt-20 text-lg">
          Votre panier est vide.
        </Typography>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Liste des produits */}
          <Box className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <Paper
                key={`${item.id}-${item.color}-${item.size}`}
                className="flex flex-col sm:flex-row items-center sm:justify-between p-4 hover:shadow-xl transition-transform rounded-lg transform hover:-translate-y-1"
              >
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
                  />
                  <div className="flex-1 mt-2 sm:mt-0">
                    <Typography className="font-semibold">{item.name}</Typography>
                    {item.color && (
                      <Typography className="text-gray-600 text-sm">
                        Couleur: {item.color}
                      </Typography>
                    )}
                    {item.size && (
                      <Typography className="text-gray-600 text-sm">
                        Taille: {item.size}
                      </Typography>
                    )}

                    {/* Quantité */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleDecrease(item)}
                        className="hover:bg-gray-200 transition"
                      >
                        -
                      </Button>
                      <Typography className="px-2">{item.quantity}</Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleIncrease(item)}
                        className="hover:bg-gray-200 transition"
                      >
                        +
                      </Button>
                    </div>

                    <Typography className="text-gray-800 mt-1">
                      {item.price} x {item.quantity}
                    </Typography>
                  </div>
                </div>
                <div className="flex mt-2 sm:mt-0 items-center gap-2">
                  <IconButton
                    onClick={() => removeFromCart(item.id, item.color, item.size)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </Paper>
            ))}
          </Box>

          {/* Résumé du panier */}
          <Box className="bg-white p-6 rounded-lg shadow-md flex-shrink-0 w-full lg:w-80 sticky top-24">
            <Typography variant="h6" className="font-semibold mb-4">
              Récapitulatif
            </Typography>
            <Divider className="mb-4" />
            <div className="flex justify-between mb-4">
              <Typography>Total:</Typography>
              <Typography className="font-bold underline">
                {cartTotal.toLocaleString()} FCFA
              </Typography>
            </div>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              component={Link}
              to="/order"
              className="mb-2 transition-transform hover:scale-105"
            >
              Passer la commande
            </Button>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={clearCart}
              className="transition-transform hover:scale-105"
            >
              Vider le panier
            </Button>
          </Box>
        </div>
      )}
    </Box>
  );
};

export default Cart;
