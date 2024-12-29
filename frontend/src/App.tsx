import { DAppKitProvider } from "@vechain/dapp-kit-react";
import { ChakraProvider, Container, Flex, VStack, Button } from "@chakra-ui/react";
import {
  Dropzone,
  Footer,
  InfoCard,
  Instructions,
  Navbar,
  SubmissionModal,
} from "./components";
import { lightTheme } from "./theme";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { MainImage } from "./components/MainImage";
import { MainStatistics } from "./components/MainStatistics";
import { Dashboard } from "./components/Dashboard";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { MdOutlineArrowOutward } from "react-icons/md";

// RECaptcha V3 site key (https://developers.google.com/recaptcha/docs/v3)
const VITE_RECAPTCHA_V3_SITE_KEY = import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY as string;

function App() {
  return (
    <BrowserRouter>
      <GoogleReCaptchaProvider reCaptchaKey={VITE_RECAPTCHA_V3_SITE_KEY}>
        <ChakraProvider theme={lightTheme}>
          <DAppKitProvider
            usePersistence
            requireCertificate={false}
            genesis="test"
            nodeUrl="https://testnet.vechain.org/"
            logLevel={"DEBUG"}
          >
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Flex flex={1}>
                      <Container
                        mt={{ base: 4, md: 10 }}
                        maxW={"container.xl"}
                        mb={{ base: 4, md: 10 }}
                        display={"flex"}
                        flex={1}
                        alignItems={"flex-start"} // Align items to the left
                        justifyContent={"flex-start"}
                        flexDirection={"row"}
                      >
                        <VStack p={4}>
                          <InfoCard />
                          <Instructions />
                          <Dropzone />
                        </VStack>
                        <VStack p={4} align={"center"} gap={10}>
                          <Flex>
                            <MainImage />
                          </Flex>
                          <MainStatistics />
                          <NavigateButton />
                        </VStack>
                      </Container>
                    </Flex>
                    <SubmissionModal />
                  </>
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <Footer />
          </DAppKitProvider>
        </ChakraProvider>
      </GoogleReCaptchaProvider>
    </BrowserRouter>
  );
}

function NavigateButton() {
  const navigate = useNavigate();
  
  return (
    <Button
    rounded={"full"}
    leftIcon={<MdOutlineArrowOutward />}
    size={"lg"}
    mt={{ base: 2, md: 0 }}
    ml={{ base: 0, md: 2 }}
    onClick={() => navigate("/dashboard")}
    bgGradient="linear(to-r, green.400, green.600)" // Slightly darker green gradient background
    color="white" // Text color
    _hover={{
      bgGradient: "linear(to-r, green.500, green.700)", // Darker gradient on hover
      boxShadow: "0 0 20px 5px rgba(0, 255, 0, 0.7)" // Glow effect on hover
    }}
    boxShadow="0 0 10px 2px rgba(0, 255, 0, 0.5)" // Initial glow effect
  >
    Dashboard
  </Button>
  );
}

export default App;
