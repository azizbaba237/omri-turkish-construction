import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // 🔀 Fonction de fusion intelligente
  const mergeCarts = (localCart, userCart) => {
    console.log("🔀 Fusion en cours...");
    console.log("  - localCart:", localCart);
    console.log("  - userCart:", userCart);

    const merged = [...userCart];

    localCart.forEach((localItem) => {
      const existingIndex = merged.findIndex(
        (item) =>
          item.id === localItem.id &&
          item.color === localItem.color &&
          item.size === localItem.size
      );

      if (existingIndex !== -1) {
        console.log(`  ✅ Article ${localItem.id} existe, ajout quantité`);
        merged[existingIndex].quantity += localItem.quantity;
      } else {
        console.log(`  ➕ Nouvel article ${localItem.id} ajouté`);
        merged.push(localItem);
      }
    });

    console.log("  - Résultat fusion:", merged);
    return merged;
  };

  // 📤 Synchroniser le panier fusionné avec le backend
  const syncCartToBackend = async (cart) => {
    try {
      await fetch("http://127.0.0.1:8000/api/cart/sync/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify({ items: cart }),
      });
    } catch (error) {
      console.error("Erreur sync panier:", error);
    }
  };

  // 🔥 Fusionner panier localStorage + panier utilisateur après login
  const loadUserCartWithMerge = async (localCartData = []) => {
    try {
      console.log("🔵 DÉBUT loadUserCartWithMerge");
      console.log("📦 Panier localStorage passé en param:", localCartData);

      const response = await fetch("http://127.0.0.1:8000/api/cart/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      if (!response.ok) throw new Error("Erreur chargement panier");

      const data = await response.json();
      console.log("📡 Réponse API complète:", data);

      const userCart = data.items || data.cart || [];
      console.log("🛒 Panier utilisateur backend:", userCart);

      // 🔥 Fusionner les deux paniers
      const mergedCart = mergeCarts(localCartData, userCart);
      console.log("✅ Panier fusionné:", mergedCart);

      setCartItems(mergedCart);
      setIsAuthenticated(true);

      // 🗑️ Vider localStorage après fusion
      localStorage.removeItem("cart");

      // 📤 Optionnel : envoyer le panier fusionné au backend
      if (mergedCart.length > 0) {
        await syncCartToBackend(mergedCart);
      }
    } catch (error) {
      console.error("❌ Erreur chargement panier utilisateur:", error);
    }
  };

  // 🔥 Version originale de loadUserCart (pour compatibilité)
  const loadUserCart = async () => {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    await loadUserCartWithMerge(localCart);
  };

  // 🔥 Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    console.log("🟢 INIT CartContext");
    const token = localStorage.getItem("access");

    // ⚡ IMPORTANT : Lire le localStorage AVANT de le modifier
    const localCart = localStorage.getItem("cart");

    console.log("  - Token présent:", !!token);
    console.log("  - localStorage cart:", localCart);

    if (token) {
      // Si connecté → charger le panier utilisateur ET fusionner avec localStorage
      console.log("  → Utilisateur connecté, fusion avec localStorage");
      setIsAuthenticated(true);

      // 🔥 Passer le localCart en paramètre pour éviter qu'il soit effacé
      const cartData = localCart ? JSON.parse(localCart) : [];
      console.log("  → Cart à fusionner:", cartData);

      loadUserCartWithMerge(cartData).then(() => setIsInitialized(true));
    } else {
      // Si non connecté → charger depuis localStorage
      console.log("  → Utilisateur NON connecté, chargement localStorage");
      const items = localCart ? JSON.parse(localCart) : [];
      console.log("  → Items chargés:", items);
      setCartItems(items);
      setIsInitialized(true);
    }
  }, []);

  // Sauvegarder dans localStorage SEULEMENT si NON connecté ET initialisé
  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      console.log("💾 Sauvegarde localStorage:", cartItems);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated, isInitialized]);

  // 🔥 Logout → vider complètement
  const logoutClearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    setIsAuthenticated(false);
  };

  const addToCart = (product, quantity = 1, color = "", size = "") => {
    console.log("➕ Ajout au panier:", product, "qty:", quantity);

    const existing = cartItems.find(
      (item) =>
        item.id === product.id && item.color === color && item.size === size
    );

    let newCart;
    if (existing) {
      newCart = cartItems.map((item) =>
        item.id === product.id && item.color === color && item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...cartItems, { ...product, quantity, color, size }];
    }

    console.log("🛒 Nouveau panier:", newCart);
    setCartItems(newCart);

    // Si connecté → sync avec le backend
    if (isAuthenticated) {
      syncCartToBackend(newCart);
    }
  };

  const removeFromCart = (id, color = "", size = "") => {
    const newCart = cartItems.filter(
      (item) => !(item.id === id && item.color === color && item.size === size)
    );
    setCartItems(newCart);

    if (isAuthenticated) {
      syncCartToBackend(newCart);
    }
  };

  const updateQuantity = (id, color = "", size = "", quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, color, size);
    } else {
      const newCart = cartItems.map((item) =>
        item.id === id && item.color === color && item.size === size
          ? { ...item, quantity }
          : item
      );
      setCartItems(newCart);

      if (isAuthenticated) {
        syncCartToBackend(newCart);
      }
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (acc, item) =>
      acc +
      parseFloat(item.price.toString().replace(/\s/g, "")) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        logoutClearCart,
        loadUserCart,
        cartCount,
        cartTotal,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
