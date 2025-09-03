import { Box, TextField, MenuItem } from "@mui/material";
import { motion } from "framer-motion";

/**
 * Barre de recherche, filtre catégorie et tri
 */
export default function ProductFilters({
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
  categories,
}) {
  return (
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
        {/* Champ recherche */}
        <TextField
          label="Rechercher un produit"
          variant="outlined"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ maxWidth: 400 }}
        />

        {/* Filtre catégorie */}
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

        {/* Tri produits */}
        <TextField
          select
          label="Trier par"
          variant="outlined"
          size="small"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="name">Tous les prix</MenuItem>
          <MenuItem value="price-asc">Prix croissant</MenuItem>
          <MenuItem value="price-desc">Prix décroissant</MenuItem>
        </TextField>
      </Box>
    </motion.div>
  );
}
