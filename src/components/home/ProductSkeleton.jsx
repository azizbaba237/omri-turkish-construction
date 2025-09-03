import React from "react";
import { Card, CardContent, Skeleton, Box } from "@mui/material";

// Skeleton (chargement temporaire) pour les produits
const ProductSkeleton = () => (
  <Card sx={{ maxWidth: 350, margin: "auto", height: "100%" }}>
    {/* Image factice */}
    <Skeleton
      variant="rectangular"
      height={320}
      sx={{ borderTopLeftRadius: "4px", borderTopRightRadius: "4px" }}
    />

    {/* Textes factices */}
    <CardContent>
      <Skeleton variant="text" height={30} width="80%" />
      <Skeleton variant="text" height={20} width="60%" sx={{ mt: 1 }} />
      <Skeleton variant="text" height={25} width="40%" sx={{ mt: 1 }} />
    </CardContent>

    {/* Bouton factice */}
    <Box sx={{ p: 2, pt: 0 }}>
      <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
    </Box>
  </Card>
);

export default ProductSkeleton;
