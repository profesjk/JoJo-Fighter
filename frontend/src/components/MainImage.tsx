import {
  Image,
  Flex
} from "@chakra-ui/react";
  
  export const MainImage = () => {
    return (
        <Flex
              w={"half"}
              justifyContent={"space-between"}
              direction={{ base: "column", md: "row" }}
              alignItems={"center"}
            >
        <Image
          src="/betterbite5.png" // Replace with your image path
          alt="VLN Logo" // Provide an alt text for accessibility
          width={1800} // Set a large width
          height={"auto"}
        />
        </Flex>
    );
  };
  