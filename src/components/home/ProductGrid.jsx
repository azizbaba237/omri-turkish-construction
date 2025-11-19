import React from "react";
import { Grid, Box, Skeleton } from "@mui/material";
import ProductCard from "../ProductCard";

const ProductGrid = ({ products = [], loading = false }) => {
  const skeletons = [...Array(3)]; // on garde 3 skeletons max
  const displayProducts = products.slice(1, 4); // ⚡ garder max 3 produits visibles

  return (
    <Box sx={{ py: { xs: 4, sm: 6 } }}>
      <Grid container spacing={2}>
        {(loading ? skeletons : displayProducts).map((product, index) => (
          <Grid
            item
            key={product?.id || index}
            xs={12} // 1 produit par ligne sur mobile
            sm={6} // 2 produits par ligne sur tablette
            md={4} // 3 produits par ligne sur écran moyen
            lg={3} // 4 produits par ligne sur grand écran
          >
            {loading ? (
              <Skeleton
                variant="rectangular"
                height={280}
                sx={{ borderRadius: 2 }}
              />
            ) : (
              <ProductCard product={product} />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductGrid;
