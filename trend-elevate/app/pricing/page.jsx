"use client";
import styles from './page.module.css';
import 'normalize.css';
import Navbar from '@/components/navbar';
import { AuthProvider } from '../context/AuthContext';
import {
  Flex,
  Heading,
  Text,
  ListItem,
  UnorderedList,
  Button,
  Link,
} from "@chakra-ui/react";

export default function Pricing() {
  return (
    <>
    <AuthProvider><Navbar/></AuthProvider>

    <Flex
    display="flex"
    flexDir="column"
    alignItems="center"
    padding="50px 0"
    fontFamily="sans-serif"
    bg="#F3F3FF"
    h="auto"
    >
      <Flex h="auto" w="auto" display="flex" flexDir="row" gap={3}>
        <Heading
        fontSize="30px"
        mb={5}
        textAlign="center"
        fontFamily="sans-serif"
        fontWeight="300"
        >Unlock the power of</Heading>
        <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' 
                         bgClip='text' 
                         letterSpacing="tight" 
                         fontFamily="sans-serif"
                         fontSize="30px"
                         fontWeight="800"> Trend-Elevate</Heading>
      </Flex>

      <Text
      color="rgb(104, 104, 104)"
      fontSize="large"
      mb={20}
      >Choose a plan tailored to your needs</Text>

      <Flex
      as="section"
      display="flex"
      flexDir="row"
      flexWrap="wrap"
      justifyContent="center"
      gap={20}
      >
        <Flex
        padding="30px"
        borderRadius={20}
        boxShadow="0px 3px 5px 5px rgba(0, 0, 0, 0.1)"
        textAlign="center"
        h={500}
        w={500}
        bg="#F3F3FF"
        display="flex"
        flexDir="column"
        alignItems="center"
        >
          <Heading
          fontSize={25}
          textAlign="center"
          fontFamily="monospace"
          mb={3}>Apprentice Standard</Heading>

          <Text
          fontSize="large"
          color="rgb(104, 104, 104)"
          fontFamily="revert"
          >0 $ / month</Text>
          <Text
          fontSize="x-large"
          color="rgb(104, 104, 104)"
          fontFamily="monospace"
          mb={5}>Forever</Text>

          <Flex
          w={350}
          borderRadius={15}
          border="2px solid rgb(201, 208, 201 )"
          
          height={320}>

            <UnorderedList 
            display="flex" 
            flexDir="column" 
            alignItems="center" 
            listStyleType="none"
            lineHeight="3.2"
            >

              <Text mt={3} mb={2}>Basic Features</Text>

              <Flex 
              borderTop="1px solid gray"
              w="42vh"
              mb={3}
              h={1}
              ></Flex>

              <Flex h="auto" w="auto" display="flex" flexDir="column" alignItems="flex-start">
                <ListItem>No Priority infrastructure</ListItem>
                <ListItem>Limited number of Images</ListItem>
                <ListItem>No Relaxed rate Image generation</ListItem>
                <ListItem>Only Event Based Recommendations</ListItem>
              </Flex>
              

            </UnorderedList>
          </Flex>
        </Flex>

        <Flex
        padding="30px"
        borderRadius={20}
        boxShadow="0px 3px 5px 5px rgba(0, 0, 0, 0.1)"
        textAlign="center"
        h={500}
        w={500}
        bg="#F3F3FF"
        display="flex"
        flexDir="column"
        alignItems="center">

          <Heading
          fontSize={25}
          textAlign="center"
          fontFamily="monospace"
          mb={3}>Maestro Unlimited</Heading>

          <Text
          fontSize="large"
          color="rgb(104, 104, 104)"
          fontFamily="revert"
          >9.99 $ / month</Text>

          <Button _hover={{textDecor:"none", bg: "purple"}}
          bg="rgba(143, 3, 174, 0.6)"
          color="#e9ecef"
          border="none"
          p="10px 20px"
          borderRadius="5px"
          cursor="pointer"
          fontWeight="bold"
          mb={3}
          transition="0.2s ease-in-out"
          fontSize="medium"
          > <Link href="/checkout">Subscribe To Maestro</Link> </Button>

          <Flex
          w={350}
          borderRadius={15}
          border="2px solid rgb(201, 208, 201 )"
          height={320}>

            <UnorderedList 
            display="flex" 
            flexDir="column" 
            alignItems="center" 
            listStyleType="none"
            lineHeight="3.0"
            >

              <Text mt={3} mb={2}>Advanced Features</Text>

              <Flex 
              borderTop="1px solid gray"
              w="42vh"
              mb={0}
              h={1}
              ></Flex>

              <Flex h="auto" w="auto" display="flex" flexDir="column" alignItems="flex-start">
                <ListItem>✔ Preserve Images</ListItem>
                <ListItem>✔ Priority Infrastructure</ListItem>
                <ListItem>✔ Better Recommendations</ListItem>
                <ListItem>✔ Generate Numerous Images</ListItem>
                <ListItem>✔ Relaxed rate Image generation</ListItem>
              </Flex>

            </UnorderedList>
          </Flex>

        </Flex>
      </Flex>
    </Flex>

    </>
  );
}
