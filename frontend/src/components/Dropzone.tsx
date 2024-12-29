import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, HStack, Text, VStack, Image } from "@chakra-ui/react";

import { blobToBase64, getDeviceId, resizeImage } from "../util";
import { useWallet } from "@vechain/dapp-kit-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { submitReceipt } from "../networking";
import { useDisclosure, useSubmission } from "../hooks";

export const Dropzone = () => {
  const { account } = useWallet();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const { setIsLoading, setResponse } = useSubmission();
  const { onOpen } = useDisclosure();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      onFileUpload(acceptedFiles); // Pass the files to the callback
    },
    maxFiles: 1, // Allow only one file
    accept: {
      "image/*": [], // Accept only image files
    },
  });

  const handleCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      alert("Recaptcha not loaded");
      return;
    }

    const token = await executeRecaptcha("submit_receipt");
    return token;
  }, [executeRecaptcha]);

  const onFileUpload = useCallback(
    async (files: File[]) => {
      if (files.length > 1 || files.length === 0) {
        alert("Please upload only one file");
        return;
      }

      if (!account) {
        alert("Please connect your wallet");
        return;
      }

      setIsLoading(true);
      onOpen();

      const file = files[0];

      const resizedBlob = await resizeImage(file);
      const base64Image = await blobToBase64(resizedBlob as Blob);

      const captcha = await handleCaptchaVerify();

      if (!captcha) {
        alert("Captcha failed, please try again");
        return;
      }

      const deviceID = await getDeviceId();

      try {
        const response = await submitReceipt({
          address: account,
          captcha,
          deviceID,
          image: base64Image,
        });

        console.log(response);

        setResponse(response);
      } catch (error) {
        alert("Error submitting receipt");
      } finally {
        setIsLoading(false);
      }
    },
    [account, handleCaptchaVerify, onOpen, setIsLoading, setResponse]
  );

  return (
    <VStack w={"full"} mt={3}>
      <Box
        {...getRootProps()}
        p={5}
        border="2px"
        borderColor={isDragActive ? "green.300" : "gray.300"}
        borderStyle="dashed"
        borderRadius="md"
        bgGradient={isDragActive ? "linear(to-r, green.500, green.700)" : "linear(to-r, green.400, green.600)"}
        textAlign="center"
        cursor="pointer"
        _hover={{
          borderColor: "green.500",
          bgGradient: "linear(to-r, green.500, green.700)",
          boxShadow: "0 0 30px 10px rgba(0, 255, 0, 0.9)",
        }}
        boxShadow="0 0 20px 5px rgba(0, 255, 0, 0.7)"
        w={"full"}
        h={"100px"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition={"all 0.3s"}
      >
        <input {...getInputProps()} />
        <HStack>
          
          <Image src="/upload.png" h={16} borderRadius={16} />
          <Text color="white" fontWeight="bold">Upload to scan</Text>
        </HStack>
      </Box>
    </VStack>
  );
};
