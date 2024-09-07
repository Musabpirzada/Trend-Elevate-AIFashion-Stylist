"use client";
import Navbar from "@/components/navbar"
import 'normalize.css';
import { Flex, Heading, Text, Image, Button, Box, Input } from "@chakra-ui/react";
import Footer from '@/components/Footer'

import { AuthProvider } from './context/AuthContext';
export default function Home() {
  return (
      <>
        <AuthProvider><Navbar/></AuthProvider>

        <Flex h="597vh" display="flex" bg="#F3F3FF" gap={10} flexDir="column" overflow="hidden" w="auto">

{/* Header Area */}
          <Flex h="600px" width="100%" bg="#F3F3FF" display="flex" flexDir="row" justifyContent="center" alignItems="center" gap={20}>

            <Flex h="360px" w="620px" display="flex" flexDir="column">
              <Flex h="140px" w="100%"  alignItems="center" mt={5}>
                <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' 
                         bgClip='text' 
                         letterSpacing="tight" 
                         fontFamily="sans-serif"
                         fontSize="70px"
                         fontWeight="150">
                  AI Powered Fashion Recommendations</Heading>
              </Flex>

              <Flex h="auto" w="80%" mt={8}>
                <Text fontSize="large" 
                letterSpacing="spacebetween"
                wordBreak="normal"
                fontFamily="revert"
                color="gray">
                  An innovative platform offering personalized fashion recommendations using advanced AI technology.</Text>
              </Flex>

              <Flex
              h="80px" w="160px"
              mt={5}
              alignItems="center"
              justifyContent="center"
              >
              </Flex>

            </Flex>

            <Flex h = "500px" w="380px">
              <Image borderRadius={20} src='Model.png'></Image>
            </Flex>
          </Flex>

{/* 2nd Container */}
          <Flex h="600px" w="100%" bg="#F3F3FF" display="flex" flexDir="column" justifyContent="center" alignItems="center" gap={4}>

            <Flex h="100px" w="72%">
              <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' 
                         bgClip='text' 
                         letterSpacing="tight" 
                         fontFamily="sans-serif"
                         fontSize="50px"
                         fontWeight="150">Chatbot and Image Generation</Heading>
            </Flex>

            <Flex display="flex" flexDir="row" gap="100px">
              <Flex h="430px" w="450px" display="flex" flexDir="column" gap={3}>
                <Flex h="280px" w="100%">
                  <Image src='AIgirl.png' w="100%" objectFit="cover" borderRadius={20} border="3px solid #6786CE" ></Image>
                </Flex>
                <Heading letterSpacing="loose" 
                         fontFamily="sans-serif"
                         fontWeight="150"
                         fontSize="x-large" color="#6786CE">Chatbot</Heading>
                <Text letterSpacing="loose" 
                         fontFamily="sans-serif"
                         fontWeight="150"
                         fontSize="large">Engage with a helpful chatbot to receive style tips and fashion advice.</Text>
              </Flex>
              
              
              <Flex h="400px" w="450px">
                <Flex h="430px" w="450px" display="flex" flexDir="column" gap={3}>
                  <Flex h="280px" w="100%">
                    <Image src='Model2.png' w="100%" objectFit="cover" borderRadius={20} border="3px solid #6786CE" ></Image>
                  </Flex>
                  <Heading letterSpacing="loose" 
                          fontFamily="sans-serif"
                          fontWeight="150"
                          fontSize="x-large" color="#6786CE">Image Generation</Heading>
                  <Text letterSpacing="loose" 
                          fontFamily="sans-serif"
                          fontWeight="150"
                          fontSize="large">Get realistic virtual outfit previews tailored to your unique preferences.</Text>
                </Flex>
              </Flex>
            
            </Flex>

          </Flex>

{/* 3rd Container */}
          <Flex h="600px" w="100%" bg="#F3F3FF" justifyContent="center" alignItems="center">

            <Flex h="400px" w="130vh" border="5px solid #D9DCE1" borderRadius={25} display="flex" flexDir="column" boxShadow="20px 20px 40px lightgrey">
              <Flex justifyContent="center" alignItems="center" w="100%" h="100px">
                <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' 
                         bgClip='text' 
                         letterSpacing="tight" 
                         fontFamily="sans-serif"
                         fontSize="50px"
                         fontWeight="150">How It Works</Heading>
              </Flex>

              <Flex h="300px" w="100%" display="flex" flexDir="row" justifyContent="center" alignItems="center" gap={1}>
                <Flex h="90%" w="33%" borderRight="3px solid #D9DCE1" justifyContent="center" alignItems="center" gap={6} display="flex" flexDir="column">
                  <Heading letterSpacing="loose" 
                         fontFamily="sans-serif" mt={2} h="20%" w="80%" fontSize="x-large" fontWeight={200} color="#6786CE">Personalized Recommendations</Heading>

                  <Text letterSpacing="loose" 
                         fontFamily="sans-serif" h="50%" w="80%" fontSize="large" color="#00002E">Our algorithm analyzes your style to suggest the perfect outfits.</Text>
                </Flex>


                <Flex h="90%" w="33%" borderRight="3px solid #D9DCE1" justifyContent="center" alignItems="center" gap={6} display="flex" flexDir="column">
                  <Heading letterSpacing="loose" 
                         fontFamily="sans-serif" mt={2} h="20%" w="80%" fontSize="x-large" fontWeight={200} color="#6786CE">Interactive Experience</Heading>

                  <Text letterSpacing="loose" 
                         fontFamily="sans-serif" h="50%" w="80%" fontSize="large" color="#00002E">Explore fashion trends, save your images, and share your findings.</Text>
                </Flex>


                <Flex h="90%" w="33%" justifyContent="center" alignItems="center" gap={6} display="flex" flexDir="column">
                  <Heading letterSpacing="loose" 
                         fontFamily="sans-serif" mt={2} h="20%" w="80%" fontSize="x-large" fontWeight={200} color="#6786CE">Seamless Image Integration</Heading>

                  <Text letterSpacing="loose" 
                         fontFamily="sans-serif" h="50%" w="80%" fontSize="large" color="#00002E">Our algorithm helps visualize outfits for you.</Text>
                </Flex>
              </Flex>
            </Flex>

          </Flex>

{/* 4th Container */}
          <Flex h="660px" w="100%" bg="#F3F3FF" justifyContent="center" alignItems="center" display="flex" flexDir="column">
            <Flex display="flex" flexDir="column" justifyContent="center" alignItems="center">
              <Heading color="#6786CE">AI Stylist</Heading>
              <Flex h="10px" w="10px" bg="#D9DCE1" borderRadius="50%" mt={3}/>
              <Flex h="100px" w="2px" bg="#D9DCE1"/>
            </Flex>

            <Flex h="350px" w="80%" display="flex" flexDir="row" justifyContent="space-between">
              <Flex h="100%" w="45%">
                <Image src='feature-1.png' borderBottomLeftRadius={25} borderTopLeftRadius={25} boxShadow="10px 10px 30px lightgrey"></Image>
              </Flex>
              <Flex h="100%" w="36%" display="flex" flexDir="column">
                <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' fontSize="xx-large" fontFamily="sans-serif" letterSpacing="loose" >Real Conversation, Powered by Microsoft Phi for Fashion</Heading>
                <Text mt={16} fontSize="larger" fontFamily="sans-serif" letterSpacing="loose">Ask for a style suggestion or products, in the following way:</Text>
                <Text mt={6} fontSize="larger" fontFamily="sans-serif" letterSpacing="loose">“Recommend a casual outfit for brunch with friends. Tan Male”</Text>
                <Text fontSize="larger" fontFamily="sans-serif" letterSpacing="loose">“Suggest tops for my video call tomorrow.White Female. Polished and Refined colors”</Text>
              </Flex>
            </Flex>

            <Flex display="flex" flexDir="column" justifyContent="center" alignItems="center">
              <Flex h="130px" w="2px" bg="#D9DCE1"/>
            </Flex>
          </Flex>

{/* 5th Container */}

          <Flex  h="600px" w="100%" bg="#F3F3FF" display="flex" flexDir="column" justifyContent="center" alignItems="center">
            <Flex h="70px" w="73%">
              <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' 
                         bgClip='text' 
                         letterSpacing="tight" 
                         fontFamily="sans-serif"
                         fontSize="50px"
                         fontWeight="150">The Virtual Mannequin</Heading>
            </Flex>

            <Flex h="426px" w="80%" display="flex" flexDir="row" justifyContent="space-between">
              <Flex h="100%" w="40%" alignItems="center">
                <Text fontSize="larger" letterSpacing="tight" fontFamily="sans-serif">Our virtual mannequin is visual, interactive powered by AI helping shoppers see exactly what they're looking for.
                 No more high bounce off without finding their favorite styles. </Text>
              </Flex>

              <Flex h="100%" w="48%" >
                <Image h="450px" objectFit="cover" src="ImageGen.png" boxShadow="10px 10px 20px lightgrey" borderRadius={15}></Image>
              </Flex>
            </Flex>
          </Flex>

{/* 6th Container */}

          <Flex h="610px" w="100%" bg="#F3F3FF" justifyContent="center" alignItems="center" display="flex" flexDir="column" >
            <Flex textAlign="left" h="90px" w="72%" >
              <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text' letterSpacing="tight" 
                         fontFamily="sans-serif"
                         fontSize="50px"
                         fontWeight="150">
                Challenges of Fashion Search
              </Heading></Flex>


              <Flex h="480px" w="80%" alignItems="center" justifyContent="center" gap={10}>

                <Flex h="370px" w="350px" mb={16} justifyContent="space-between" display="flex" flexDir="column">
                  <Flex h="140px" w="100%" alignItems="center" justifyContent="center" display="flex" flexDir="column" gap={4}>
                    <Heading color="#276EE5" fontSize="x-large" fontFamily="sans-serif" letterSpacing="loose" fontWeight={200}>Variety of Preferences</Heading>
                    <Text color="#276EE5" fontSize="large" fontFamily="sans-serif" letterSpacing="tight">Individual fashion tastes and trends are constantly evolving and diverse.</Text>
                  </Flex>

                  <Flex h="140px" w="100%" alignItems="center" justifyContent="center" display="flex" flexDir="column" gap={4}>
                    <Heading color="#A05BAB" fontSize="x-large" fontFamily="sans-serif" letterSpacing="loose" fontWeight={200}>Cultural and Regional Influences</Heading>
                    <Text color="#A05BAB" fontSize="large" fontFamily="sans-serif" letterSpacing="tight">Different cultures and regions have unique fashion trends and preferences.</Text>
                  </Flex>
                </Flex>

                <Flex h="400px" w="120px" display="flex" flexDir="column" justifyContent="space-between" alignItems="center">
                <Flex h="60px" w="100%" alignItems="center" justifyContent="center" display="flex" flexDir="row">
                  <Flex h="3px" w="40px" bg="#276EE5"/>
                  <Box h="60px" w="60px" border="3px solid #276EE5" borderRadius="50%">
                    <Text textAlign="center" mt={1} fontSize="xx-large" color="#276EE5">1</Text>
                  </Box>
                </Flex>

                <Flex h="60px" w="100%" alignItems="center" justifyContent="center" display="flex" flexDir="row">    
                  <Box h="60px" w="60px" border="3px solid #358B9C" borderRadius="50%">
                    <Text textAlign="center" mt={1} fontSize="xx-large" color="#358B9C">2</Text>
                  </Box>
                  <Flex h="3px" w="40px" bg="#358B9C"/>
                </Flex>

                <Flex h="60px" w="100%" alignItems="center" justifyContent="center" display="flex" flexDir="row">
                  <Flex h="3px" w="40px" bg="#A05BAB "/>
                  <Box h="60px" w="60px" border="3px solid #A05BAB " borderRadius="50%">
                    <Text textAlign="center" mt={1} fontSize="xx-large" color="#A05BAB ">3</Text>
                  </Box>
                </Flex>

                <Flex h="60px" w="100%" alignItems="center" justifyContent="center" display="flex" flexDir="row">
                  <Box h="60px" w="60px" border="3px solid #752FB8 " borderRadius="50%">
                    <Text textAlign="center" mt={1} fontSize="xx-large" color="#752FB8 ">4</Text>
                  </Box>
                  <Flex h="3px" w="40px" bg="#752FB8 "/>
                </Flex>
                
                </Flex>

                <Flex h="350px" w="350px" mt="150px" justifyContent="space-between" display="flex" flexDir="column">
                  <Flex h="140px" w="100%" alignItems="center" justifyContent="center" display="flex" flexDir="column" gap={4}>
                    <Heading color="#358B9C" fontSize="x-large" fontFamily="sans-serif" letterSpacing="loose" fontWeight={200}>Visual-AI Complexities</Heading>
                    <Text color="#358B9C" fontSize="large" fontFamily="sans-serif" letterSpacing="tight">Understanding and interpreting diverse fashion styles with accuracy.</Text>
                  </Flex>

                  <Flex h="140px" w="100%" alignItems="center" justifyContent="center" display="flex" flexDir="column" gap={4}>
                    <Heading color="#752FB8" fontSize="x-large" fontFamily="sans-serif" letterSpacing="loose" fontWeight={200}>Data Privacy and Security</Heading>
                    <Text color="#752FB8" fontSize="large" fontFamily="sans-serif" letterSpacing="tight">Handling user data and preferences while ensuring privacy and security.</Text>
                  </Flex>
                </Flex>
              </Flex>
          </Flex>

{/* 7th Container */}
          <Flex h="auto" w="100%" display="flex" flexDir="column">
          <Flex h="150px" w="100%" bg="blue" display="flex" flexDir="row" alignItems="center" justifyContent="center" gap={1}>
            <Box h="50%" w="35%" textAlign="center" alignContent="center">
              <Heading letterSpacing="loose" fontSize="xx-large" fontWeight={350} fontFamily="fantasy" color="#FEFEFF">Subscribe to our Newsletter</Heading>
            </Box>
            <Box h="50%" w="35%" display="flex" flexDir="row" justifyContent="center" alignItems="center" gap={3}>
              <Input type="email" h="60%" w="50%" border="2px solid #F3F3FF" placeholder='Enter your Email' _placeholder={{ opacity: 1, color: 'white' }} color="white" borderRadius={30} />
              <Button h="60%" w="20%" bg="#F3F3FF" borderRadius={30} color="blue">Submit</Button>
            </Box>
          </Flex>
          <Footer></Footer>
          </Flex>

        </Flex>
      </>
      )
}
