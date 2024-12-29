import { Box, Container, HStack, Image, Text } from "@chakra-ui/react";
import { ConnectWalletButton } from "./ConnectWalletButton";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {

  const navigate = useNavigate();

  return (
    <Box
      px={0}
      position={"sticky"}
      top={0}
      zIndex={10}
      py={4}
      h={"auto"}
      w={"full"}
      bg={"#f7f7f7"}
    >
      <Container
        w="full"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems={"center"}
        maxW={"container.xl"}
      >
      
      <HStack flex={1} justifyContent="start" alignItems="center" onClick={() => navigate("/")} cursor={"pointer"}>
        <Image src="/apple.png" width="50px" height={"auto"} alt="Apple Logo" />
        <Text fontSize="xl" ml={2} fontWeight={"bold"}>StellarBite</Text>
      </HStack>

        <HStack flex={1} spacing={4} justifyContent={"end"}>
          <ConnectWalletButton />
        </HStack>
      </Container>
    </Box>
  );
};
