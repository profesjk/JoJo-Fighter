import { Card, Flex } from "@chakra-ui/react";
import { Step } from "./Step";

const Steps = [
  {
    icon: "/steps/icon1.png",
    size: "sm",
    title: "Donate to Local Food Banks",
    description: "Donate your excess food to your local food banks and ask for a receipt.",
    style: { width: "10px", height: "10px" } 
  },
  {
    icon: "/steps/icon2.png",
    size: "sm",
    title: "Upload the receipt",
    description: "Upload your receipt and AI will verify the donated food products.",
  },
  {
    icon: "/steps/icon3.png",
    size: "sm",
    title: "Earn rewards",
    description: "Earn cryptocurrency for purchasing eco-friendly products.",
    style: { width: "50%", height: "50%" }
  },
];
export const Instructions = () => {
  return (
    <Card mt={3} w={"full"}>
      <Flex
        p={{ base: 4 }}
        w="100%"
        direction={{ base: "column"}}
      >
        {Steps.map((step, index) => (
          <Step key={index} {...step} />
        ))}
      </Flex>
    </Card>
  );
};
