import {
  Box,
  Card,
  HStack,
  Image,
  VStack,
  Text,
  Flex,
  Link,
} from "@chakra-ui/react";


export const InfoCard = () => {
  return (
    <Card w={"half"}>
      <Box p={3}>
        <VStack w={"fourth"} spacing={{ base: 3, md: 4 }}>
          <Image src="/stellar.png" borderRadius={16} />
          <Flex
            w={"half"}
            justifyContent={"space-between"}
            direction={{ base: "column", md: "row" }}
            alignItems={"center"}
          >
            <HStack alignSelf={{ base: "left", md: "flex-start" }}>
              <Image src="/apple.png" h={16} borderRadius={16} />
              <Text fontSize={24} fontWeight={800}>
              StellarBite
              </Text>
            </HStack>
            <Flex
              mt={{ base: 4, md: 0 }}
              direction={{ base: "column", md: "row" }}
            >
              <Link isExternal href="https://github.com/vechain/x-app-template">
                
              </Link>
            </Flex>
          </Flex>
        </VStack>
      </Box>
    </Card>
  );
};
