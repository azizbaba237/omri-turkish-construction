import { Skeleton } from "@mui/material";
import { motion } from "framer-motion";

/**
 * Grille de chargement avec Skeletons
 */
export default function ProductSkeletonGrid() {
  return (
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
          <Skeleton
            variant="text"
            sx={{ mt: 2, fontSize: "1.5rem" }}
            animation="wave"
          />
          <Skeleton variant="text" width="60%" animation="wave" />
          <Skeleton variant="text" width="40%" animation="wave" />
        </motion.div>
      ))}
    </motion.div>
  );
}
