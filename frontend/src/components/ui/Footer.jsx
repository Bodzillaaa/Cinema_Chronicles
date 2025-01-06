import { Text, Stack, Link, Container } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";

const Footer = () => {
  const { colorMode } = useColorMode();

  const bgColor = colorMode === "light" ? "white" : "black";
  const textColor = colorMode === "light" ? "black" : "cyan";

  return (
    <footer>
      <Container bg={bgColor} color={textColor} py={4} mt={8}>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify="space-between"
          align="center"
        >
          <Text color={colorMode === "light" ? "black" : "cyan"}>
            Built by{" "}
            <Link fontWeight={"bold"} color={textColor} href="#">
              Araf
            </Link>
            ,{" "}
            <Link fontWeight={"bold"} color={textColor} href="#">
              Alvee
            </Link>
            {" & "}
            <Link fontWeight={"bold"} color={textColor} href="#">
              Anika
            </Link>
          </Text>
          <Stack direction="row" spacing={6}>
            <Text>Cinema Chronicles</Text>
          </Stack>
        </Stack>
      </Container>
    </footer>
  );
};

export default Footer;
