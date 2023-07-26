import * as React from "react";
import {  Box, Button } from "@mui/material";
import Typography from "../../utils/Typography";
import StartTopSectionLayout from "./StartTopSectionLayout";
import SouthIcon from '@mui/icons-material/South';

const backgroundImage = "/images/배경움짤.gif";

  
export default function StartTopSection() {
  return (
    <StartTopSectionLayout
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
        alt="SF-DB 첫화면 이미지"
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
        href="/main"
        sx={{ minWidth: 200 }}
      >
        둘러보기
      </Button>
      <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
        Discover the experience
      </Typography>
      <Box sx={{marginTop:'30px'}}>
        <SouthIcon/>
        </Box>
    </StartTopSectionLayout>
  );
}