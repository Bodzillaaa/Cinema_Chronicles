import { Box, Button, Container, Flex, Stack } from "@chakra-ui/react";
import { LogOut, Menu, Moon, Search, Sun } from "lucide-react";
import { useColorMode } from "@/components/ui/color-mode";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthUser } from "../../store/authUser";
import CCLogo from "./cc_logo";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = colorMode === "light" ? "white" : "black";
  const textColor = colorMode === "light" ? "black" : "cyan";

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuthUser();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header>
      <Box bg={bgColor} color={textColor}>
        <Container p={{ base: 4, md: 8 }}>
          <Flex justify="space-between" align="center">
            <Link to="/">
              {/* <Image
                src="finallyfinal.png"
                alt="Cinema Chronicles"
                w={{ base: "100px", md: "150px" }}
              /> */}
              <CCLogo />
            </Link>
            <Stack
              direction={["column", "row"]}
              gap={4}
              align="center"
              display={{ base: "none", md: "flex" }}
            >
              <Link to="/trending">Random Movie</Link>
              <Link to="/watchlist">Watchlist</Link>
              <Link to="/:query">
                <Search />
              </Link>

              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <Moon /> : <Sun />}
              </Button>

              <LogOut onClick={logout} cursor={"pointer"} />
            </Stack>
            <Box display={{ base: "block", md: "none" }}>
              <Menu onClick={toggleMobileMenu} cursor={"pointer"} />
            </Box>
          </Flex>
          {isMobileMenuOpen && (
            <Stack
              direction="column"
              gap={4}
              align="left"
              display={{ base: "flex", md: "none" }}
              mt={4}
            >
              <Link to="/trending">Random Movie</Link>
              <Link to="/watchlist">Watchlist</Link>
              <Link to="/:query">
                <Search />
              </Link>

              <Button onClick={toggleColorMode} w={"fit-content"}>
                {colorMode === "light" ? <Moon /> : <Sun />}
              </Button>

              <LogOut onClick={logout} cursor={"pointer"} />
            </Stack>
          )}
        </Container>
      </Box>
    </header>
  );
};

export default Navbar;
