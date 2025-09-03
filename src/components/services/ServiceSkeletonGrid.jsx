import React from "react";
import { Grid, Card, CardContent, Skeleton } from "@mui/material";

const ServiceSkeletonGrid = () => {
  return (
    <Grid container spacing={4} justifyContent="center">
      {Array.from({ length: 6 }).map((_, i) => (
        <Grid
          item
          key={i}
          xs={12}
          sm={6}
          md={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Card
            sx={{
              maxWidth: 360,
              width: "100%",
              borderRadius: 3,
              boxShadow: 3,
              overflow: "hidden",
            }}
          >
            <Skeleton variant="rectangular" height={180} />
            <CardContent>
              <Skeleton width="40%" />
              <Skeleton width="80%" height={30} />
              <Skeleton width="100%" height={60} />
              <Skeleton width="50%" height={25} />
              <Skeleton width="100%" height={40} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ServiceSkeletonGrid;
