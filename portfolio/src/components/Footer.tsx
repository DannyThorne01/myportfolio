"use client";

import React from "react";
import { Box, Container, Typography, Link, Stack } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "neutral.900",
        color: "neutral.400",
        py: 4,
        mt: 8,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", sm: "flex-start" },
          gap: 3,
        }}
      >
        {/* Left side */}
        <Box textAlign={{ xs: "center", sm: "left" }}>
          <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
            Let’s Connect 
          </Typography>
          <Typography variant="body2" sx={{ color: "neutral.500" }}>
            Always open to collaborations, projects, and coffee chats.
          </Typography>
        </Box>

        {/* Right side */}
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
        >
          <Link
            href="https://github.com/DannyThorne01"
            target="_blank"
            rel="noreferrer"
            underline="hover"
            sx={{ display: "flex", alignItems: "center", gap: 1, color: "inherit", "&:hover": { color: "white" } }}
          >
            <GitHubIcon fontSize="small" /> GitHub
          </Link>
          <Link
            href="https://www.linkedin.com/in/thorne-daniel/"
            target="_blank"
            rel="noreferrer"
            underline="hover"
            sx={{ display: "flex", alignItems: "center", gap: 1, color: "inherit", "&:hover": { color: "white" } }}
          >
            <LinkedInIcon fontSize="small" /> LinkedIn
          </Link>
          <Link
            href="mailto:danielbaldeothorne@gmail.com"
            underline="hover"
            sx={{ display: "flex", alignItems: "center", gap: 1, color: "inherit", "&:hover": { color: "white" } }}
          >
            <EmailIcon fontSize="small" /> Email
          </Link>
          <Link
            href="tel:+6313041562"
            underline="hover"
            sx={{ display: "flex", alignItems: "center", gap: 1, color: "inherit", "&:hover": { color: "white" } }}
          >
            <PhoneIcon fontSize="small" /> Call
          </Link>
          {/* <Link
            href="https://your-portfolio-link.com"
            target="_blank"
            rel="noreferrer"
            underline="hover"
            sx={{ display: "flex", alignItems: "center", gap: 1, color: "inherit", "&:hover": { color: "white" } }}
          >
            <LanguageIcon fontSize="small" /> Portfolio
          </Link> */}
        </Stack>
      </Container>

      {/* Bottom note */}
      <Typography
        variant="caption"
        display="block"
        align="center"
        sx={{ mt: 8, color: "neutral.600" }}
      >
        © {new Date().getFullYear()} Daniel Baldeo-Thorne · Built with Next.js & MUI · Made with Ungodly amounts of Jolly Ranchers
      </Typography>
    </Box>
  );
};

export default Footer;
