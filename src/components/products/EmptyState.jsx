import { Typography } from "@mui/material";
import { motion } from "framer-motion";
import SearchOffIcon from "@mui/icons-material/SearchOff";

/**
 * Composant affiché lorsqu'aucun produit n'est trouvé
 */
export default function EmptyState({ resetFilters }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      {/* Icône animée */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <SearchOffIcon
          sx={{
            fontSize: 80,
            color: "text.secondary",
            mb: 2,
          }}
        />
      </motion.div>

      {/* Messages */}
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Aucun produit trouvé
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ maxWidth: 400, mb: 3 }}
      >
        Essayez de modifier vos critères de recherche ou explorez d'autres
        catégories.
      </Typography>

      {/* Bouton reset */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={resetFilters}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Réinitialiser les filtres
      </motion.button>

      {/* Message clignotant */}
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
  );
}
