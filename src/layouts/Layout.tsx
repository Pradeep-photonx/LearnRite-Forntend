import React from "react";
import { Box, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import TopHeader from "./TopHeader";
import Footer from "../pages/home/Footer";
import Breadcrumb from "../components/Breadcrumb";
import AnnocemntBar from "./AnnocemntBar";

interface LayoutProps {
  children: React.ReactNode;
  footerPaddingTop?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, footerPaddingTop = "140px" }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/home" || location.pathname === "/";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", background:"#f9f9f9" }}>
      {isHomePage && <AnnocemntBar />}
      <TopHeader />
      {!isHomePage && (
          <Breadcrumb />
      )}
      <Box sx={{ flex: 1 }}>{children}</Box>
      <Footer paddingTop={footerPaddingTop} />
    </Box>
  );
};

export default Layout;

