import * as React from "react";
import Typography from "../components/Typography";
import {  Button } from "@mui/material";

const backgroundImage =
  "https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400";

export default function HomeTopSection() {
  return (
    <HomeTopSection
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography
        color="white"
        align="center"
        variant="h2"
        marked="center"
        marginTop="50px"
        marginBottom="-50px"
      >
        온 우주의 SF 영화를 담다
      </Typography>
      <Typography
        color="science"
        align="center"
        variant="h5"
        sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
      >
        상상력을 자극하는 작품들이 기다리고 있습니다
      </Typography>
      <Button
        color="science"
        variant="contained"
        size="large"
        component="a"
        href="/"
        sx={{ minWidth: 200 }}
      >
        둘러보기
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
    </HomeTopSection>
  );
}
