import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts, getCategories } from "../services/api";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Skeleton,
  Fade,
  Zoom,
} from "@mui/material";
import { motion } from "framer-motion";
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("name");
  const [loading, setLoading] = useState(true);

  // Récupération produits + catégories
  useEffect(() => {
    setLoading(true);
    Promise.all([getProducts(), getCategories()])
      .then(([productsRes, categoriesRes]) => {
        setProducts(productsRes.data.results || productsRes.data || []);
        setCategories(categoriesRes.data.results || categoriesRes.data || []);
      })
      .catch((err) => console.error("Erreur chargement :", err))
      .finally(() => setLoading(false));
  }, []);

  // Filtrage et tri
  const filteredProducts = products
    .filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => {
      if (filter === "all") return true;
      return String(p.category?.id) === String(filter);
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.price) || 0;
      const priceB = parseFloat(b.price) || 0;
      if (sort === "price-asc") return priceA - priceB;
      if (sort === "price-desc") return priceB - priceA;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      {/* Titre */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
          Nos Produits
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          Découvrez notre sélection de produits sanitaires de qualité.
        </Typography>
      </motion.div>

      {/* Barre recherche + filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            my: 4,
          }}
        >
          <TextField
            label="Rechercher un produit"
            variant="outlined"
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ maxWidth: 400 }}
          />

          <TextField
            select
            label="Catégorie"
            variant="outlined"
            size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="all">Toutes les catégories</MenuItem>
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Trier par"
            variant="outlined"
            size="small"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="name">Toues les prix</MenuItem>
            <MenuItem value="price-asc">Prix croissant</MenuItem>
            <MenuItem value="price-desc">Prix décroissant</MenuItem>
          </TextField>
        </Box>
      </motion.div>

      {/* Liste produits */}
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Skeleton
                variant="rectangular"
                height={320}
                sx={{ borderRadius: 2 }}
                animation="wave"
              />
              <Skeleton variant="text" sx={{ mt: 2, fontSize: '1.5rem' }} animation="wave" />
              <Skeleton variant="text" width="60%" animation="wave" />
              <Skeleton variant="text" width="40%" animation="wave" />
            </motion.div>
          ))}
        </motion.div>
      ) : filteredProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center py-16 text-center"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <SearchOffIcon 
              sx={{ 
                fontSize: 80, 
                color: 'text.secondary',
                mb: 2
              }} 
            />
          </motion.div>
          
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Aucun produit trouvé
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mb: 3 }}>
            Essayez de modifier vos critères de recherche ou explorez d'autres catégories.
          </Typography>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSearch("");
              setFilter("all");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Réinitialiser les filtres
          </motion.button>

          <motion.div
            className="mt-8 opacity-60"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Typography variant="caption" color="text.secondary">
              Essayez des termes plus génériques ou différentes catégories
            </Typography>
          </motion.div>
        </motion.div>
      )}
    </Box>
  );
}