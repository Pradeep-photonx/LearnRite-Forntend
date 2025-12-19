import React from "react";
import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { BlackRightArrowIcon } from "./icons/CommonIcons";


interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // If no items provided, generate from current path
  const breadcrumbItems: BreadcrumbItem[] = items || (() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const items: BreadcrumbItem[] = [{ label: "Home", path: "/home" }];
    
    pathnames.forEach((pathname, index) => {
      const path = `/${pathnames.slice(0, index + 1).join("/")}`;
      // Handle special cases for better labels
      let label = pathname;
      if (pathname === "schools") {
        label = "Schools";
      } else if (pathnames[index - 1] === "schools" && pathnames[index + 1]) {
        // If it's a school slug followed by a class slug, show school name
        label = pathname
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      } else if (pathnames[index - 1] && pathnames[index - 1] !== "schools" && !pathnames[index + 1]) {
        // If it's the last segment (class slug), format it
        label = pathname
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      } else {
        // Format other paths
        label = pathname
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
      
      items.push({
        label,
        path: index === pathnames.length - 1 ? undefined : path,
      });
    });
    
    return items;
  })();

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
    <Box sx={{ borderTop: "1px solid #1214191A", borderBottom: "1px solid #1214191A", py:"10px", backgroundColor:"#FFF !important" }}>
      <Container  maxWidth="xl">
        <Breadcrumbs 
          aria-label="breadcrumb" 
          separator={<BlackRightArrowIcon />}
          sx={{
            "& .MuiBreadcrumbs-separator": {
              margin: "0 8px",
              display: "flex",
              alignItems: "center",
            },
          }}
        >
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          
          if (isLast || !item.path) {
            return (
              <Typography
                key={index}
                variant="r14"
                sx={{
                  color: "#121419 !important"
                }}
              >
                {item.label}
              </Typography>
            );
          }
          
          return (
            <Link

              key={index}
              component="button"
              variant="r14"
              fontFamily={"inherit !important"}
              onClick={() => handleClick(item.path!)}
              sx={{
                color: "#121419",
                textDecoration: "none",
                cursor: "pointer",
                "&:hover": {
                  color: "#2C65F9",
                  textDecoration: "none",
                },
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </Breadcrumbs>
        </Container> 
    </Box>
    </>
  
  );
};

export default Breadcrumb;

