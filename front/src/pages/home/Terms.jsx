import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Markdown from "../../modules/components/Markdown";
import Typography from "../../modules/components/Typography";
import AppAppBar from "../../modules/views/AppAppBar";
import AppFooter from "../../modules/views/AppFooter";
import terms from "../../modules/views/terms.md";

function Terms() {
  return (
    <>
      <AppAppBar />
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Terms
          </Typography>
          <Markdown>{terms}</Markdown>
        </Box>
      </Container>
      <AppFooter />
    </>
  );
}

export default Terms;
