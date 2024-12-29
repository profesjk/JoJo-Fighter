import { ComponentStyleConfig } from "@chakra-ui/react";

export const ButtonStyle: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {},
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primarySubtle: {
      bg: "linear-gradient(90deg, rgba(0, 128, 0, 1) 0%, rgba(34, 139, 34, 1) 100%)",
      color: "white",
      _hover: {
        bg: "linear-gradient(90deg, rgba(0, 128, 0, 0.8) 0%, rgba(34, 139, 34, 0.8) 100%)",
      },
    },
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: "md",
    rounded: "full",
    variant: "solid",
  },
};
