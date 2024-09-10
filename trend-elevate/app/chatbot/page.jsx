"use client";
import "normalize.css";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { Flex, Heading, Text, Icon, Button, Input, Image, Box, IconButton, Spinner  } from "@chakra-ui/react";
import { HiLightningBolt } from "react-icons/hi";
import { BsStars } from "react-icons/bs";
import { RiChatNewLine } from "react-icons/ri";
import axios from "axios";
import { FaTimes, FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import { auth, firestore, getUserData} from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import nlp from 'compromise';

export default function chatbot() {
  const [isOpen, setisOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [isLiked, setIsLiked] = useState({});
  const [dialogMessage, setDialogMessage] = useState("");
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isHovered, setIsHovered] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDropdown = () => setisOpen(!isOpen);

  const toggleDialog = async () => {
    setIsDialogOpen(!isDialogOpen);
  
    if (isDialogOpen) {
      setDialogMessage("");
      setGeneratedImages([]);
    } else {
      if (dialogMessage.trim() !== "") {
        await getImages(dialogMessage);
      }
    }
  };

  const backendUrl = 'http://localhost:8080/api';
  

  useEffect(() => {
    const hasUserMessage = messages.some((msg) => msg.role === "user");
    if (hasUserMessage &&chats && chats.length === 0) {
      const latestUserMessage = messages.find((msg) => msg.role === "user");
      const newChatName = latestUserMessage
        ? `${latestUserMessage.content}`
        : "New Chat";
      const newChat = { name: newChatName };
      setChats((prevChats) => [...prevChats, newChat]);
    }
  }, [messages, chats]);


  const updateChatsName = async (chats, message) => {
    try {
      if (chats.length > 0 && chats[chats.length - 1].name === "New Chat") {
        const doc = nlp(message);
        console.log(doc)
        const updatedChat = doc.out('text').split(' ').slice(2, 5).join(' ');
        
        const userId = auth.currentUser.uid;

        const response = await axios.post(`${backendUrl}/chats`, {
          userId,
          updatedChat,
        });

        const updatedChats = [
          ...chats.slice(0, chats.length - 1),
          updatedChat
        ]
        return {
          updatedChats,
          chatName: updatedChat
        };
      } else {
        return chats;
      }
    } catch (error) {
      console.error("Error sending updated chat to backend:", error);
      return chats;
    }
  };
    
  const handleSendMessage = async () => {
    try {
      if (!message) return;
      const isNewChat = chats.length > 0 && chats[chats.length - 1].name === "New Chat";
      const { updatedChats, chatName } = isNewChat ? 
        await updateChatsName(chats, message) : 
        { updatedChats: chats, chatName: chats[chats.length - 1].name };

        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "user", content: message },
        ]);

      const response = await axios.post(`${backendUrl}/messages`, {
        message,
        chatName,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: response.data.message },
      ]);
      
      if (activeChat !== null) {
        setChats((prevChats) => {
          const updated = [...prevChats];
          updated[activeChat].name = chatName;
          return updated;
        });
      }
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleNewChat = async () => {
    setMessages([]);
    const newChat = { name: "New Chat", messages: [] };
    setChats(prevChats => [...prevChats, newChat]);
    setActiveChat(chats.length)
  };

  const handleChatClick = async (index) => {
    setActiveChat(index);
    const selectedchat = chats[index];

    try{
      const response = await axios.get(`${backendUrl}/getmessages`,{
        params:{
          chatname: selectedchat.name,
        },
      });

      const formattedMessages = response.data.messages.flatMap((msg) => [
        {role: 'user', content : msg.user_message},
        {role: 'bot', content : msg.bot_response},
      ]);

      setMessages(formattedMessages);
      console.log(formattedMessages);
    }catch(error) {
      console.log("Error fetching messages:", error);
      // toast.error("Failed to fetch messages");
    }

  }

  // ---------------------------------------------
  const getUserChats = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("User not authenticated");
        return;
      }
      const userId = user.uid;
      const response = await axios.get(`${backendUrl}/retrievechats`, {
          params:{userId: userId}
      });
      const userChats = response.data.chats;
      setChats(userChats);
      console.log('User chats:',userChats);
    } catch (error) {
      console.log("Error Fetching user chats", error);
    }
  }
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        getUserChats();
      } else {
        console.log("User not authenticated");
      }
    });
    return unsubscribe;
  }, []);
  
  
  // ------------------------------------------------------------------
  const handleLikeClick = async (imgSrc) => {
    try {
      const userId = auth.currentUser.uid;
      setIsLiked((prevLikes) => ({ ...prevLikes, [imgSrc]: !prevLikes[imgSrc] }));
      if (!isLiked[imgSrc]) {
        await axios.post(`${backendUrl}/like-image`, { imgSrc, userId });
      }
      console.log("liked Image sent to backend")
    } catch (error) {
      console.error("Error saving like:", error);
    }
  };


  const getImages = async (userMessage) => {
    try{
      const response = await axios.post(`${backendUrl}/images`,{
        message: userMessage
      });
      const images = response.data.images;
      const decodedImages = images.map((img) => `data:image/png;base64,${img}`);

      setGeneratedImages((prevImages) => [...prevImages, ...decodedImages]);
    }catch (error){
      console.error("Error fetching images:", error);
      return [];
    }
  }

  const handleMessageChange = (e) => {
    setDialogMessage(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsLoading(true)
      if (dialogMessage.trim() !== "") {
        const images = await getImages(dialogMessage);
        setDialogMessage("");
        setIsLoading(false)
      }
    }
  };
  const handleGenerateImagesClick = async () => {
    try {
      // Assuming you have a function to get the current user's email
      const userEmail = auth.currentUser.email;
      
      // Query the payments collection for the user's email
      const q = query(collection(firestore, 'payments'), where('userEmail', '==', userEmail));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        toast.error("You haven't subscribed to Plan Yet");
        window.location.href = '/pricing';  // Redirect to pricing page
      } else {
        toggleDialog();  // Open the image dialog box
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      toast.error('An error occurred. Please try again.');
    }
  };
  

  // console.log("Component re-rendered with chats:", chats);
  return (
    <Flex h="100vh" flexDir="row" overflow="hidden" w="auto" gap={2} bg="#3c096c">
      {/* //////////////Sidebar///////////// */}
      <Flex
        w="16%" h="97%" flexDir="column" alignItems="center" bg="#3c096c" color="#e9ecef" gap={10}
        mt={3} ml={2} borderRadius={16}
      >
        <Flex display="flex" flexDir="column" h="85%" overflow="auto"
        sx={
          { 
         '::-webkit-scrollbar':{
                display:'none'
            } } }
        >
          <Flex mt={8} onClick={handleNewChat}>
            <div className={styles.newchatbtn}>
              New chat <Icon as={RiChatNewLine} fontSize={20} color="white" />{" "}
            </div>{" "}
          </Flex>
          {chats && chats.map((chat, index) => (
            <Flex mt={8} key={index}>
              <div
                className={styles.newchatbtn}
                onClick={() => handleChatClick(index)}
              >
                {/* {chat.chatName?.name} */}
                {chat.name}
              </div>
            </Flex>
          ))}
        </Flex>

{/* ///////////////////////Images Area////////////////////////////////////// */}
          <Flex
            h="50px"
            w="80%"
          >
            <Flex
              cursor="pointer" border="2px solid #e9ecef" bg="#3c096c" borderRadius="10px" w="100%" h="100%" justifyContent="center" alignItems="center"
              onClick={handleGenerateImagesClick}
            >
              <Text>Generate Images</Text>
              <Icon w="10%" color="#e9ecef" as={BsStars} />
            </Flex>
            {isDialogOpen && (
                <Flex
                  position="fixed"
                  top="50%"
                  left="58%"
                  transform="translate(-50%, -50%)"
                  bg="#F3F3FF"
                  w="165vh"
                  h="710px"
                  borderRadius={24}
                  boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
                  zIndex={9}
                  flexDir="column"
                  alignItems="center"
                  gap={6}
                >
                  <Flex h="auto" w="100%" justifyContent="flex-end"> 
                      <Button
                        variant="ghost" color="gray.500"
                        onClick={toggleDialog}
                        _hover={{ color: "red.500" }}
                      >
                        <FaTimes />
                      </Button>
                  </Flex>
 
                  <Input
                    placeholder="Enter your text here" size="lg" w="80%" color="black" border="2px solid #3D69CE" borderRadius="20px"
                    value={dialogMessage}
                    onChange={handleMessageChange}
                    onKeyDown={handleKeyDown}
                  />
                  <Flex
                    h="500px"
                    w="80%"
                    overflowY="auto"
                    direction="column"
                    alignItems="center"
                    border="1px solid gray"
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
                    {isLoading ? (
                      <Spinner mt={20} size="xl" color="purple.500" alignSelf="center" justifySelf="center" />
                    ) : (
                      <Flex wrap="wrap" gap={4}>
                        {generatedImages.map((imgSrc, index) => (
                          <Box
                            key={index}
                            position="relative"
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            onMouseEnter={() => setIsHovered(index)}
                            onMouseLeave={() => setIsHovered(null)}
                            transition="all 0.3s"
                          >
                            <Image
                              width="300px"
                              height="400px"
                              src={imgSrc}
                              alt={`Image ${index + 1}`}
                              objectFit="contain"
                            />
                            {isHovered === index && (
                              <IconButton
                                aria-label="Like"
                                icon={<FaHeart />}
                                position="absolute"
                                top="10px"
                                right="8px"
                                colorScheme="red"
                                variant="solid"
                                onClick={() => handleLikeClick(imgSrc)}
                                color={isLiked[imgSrc] ? "red" : "white"}
                                _hover={{ color: "red" }}
                              />
                            )}
                          </Box>
                        ))}
                      </Flex>
                    )}
                  </Flex>

                </Flex>
              )}

          </Flex>
        
      </Flex>



      {/* ////////////////////Chat Interface Area => Toggle Buttons//////////////////// */}
      <Flex
        as="section" borderRadius={16} mt={3} display="flex" flexDir="column" w="82%" h="97vh" bg="#5d2991" position="relative">

        <Flex
          w="100%" h="10%">
          {/* //////////////////////Model Toggle Button////////////////////////// */}
          <Flex
            h="100%" w="12%" mb={5} mt={5} ml={20} display="inline-block" position="relative" >
            
            <Button
              h="50%" w="100%" bg="#3c096c" border="1px solid #e9ecef" color="#e9ecef" borderRadius={8}
              onClick={toggleDropdown}
              _hover={{ bg: "#8C2EBA" }}
            >
              Instructions
            </Button>

            {isOpen && (
              <Flex
                mt={3}
                bg="#45216d"
                h="280px"
                w="405px"
                borderRadius={8}
                border="1px solid #e9ecef"
                display="flex"
                flexDir="column"
              >
                <Flex
                  w="100%"
                  h="50%"
                  bg="#3c096c"
                  display="flex"
                  flexDir="row"
                  borderTopRadius={10}
                  borderBottom="1px solid #e9ecef"
                  alignItems="center"
                  _hover={{ bg: "#8C2EBA" }}
                >
                  <Icon
                    fontSize={25} mt="-30px" pr={2} w="10%" color="#e9ecef" as={HiLightningBolt}
                  />
                  <Flex
                    w="90%" display="flex" flexDir="column" textAlign="left"
                  >
                    <Heading
                      color="#e9ecef" fontSize="large"  fontFamily="monospace" letterSpacing="tight"  pb={1}>
                      Chatbot
                    </Heading>
                    <Text fontSize="small" color="#CCC6CF" wordBreak="break-word">
                      Write queries in this format: <br/>
                      Question - SkinTone - Gender - StylePreference"Optional".<br/>
                      Suggest tops for my video call tomorrow.Tan Female. Polished and Refined colors
                    </Text>
                  </Flex>
                </Flex>

                <Flex
                  w="100%" h="50%"
                  bg="#3c096c" display="flex" flexDir="row" borderBottomRadius={10} borderTop="1px solid #e9ecef"
                  alignItems="center"
                  _hover={{ bg: "#8C2EBA" }}
                >
                  <Icon
                    fontSize={25} pr={2} w="10%" color="#e9ecef" as={BsStars}
                  />
                  <Flex
                    w="90%" display="flex" flexDir="column" textAlign="left">
                    <Heading
                      color="#e9ecef" fontSize="large" fontFamily="monospace" letterSpacing="tight" pb={1}>
                      Virtual Mannequin
                    </Heading>
                    <Text fontSize="small" color="#CCC6CF">
                      Write Queries in this format: <br/>
                      Full body portrait - SkinTone - Gender - Clothes <br/>
                      Full body portrait of a Brown Male in gray kurta. 
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            )}
          </Flex>

        </Flex>

        {/* ///////////////ChatArea/////////////////////// */}

        <section className={styles.chatbox}>
          <div className={styles.chatlog}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.role === "user" ? styles.chatmsg : styles.chatmsgbot
                }
              >
                <div className={styles.chatmsgcenter}>
                  <div
                    className={
                      msg.role === "user" ? styles.avatar : styles.avatarbot
                    }
                  ></div>
                  <div className={styles.message}>{msg.content}</div>
                </div>
              </div>
            ))}
            {/* Debugging output
            {messages.length === 0 && <p>No messages to display</p>} */}
          </div>
        </section>
        
        <div className={styles.chatinputholder}>
          <textarea
            className={styles.chatinputtextarea}
            placeholder="Type Your message here"
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (e.target.value.trim() !== "") {
                  handleSendMessage(e.target.value);
                  e.target.value = "";
                }
              }
            }}
          />
        </div>
      </Flex>
    </Flex>
  );
}