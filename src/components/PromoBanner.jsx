import React from "react";
import { Box, Typography } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const PromoBanner = () => (
  <Box sx={{ backgroundColor: "#f29200", color: "#000", py: 2, textAlign: "center" }}>
    <Typography variant="h6" fontWeight="bold">
      <LocalOfferIcon sx={{ verticalAlign: "middle", mr: 1 }} />
      NB: NOS PRODUITS BENEFICIENT D'UNE GARANTIE D'UN AN
    </Typography>
  </Box>
);

export default PromoBanner;
