import { StyleFunctionProps, createMultiStyleConfigHelpers } from "@chakra-ui/react"
import { cardAnatomy } from "@chakra-ui/anatomy"

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys)

// define custom styles for funky variant
const variants = {
  base: (props: StyleFunctionProps) =>
    definePartsStyle({
      container: {
        bg: props.colorMode === "dark" ? "#1A1A1A" : "#FFF",
        borderWidth: "1px",
        borderColor: props.colorMode === "dark" ? "#2D2D2F" : "transparent",
        boxShadow: "0 0 20px 5px rgba(255, 255, 255, 1)", // more intense white glow
        width: "50%", // half the width
      },
    }),
  filled: (props: StyleFunctionProps) =>
    definePartsStyle({
      container: {
        bg: props.colorMode === "dark" ? "#2D2D2F" : "#FAFAFA",
        boxShadow: "0 0 20px 5px rgba(255, 255, 255, 1)", // more intense white glow
        width: "50%", // half the width
      },
    }),
  baseWithBorder: (props: StyleFunctionProps) =>
    definePartsStyle({
      container: {
        bg: props.colorMode === "dark" ? "#1A1A1A" : "#FFF",
        borderWidth: "1px",
        borderColor: props.colorMode === "dark" ? "#2D2D2F" : "gray.100",
        boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.5)", // more intense white glow
        width: "50%", // half the width
      },
    }),
  secondaryBoxShadow: (props: StyleFunctionProps) =>
    definePartsStyle({
      container: {
        boxShadow: "0 0 10px 5px rgba(255, 255, 255, 1), inset 0px 0px 30px 5px rgba(177, 241, 108, 1)", // more intense white glow and secondary box shadow
        bg: props.colorMode === "dark" ? "#1A1A1A" : "#FFF",
        borderWidth: "1px",
        borderColor: props.colorMode === "dark" ? "#2D2D2F" : "gray.100",
        width: "50%", // half the width
      },
    }),
}

// export variants in the component theme
export const cardTheme = defineMultiStyleConfig({
  variants,
  defaultProps: {
    variant: "base", // default is solid
  },
})
