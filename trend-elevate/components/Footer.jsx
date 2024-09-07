import React from 'react'
import { Flex, Heading, Text, Image, Box, Icon } from "@chakra-ui/react";
import { FaLinkedin, FaInstagram, FaTwitter} from "react-icons/fa";

export default function Footer()  {
  return (
    <>
    <Flex h="340px" w="100%" bg="#F3F3FF" display="flex" flexDir="row" justifyContent="center" alignItems="center" gap={5}>
        <Box h="190px" w="20%">
            <Image src="LogoTE.png" h="70%" w="80%" />
        </Box>
        <Box h="250px" w="50%" display="flex" flexDir="row" justifyContent="center" alignItems="center" gap={1}>
          <Box h="100%" w="33%" display="flex" flexDir="column" cursor="pointer">
            <Heading fontSize="medium" fontFamily="sans-serif" fontWeight={650} letterSpacing="tight" mb={6}>PRODUCTS</Heading>
            <Text fontSize="medium" fontFamily="sans-serif" letterSpacing="tight" mb={2} color="grey">Fashion Stylist</Text>
            <Text fontSize="medium" fontFamily="sans-serif" letterSpacing="tight" mb={2} color="grey">Virtual Mannequine</Text>
            <Text fontSize="medium" fontFamily="sans-serif" letterSpacing="tight" mb={2} color="grey">Recommendations</Text>
            <Text fontSize="medium" fontFamily="sans-serif" letterSpacing="tight" mb={2} color="grey">Pricing</Text>
            <Text fontSize="medium" fontFamily="sans-serif" letterSpacing="tight" mb={2} color="grey">FAQ</Text>
          </Box>
          <Box h="100%" w="33%" display="flex" flexDir="column" cursor="pointer">
            <Heading fontSize="medium" fontFamily="sans-serif" fontWeight={650} letterSpacing="tight" mb={6}>RESOURCES</Heading>
            <Text fontSize="medium" fontFamily="sans-serif" letterSpacing="tight" mb={2} color="grey">Tagging Essential Guide</Text>
            <Text w="180px" fontSize="medium" fontFamily="sans-serif" letterSpacing="tight" mb={2} color="grey">Ultimate Guide to Fashion Search</Text>
            <Text w="180px" fontSize="medium" fontFamily="sans-serif" letterSpacing="tight" mb={2} color="grey">Demystifying Fashion Taxonomy</Text>
            <Text fontSize="medium" fontFamily="sans-serif" letterSpacing="tight" mb={2} color="grey">Blogs</Text>
            <Text fontSize="medium" fontFamily="sans-serif" letterSpacing="tight" mb={2} color="grey">Case Study</Text>
          </Box>
          <Box h="100%" w="33%" display="flex" flexDir="column" cursor="pointer">
            <Heading fontSize="medium" fontFamily="sans-serif" fontWeight={650} letterSpacing="tight" mb={6}>COMPANY</Heading>
            <Text fontSize="medium" fontFamily="sans-serif" letterSpacing="tight" mb={2} color="grey">Contact Us</Text>
            <Text fontSize="medium" fontFamily="sans-serif" letterSpacing="tight" mb={2} color="grey">Careers</Text>
            <Text fontSize="medium" fontFamily="sans-serif" letterSpacing="tight" mb={2} color="grey">About Trend-Elevate AI</Text>
          </Box>

        </Box>

        <Box h="70px" w="13%" alignContent="center" textAlign="center">
          <Icon cursor="pointer" h="25px" w="25px" as={FaLinkedin}/>
          <Icon cursor="pointer" ml={3} h="25px" w="25px" as={FaInstagram}/>
          <Icon cursor="pointer" ml={3} h="25px" w="25px" as={FaTwitter}/>
        </Box>
    </Flex>
    </>
  )
}
