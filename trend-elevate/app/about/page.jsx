'use client'
import Navbar from '@/components/navbar';
import Footer from '@/components/Footer';
// import Talha from '../../public/Talha.jpg'
// import Musab from '../../public/Musab.png'
import { AuthProvider } from '../context/AuthContext';
import 'normalize.css';
import { Flex, Heading, Text, Image, Box, Highlight} from "@chakra-ui/react";

export default function About() {
    return (
        <>
            <AuthProvider><Navbar/></AuthProvider>

            <Flex bg="#F3F3FF" h="200vh" display="flex" gap={3} 
                  flexDir="column" overflow="hidden" w="auto" justifyContent="center">

                <Flex h="auto" w="97%" ml={5}>
                <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' 
                         bgClip='text' 
                         letterSpacing="tight" 
                         fontFamily="sans-serif"
                         fontSize="45px"
                         fontWeight={800} >About us</Heading>
                </Flex>
                <Flex height="63%" w="97%" mt="25px" display="flex" flexDir="row" ml={5}>
                    
                    <Flex h="100%" w="55%" display="flex" flexDir="column" gap={8}>
                        <Box h="180px" w="90%">
                            <Text
                            fontFamily="sans-serif" fontSize="large"
                            letterSpacing="loose">After combining experience, two founders, and countless challenges later, 
                            <Highlight query={['Trend-Elevate','AI','was','born','from','a','simple','word:','frustration']} styles={{color: 'blue.500'}}>Trend-Elevate AI was born from a simple word: frustration</Highlight>.Despite spending years working on some of the most advanced tech products on the market, 
                            Talha and Musab struggled to perform a simple task: "What to wear today!". Anyone who has tried to find clothing online knows the particular type of frustration that comes with typing and re-typing keywords into a search engine,
                            only to receive thousands of irrelevant search results. </Text>
                        </Box>

                        <Box h="100px" w="90%">
                            <Text
                            fontFamily="sans-serif" fontSize="large"
                            letterSpacing="loose">Conventional keyword input is ineffective while using search engines. 
                            The typical user is not familiar with the extensive and precise textual information that is required about the product. 
                            Users should also be familiar with the lexicon of fashion labels in addition to accuracy.  </Text>
                        </Box>

                        <Box h="130px" w="90%">
                            <Text
                            fontFamily="sans-serif" fontSize="large"
                            letterSpacing="loose"> Talha and Musab combined elements of search that had never been blended: <Highlight query='Fashion and artificial intelligence' styles={{color:'blue.500'}}>Fashion and artificial intelligence</Highlight>. Talha, competent in artificial intelligence and Musab, a backend developer
                            both software enginners used their background to build a solution that was high-tech, but easy for users to navigate. </Text>
                        </Box>

                        <Box h="50px" w="90%">
                            <Text
                            fontFamily="sans-serif" fontSize="large"
                            letterSpacing="loose"> And so, the mission was born: to transform fashion recommendations search like never before. </Text>
                        </Box>

                        <Box h="140px" w="90%">
                            <Text
                            fontFamily="sans-serif" fontSize="large"
                            letterSpacing="loose"> At Trend-Elevate, we believe that everyone deserves to feel confident and empowered through their wardrobe choices. 
                            Our journey began with the idea of creating a dressing recommendation system that goes beyond the ordinary
                            <Highlight query={['- a','system','that','not','only','suggests','outfits','but','understands','your','individual','style','preferences']} styles={{color:'blue.500'}}>- a system that not only suggests outfits but understands your individual style preferences</Highlight>,
                            tailoring recommendations to suit your personality and the occasions that matter most to you.</Text>
                        </Box>

                        <Box h="170px" w="90%">
                            <Text
                            fontFamily="sans-serif" fontSize="large"
                            letterSpacing="loose"> After carefully studying the current trends about styles preferences, 
                            cultural and regional influences and going through many trials and errors on with AI complexities,
                            Trend-Elevate was created. Through Trend-Elevate, customers can get custom made recomemndations for events,
                            whether they want an opinion to purchase something or need help to come up with a decision.
                            No need to type in long, rich keyword combinations in google. Just write your prompt and let the AI
                            do its magic.</Text>
                        </Box>

                    </Flex>
                </Flex>

                <Flex h="312px" w="70%" ml={5} display="flex" flexDir="column" gap={4}>
                    <Box h="6px" w="30px" bg="black"/>
                    <Box h="auto" w="auto" fontSize="medium">Founding Members</Box>
                    <Flex h="250px" w="100%" display="flex" flexDir="row" gap={16}>
                        <Box h="100%" w="47%">
                            <Image src='Musab.jpg' h="69%" w="40%"/>
                            <Heading fontFamily="sans-serif" fontWeight="450" fontSize="larger">Musab Pirzada</Heading>
                            <Text fontSize="larger" fontFamily="monospace">CEO</Text>
                        </Box>
                        <Box h="100%" w="47%">
                        <Image src='Talha.jpg' h="69%" w="40%"/>
                        <Heading fontFamily="sans-serif" fontWeight="450" fontSize="larger">Talha Saeed</Heading>
                        <Text fontSize="larger" fontFamily="monospace">CTO</Text>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
            
        </>
    );
}
