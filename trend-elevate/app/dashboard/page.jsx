"use client";
import styles from "./page.module.css";
import "normalize.css";
import React, { useState, useEffect } from "react";
import { auth, firestore, getUserData} from "@/firebase";
import { Progressbar } from "../../components/Progressbar";
import { LuHome, LuLayoutDashboard } from "react-icons/lu";
import { TbMessageChatbot } from "react-icons/tb";
import { FaImages } from "react-icons/fa6";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import {
  Flex,
  Heading,
  Avatar,
  Text,
  Icon,
  IconButton,
  Link,
  Box,
  Image,
} from "@chakra-ui/react";
import { collection, query, where, getDocs } from "firebase/firestore";
import axios from "axios";
import dynamic from 'next/dynamic';

const GraphChart = dynamic(() => import('@/components/GraphChart'), { ssr: false });


export default function dashboard() {

  
  const [subscribed, setSubscribed] = useState(true);
  const [user, setUser] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [images, setImages] = useState([]);
  const [expanded, setExpanded] = useState(false);
  

  const calculateSubscriptionEndDate = (startDate) => {
    if (!startDate) return "Not subscribed to a plan yet!";

    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1); // Add one month
    end.setDate(end.getDate() - 1); // Subtract one day to get the last day of the previous month

    const startMonth = start.toLocaleString('default', { month: 'short' });
    const endMonth = end.toLocaleString('default', { month: 'short' });

    return `${startMonth} ${start.getDate()} - ${endMonth} ${end.getDate()}`;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userId = authUser.uid;
        const userEmail = authUser.email;

        try {
          const userData = await getUserData(userId);
          console.log('Fetched user data:', userData, userEmail); 

          setUser(userData);
          fetchPaymentInfo(userEmail);
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  

  const fetchPaymentInfo = async (userEmail) => {
    try {
        const q = query(collection(firestore, 'payments'), where("userEmail", "==", userEmail));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
            // Check if the document matches the user's email
            if (doc.data().userEmail === userEmail) {
                setPaymentInfo(doc.data());
                return;
            }
        });

        console.error("No payment information found for user");
    } catch (error) {
        console.error("Error fetching payment information:", error);
    }
};

  const fetchImages = async () => {
    try{
      const user = auth.currentUser
    if(!user){
      console.log("User not authenticated")
        return;
    }
    else{
      const userId = user.uid

      const response = await axios.post('http://localhost:8080/api/retrieveimages', {
        userId: userId
    });
      const userImages = response.data.userimages
      setImages(userImages)
      console.log('User Images:',userImages);
    }
    }
    catch(error){
      console.log("Error Fetching user Images", error);
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        fetchImages();
      } else {
        console.log("User not authenticated");
      }
    });
    return unsubscribe;
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  //mask function for card Details to hide
  const maskCardNumber = (cardNumber) => {
    if (!cardNumber) return '';
    const lastFourDigits = cardNumber.slice(-4);
    const maskedNumber = '************'.slice(0, cardNumber.length - 4) + lastFourDigits;
    return maskedNumber;
  };
  const maskCVC = (cvc) => {
    if (!cvc) return '';
    return '***';
  };
  

  return (
    <Flex h="100vh" flexDir="row" overflow="hidden" maxW="2000px">
      {/* Side Bar */}
      <Flex
        w="15%"
        flexDir="col"
        alignItems="center"
        justifyContent="center"
        backgroundColor="#3c096c"
        color="#e9ecef"
      >
        <Flex flexDir="column" justifyContent="space-between" height="100vh">
          <Flex flexDir="column" as="nav">
            <Heading
              mt={50}
              mb={100}
              // pl={5}
              fontSize="2xl"
              alignSelf="center"
              letterSpacing="tight"
            >
              Trend Elevate.
            </Heading>

            <Flex
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              gap={4}
              // pl={14}
            >
              <Flex className={styles.sidebaritems}>
                <Link>
                  <Icon
                    as={LuLayoutDashboard}
                    fontSize="2xl"
                    className={styles.activeicon}
                  />
                </Link>
                <Link _hover={{ textDecor: "none" }}>
                  <Text className={styles.active}>Dashboard</Text>
                </Link>
              </Flex>

              <Flex className={styles.sidebaritems}>
                <Link>
                  <Icon as={LuHome} fontSize="2xl" className={styles.icon} />
                </Link>
                <Link _hover={{ textDecor: "none" }} href="/">
                  <Text>Home</Text>
                </Link>
              </Flex>

              <Flex className={styles.sidebaritems}>
                <Link>
                  <Icon
                    as={TbMessageChatbot}
                    fontSize="2xl"
                    className={styles.icon}
                  />
                </Link>
                <Link _hover={{ textDecor: "none" }} href="/chatbot">
                  <Text>Chatbot</Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>

          <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
            {/* <Avatar my={2}/> */}
            <label htmlFor="avatar-upload">
              <Avatar my={2} name="user-avatar" />
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                style={{ display: "none" }}
                // onChange={handleUpload}
              />
            </label>
            {user ? (
              <Text fontFamily="monospace" fontSize="larger">{user.name}</Text>
            ) : (
              <Text>Username</Text>
            )}
          </Flex>
        </Flex>
      </Flex>

      {/* Column 2 */}
      <Flex w="60%" p="3%" flexDir="column" overflow="auto" minH="100vh"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
      >
        <Heading
          fontSize={35}
          fontFamily="monospace"
          fontWeight="normal"
          mb={4}
          letterSpacing="tight"
        >
          Welcome Back.
        </Heading>
        {/* <Text color="gray" fontSize="sm">
          Your Analytics
        </Text> */}

        {/* //////////////////////////
          Chart. js Are
          ////////////////////////// */}
        <GraphChart />

        <Flex justifyContent="space-between" mt={8}>
          <Flex align="flex-end">
            <Heading as="h2" size="lg" letterSpacing="tight">
              Images
            </Heading>
            <Text fontSize="small" color="gray" ml={3}>
              Saved Images
            </Text>
          </Flex>
          <Icon mt={2} fontSize={25} as={FaImages} />
        </Flex>

        <Flex flexDir="column" display="flex" alignItems="center" mt={5}>
          <Flex overflow="auto" maxHeight={expanded ? '600px' : '300px'} transition="max-height 0.3s ease"
                  sx={{
                    '&::-webkit-scrollbar': {
                      width: '12px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: '#f1f1f1',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#7037AA',
                      borderRadius: '6px',
                      border: '3px solid transparent',
                      backgroundClip: 'content-box',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: '#5d2991',
                    },
                  }}
          >
            {/* ////////////////////Here will be the images////////////////// */}
            <Flex wrap="wrap" gap={4}>
              {images.map((imgSrc, index) => (
                <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden">
                  <Image width="300px" height="400px" src={imgSrc} alt={`Image ${index + 1}`} objectFit="contain" />
                </Box>
              ))}
            </Flex>
            
          </Flex>
          <IconButton mt={4} onClick={handleExpandClick} w="10%">
            {expanded ? <FiChevronUp/> : <FiChevronDown/>}
          </IconButton>
        </Flex>

      </Flex>



      {/* Column 3 */}
      <Flex w="30%" bgColor="#F5F5F5" p="3%" flexDir="column" overflow="auto">
        <Heading alignSelf="flex-start" as="h2" fontSize={25} letterSpacing="tight" fontFamily="sans-serif" fontWeight="normal" color="purple.700">
          Card Info -
        </Heading>
        <Box
          borderRadius="25px"
          mt={4}
          p={4}
          w="100%"
          h="200px"
          bgGradient="linear(to-t, #B57295, #29259A)"
        >
        <Flex flexDir="column" alignItems="flex-start">
        <Text letterSpacing="tight" fontWeight="bold" color="white">Card Details:</Text>
        <Text letterSpacing="tight" color="white">{paymentInfo ? maskCardNumber(paymentInfo.cardDetails) : "N/A"}
</Text>

      </Flex>
      <Flex flexDir="column" alignItems="flex-start" mt={4}>
        <Text letterSpacing="tight" fontWeight="bold" color="white">CVC:</Text>
        <Text letterSpacing="tight" color="white">{paymentInfo ? maskCVC(paymentInfo.cvc) : "N/A"}</Text>

      </Flex>
      <Flex flexDir="column" alignItems="flex-start" mt={4}>
        <Text letterSpacing="tight" fontWeight="bold" color="white">Expiry Date:</Text>
        <Text letterSpacing="tight" color="white">{paymentInfo ? paymentInfo.expiryDate : "N/A"}</Text>
      </Flex>
        </Box>

        <Heading mt={10} mb={2} as="h2" alignSelf="flex-start" fontSize={25} letterSpacing="tight" fontFamily="sans-serif" fontWeight="normal" color="purple.700">
          Remaining Time -</Heading>
          <Flex h="auto" w="auto" display="flex" flexDir="row" gap={3}>
            <Text letterSpacing="tight" fontWeight="bold">Monthly Bill</Text>
            <Text letterSpacing="tight">{calculateSubscriptionEndDate(paymentInfo ? paymentInfo.currentDate : "N/A")}</Text>
          </Flex>
        <Flex mt={5} h="auto" w="auto">
          <Progressbar 
            subscribed={subscribed}
            endDate={calculateSubscriptionEndDate(paymentInfo ? paymentInfo.currentDate : "N/A")}
            onTimerEnd={() => setSubscribed(false)}
          />
        </Flex>
        
      </Flex>
    </Flex>
  );
}