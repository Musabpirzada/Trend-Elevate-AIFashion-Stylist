'use client'
import React from 'react'
import { Flex, Heading, Text, Icon, Button, Input  } from "@chakra-ui/react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import styles from './page.module.css';
import { auth, firestore } from "@/firebase";
import { useEffect, useState } from "react";
import { getUserData, storePaymentInformation } from "@/firebase";
import { ToastContainer, toast } from 'react-toastify';

export default function checkout() {

  const [user, setUser] = useState(null);
  const [cardDetails, setCardDetails] = useState("");
  const [cvc, setCvc] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const currentDate = new Date();

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userId = authUser.uid;

        try {
          const userData = await getUserData(userId);
          console.log('Fetched user data:', userData); 

          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePayment = async () => {
    try {
      if (!user) {
        console.error('User not authenticated.');
        return;
      }

      // Ensure all required fields are filled
      if (!cardDetails || !cvc || !expiryDate) {
        console.error('Please fill all fields.');
        return;
      }

      // Store payment information in Firestore
      await storePaymentInformation(user.email, {
        cardDetails: cardDetails,
        cvc: cvc,
        expiryDate: expiryDate,
        currentDate: new Date().toISOString()
      });

      // Clear input fields after successful payment
      setCardDetails("");
      setCvc("");
      setExpiryDate("");

      //toast.success('Payment information stored successfully!');
      console.log("Done")
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 5000); // 5 seconds delay
    } catch (error) {
      console.error('Error storing payment information:', error);
    }
  };

  return (
    <Flex
    // bg="#C580E7"
    className={styles.back}
    h="100vh"
    w="100%"
    justifyContent="center"
    alignItems="center">

      <Flex className={styles.blurbg}/>

      <Flex 
      h="80vh"
      w="150vh"
      bg="#e9ecef"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      borderRadius={16}
      position="absolute"
      zIndex={2}
      >
        <Flex
        h="50vh"
        w="100%"
        bg="#45216d"
        borderRadius={16}
        display="flex"
        flexDir="column"
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        gap={4}
        color="#e9ecef"
        >
          <Heading
          fontSize="2.5em"
          letterSpacing="tight"
          fontFamily="monospace"
          >Do more with Premium</Heading>

          <Text
          fontSize="1.1em"
          mb={5}
          >Subscribe Today to get exclusive access to our premium benefits and features</Text>

          <Flex
          w="65%"
          h="50px"
          // bg="white"
          display="flex"
          flexDir="row"
          alignItems="center"
          gap={2}
          mb={10}
          >
            <Icon as={IoIosCheckmarkCircle} 
            h={8}
            w={8}
            bg="#e9ecef"
            borderRadius="50%"
            color="#3FCD43"/>
            <Text
            fontSize="14px"
            letterSpacing="tight">Better Recommendations</Text>

            <Icon as={IoIosCheckmarkCircle} 
            h={8}
            w={8}
            bg="#e9ecef"
            borderRadius="50%"
            color="#3FCD43"/>
            <Text
            fontSize="14px"
            letterSpacing="tight">Priority Infrastructure</Text>

            <Icon as={IoIosCheckmarkCircle} 
            h={8}
            w={8}
            bg="#e9ecef"
            borderRadius="50%"
            color="#3FCD43"/>
            <Text
            fontSize="14px"
            letterSpacing="tight">Generate Numerous Images</Text>

            <Icon as={IoIosCheckmarkCircle} 
            h={8}
            w={8}
            bg="#e9ecef"
            borderRadius="50%"
            color="#3FCD43"/>
            <Text
            fontSize="14px"
            letterSpacing="tight">Preserve Images</Text>
          </Flex>

        </Flex>

        <Flex
        w="75%"
        h="34vh"
        bgGradient="linear(to-t, #8a0e9e, #158aa1)"
        position="relative"
        display="flex"
        flexDir="row"
        top={-20}
        borderRadius={16}>

          <Flex
          h="100%"
          w="35%"
          // bg="lightblue"
          borderTopLeftRadius={16}
          borderBottomLeftRadius={16}
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="left"
          borderRight="1px solid #e9ecef"
          >
            <Text letterSpacing="tight"  fontSize="large" ml={5} mb={2} fontFamily="monospace"
            color="#e9ecef">You'll Pay,</Text>
            <Flex display="flex" flexDir="row" ml={5} mb={6} color="#e9ecef">
              <Heading fontSize="xxx-large"
              fontFamily="revert">$9</Heading>
              <Text>.99</Text>
            </Flex>

            <Flex w={60} display="flex" flexDir="column">
            {user ? (
                <Text
                  color="white" // Set the text color to white
                  ml={4}
                  mr={2}
                  mb={2}
                >
                  {user.email}
                </Text>
              ) : (
                <Text
                  color="white" // Set the text color to white
                  ml={4}
                  mr={2}
                  mb={2}
                >
                  Email
                 </Text> 
              )}
                          
              {/* <Input color="#e9ecef" ml={4} mr={2} variant='flushed' placeholder='Card Holder Name' /> */}
            </Flex>
          </Flex>


          <Flex display="flex" flexDir="column"
          h="100%"
          w="65%"
          borderTopRightRadius={16}
          borderBottomRightRadius={16}
          justifyContent="center"
          alignItems="left">

              <Text 
              letterSpacing="tight"  fontSize="large" ml={5} mb={2} mt={3} fontFamily="monospace"
              color="#e9ecef">Card Details</Text>

            <Flex display="flex" flexDir="column" h="120px" w="100%" mb={2}>
              <Input color="#e9ecef" w="65vh" ml={6} mr={2} mb={6} variant='flushed' placeholder='XXXX    XXXX    XXXX    XXXX' value={cardDetails} onChange={(e) => setCardDetails(e.target.value)}/> 
              
              <Flex display="flex" flexDir="row" h="50px" w="100%" justifyContent="center" alignItems="center" gap={20}>
              <Input color="#e9ecef" w="15vh" variant='flushed' placeholder='C V C' value={cvc} onChange={(e) => setCvc(e.target.value)}/> 
              <Input color="#e9ecef" w="15vh" variant='flushed' placeholder='MM / YY'  value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}/> 
              </Flex>

            </Flex>
            <Button mr={8} alignSelf="flex-end" h="45px" w="150px" onClick={handlePayment}>Pay Now</Button>
          </Flex>

        </Flex>
      </Flex>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </Flex>
  )
}