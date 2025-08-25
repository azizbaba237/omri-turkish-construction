import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Divider,
  Snackbar,
  Alert,
  Chip,
  Fade,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, cartTotal, updateQuantity } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.color || "", item.size || "", item.quantity + 1);
    showSnackbar("Quantité augmentée", "info");
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.color || "", item.size || "", item.quantity - 1);
      showSnackbar("Quantité diminuée", "info");
    }
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.color, item.size);
    showSnackbar("Produit retiré du panier", "warning");
  };

  const handleClearCart = () => {
    clearCart();
    showSnackbar("Panier vidé", "error");
  };

  const calculateItemTotal = (item) => {
    const price = parseFloat(item.price.replace('€', '').replace(',', '.')) || 0;
    return price * item.quantity;
  };

  const shippingCost = cartTotal > 100 ? 0 : 9.99;
  const finalTotal = cartTotal + shippingCost;

  return (
    <Box className="p-3 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Snackbar pour les notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Header */}
      <Box className="mb-4 sm:mb-6">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/products")}
          className="bg-white hover:bg-gray-100 transition"
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          sx={{ mb: 2 }}
        >
          {isMobile ? "Retour" : "Continuer mes achats"}
        </Button>
        
        <Typography
          variant={isMobile ? "h5" : "h4"}
          className="font-bold text-gray-900 text-center mb-4"
          sx={{ 
            background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          🛒 Mon Panier
        </Typography>

        {cartItems.length > 0 && (
          <Chip
            label={`${cartItems.length} article${cartItems.length > 1 ? 's' : ''}`}
            color="primary"
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            className="mb-3"
          />
        )}
      </Box>

      {cartItems.length === 0 ? (
        <Box className="text-center py-8 sm:py-16 px-4">
          <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🛒</div>
          <Typography variant={isMobile ? "h6" : "h5"} className="text-gray-600 mb-3 sm:mb-4">
            Votre panier est vide
          </Typography>
          <Typography variant="body2" className="text-gray-500 mb-6 sm:mb-8">
            Découvrez nos produits et trouvez l'inspiration
          </Typography>
          <Button
            variant="contained"
            size={isMobile ? "medium" : "large"}
            onClick={() => navigate("/products")}
            startIcon={<ArrowBackIcon />}
            className="bg-blue-600 hover:bg-blue-700 transition"
            fullWidth={isMobile}
            sx={{ maxWidth: isMobile ? '100%' : '300px' }}
          >
            Découvrir les produits
          </Button>
        </Box>
      ) : (
        <Fade in={true} timeout={500}>
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Liste des produits */}
            <Box className="flex-1 space-y-3 sm:space-y-4">
              {cartItems.map((item) => (
                <Fade in={true} key={`${item.id}-${item.color}-${item.size}`} timeout={300}>
                  <Paper
                    className="p-3 sm:p-4 hover:shadow-lg transition-all rounded-xl border border-gray-100"
                    elevation={1}
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                      {/* Image */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg mx-auto sm:mx-0"
                      />
                      
                      {/* Infos produit */}
                      <div className="flex-1 min-w-0 w-full">
                        <Typography 
                          variant={isMobile ? "body1" : "subtitle1"} 
                          className="font-semibold text-center sm:text-left mb-2"
                          sx={{ wordBreak: 'break-word' }}
                        >
                          {item.name}
                        </Typography>
                        
                        {/* Couleur et taille */}
                        {(item.color || item.size) && (
                          <Box className="flex flex-wrap gap-1 justify-center sm:justify-start mb-2">
                            {item.color && (
                              <Chip
                                label={`Couleur: ${item.color}`}
                                size="small"
                                variant="outlined"
                                color="primary"
                              />
                            )}
                            {item.size && (
                              <Chip
                                label={`Taille: ${item.size}`}
                                size="small"
                                variant="outlined"
                                color="secondary"
                              />
                            )}
                          </Box>
                        )}

                        {/* Prix et quantité - Layout mobile optimisé */}
                        <Box className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-3">
                          {/* Prix */}
                          <Typography 
                            variant={isMobile ? "body1" : "h6"} 
                            className="text-blue-600 font-bold text-center sm:text-left"
                          >
                            {calculateItemTotal(item).toFixed(2)} Fcfa
                            <Typography 
                              variant="caption" 
                              component="span" 
                              className="text-gray-500 ml-1 hidden sm:inline"
                            >
                              ({item.price} × {item.quantity})
                            </Typography>
                          </Typography>

                          {/* Contrôle de quantité */}
                          <Box className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
                            <IconButton
                              size="small"
                              onClick={() => handleDecrease(item)}
                              disabled={item.quantity <= 1}
                              className="hover:bg-gray-200 transition"
                              sx={{ padding: isMobile ? '4px' : '8px' }}
                            >
                              <RemoveIcon fontSize={isMobile ? "small" : "medium"} />
                            </IconButton>
                            <Typography 
                              className="px-2 min-w-[2rem] text-center font-medium"
                              variant={isMobile ? "body2" : "body1"}
                            >
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => handleIncrease(item)}
                              className="hover:bg-gray-200 transition"
                              sx={{ padding: isMobile ? '4px' : '8px' }}
                            >
                              <AddIcon fontSize={isMobile ? "small" : "medium"} />
                            </IconButton>
                          </Box>

                          {/* Bouton suppression */}
                          <IconButton
                            onClick={() => handleRemoveItem(item)}
                            color="error"
                            size={isMobile ? "small" : "medium"}
                            sx={{ 
                              alignSelf: isMobile ? 'flex-end' : 'center',
                              marginTop: isMobile ? '-40px' : '0'
                            }}
                          >
                            <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
                          </IconButton>
                        </Box>

                        {/* Prix unitaire visible seulement sur mobile */}
                        {isMobile && (
                          <Typography variant="caption" className="text-gray-500 block text-center mt-1">
                            {item.price} × {item.quantity}
                          </Typography>
                        )}
                      </div>
                    </div>
                  </Paper>
                </Fade>
              ))}
            </Box>

            {/* Résumé du panier - Sticky seulement sur desktop */}
            <Box 
              className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 w-full lg:w-80"
              sx={{
                position: isMobile ? 'static' : 'sticky',
                top: isMobile ? 'auto' : '100px',
                alignSelf: isMobile ? 'center' : 'flex-start',
                maxWidth: isMobile ? '400px' : 'none'
              }}
            >
              <Typography variant={isMobile ? "subtitle1" : "h6"} className="font-bold mb-3 text-gray-900">
                Récapitulatif
              </Typography>
              <Divider className="mb-3" />
              
              {/* Détails du prix */}
              <Box className="space-y-2 mb-4">
                <Box className="flex justify-between">
                  <Typography variant="body2">Sous-total:</Typography>
                  <Typography variant="body2" className="font-medium">
                    {cartTotal.toFixed(2)} Fcfa
                  </Typography>
                </Box>
                
                <Box className="flex justify-between">
                  <Typography variant="body2">Livraison:</Typography>
                  <Typography variant="body2" className="font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-green-600">Gratuite</span>
                    ) : (
                      `${shippingCost}€`
                    )}
                  </Typography>
                </Box>

                {shippingCost === 0 && cartTotal > 0 && (
                  <Typography variant="caption" className="text-green-600 block text-right">
                    ✓ Livraison offerte
                  </Typography>
                )}

                <Divider className="my-2" />
                
                <Box className="flex justify-between">
                  <Typography variant={isMobile ? "body1" : "h6"} className="font-bold">
                    Total:
                  </Typography>
                  <Typography variant={isMobile ? "body1" : "h6"} className="font-bold text-blue-600">
                    {finalTotal.toFixed(2)} Fcfa
                  </Typography>
                </Box>
              </Box>

              <Divider className="mb-4" />
              
              {/* Boutons d'action */}
              <Box className="space-y-2">
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size={isMobile ? "medium" : "large"}
                  component={Link}
                  to="/order"
                  startIcon={<ShoppingCartCheckoutIcon />}
                  className="bg-blue-600 hover:bg-blue-700 transition-transform hover:scale-105 py-2 sm:py-3"
                >
                  {isMobile ? "Commander" : "Commander maintenant"}
                </Button>
                
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  size={isMobile ? "small" : "medium"}
                  onClick={handleClearCart}
                  startIcon={<DeleteForeverIcon />}
                  className="transition-transform hover:scale-105"
                >
                  {isMobile ? "Vider" : "Vider le panier"}
                </Button>
              </Box>

              {/* Info livraison */}
              <Typography variant="caption" className="text-gray-500 block mt-3 text-center">
                ✓ Livraison rapide ✓ Retours gratuits
              </Typography>
            </Box>
          </div>
        </Fade>
      )}
    </Box>
  );
};

export default Cart;