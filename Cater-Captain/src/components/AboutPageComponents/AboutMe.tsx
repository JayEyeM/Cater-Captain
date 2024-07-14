import React from "react";
import { Box, Text, Image, Heading, Link } from "@chakra-ui/react";
import { useThemeColors } from "../UseThemeColors";

// Correct path to the image in the public directory
const CaterCaptainImg = "/OtherContent/A_somewhat_rough_looking_man_i (1).jpeg";
const MyImage = "/OtherContent/IMG_3640.jpg";
const SalmonFlowImage = "/OtherContent/salmonFlowFavicon.svg";

const AboutMe: React.FC = () => {
    const { backgroundColor, textColor, secondary, accent, primary } = useThemeColors();
    return (
        <Box
            bg={backgroundColor}
            color={textColor}
            w="80%"
            p={4}
            mt={6}
            mb={6}
            mx="auto"
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Heading as="h1" size="lg" textAlign="center" mb={4} color={textColor}>
                About Me:
            </Heading>
            <Box
                bg={backgroundColor}
                color={textColor}
                w="100%"
                p={4}
                mt={6}
                mb={6}
                mx="auto"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Image src={CaterCaptainImg} alt="CaterCaptainImg" w={{ base: "95%", md: "30%" }} boxShadow={" 0px 0px 10px 1.25px gray"} />
                <Text fontSize="2xl" mb={6} color={accent}>
                    Nope, not him... that is the Cater-Captain!
                </Text>
                <Text fontSize="2xl" mb={2} color={textColor}>
                    This is me...
                </Text>
                <Image src={MyImage} alt="MyImage" w={{ base: "95%", md: "30%" }} boxShadow={" 0px 0px 10px 1.25px gray"} />
                <Text fontSize="2xl" mb={2} color={textColor}>
                    Joshua Ivany.
                </Text>
                <Text fontSize="2xl" mb={2} color={textColor}>
                    The developer behind Cater-Captain.
                </Text>
            </Box>
            <Box
                bg={backgroundColor}
                color={textColor}
                w="100%"
                p={4}
                mt={6}
                mb={6}
                mx="auto"
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Text fontSize="xl" mb={2} color={textColor}>
                    I am a software developer in the making who enjoys being creative and bringing the pieces together to build something purposeful and with meaning.
                </Text>
                <Text fontSize="xl" mb={2} color={textColor}>
                    My background is in Marine Cooking. I have worked offshore and onshore in various roles. I also have a diploma in Supply Chain.
                </Text>
                <Text fontSize="xl" mb={2} color={textColor}>
                    When deciding what my project would be for module 2 of the Get Coding program, I wanted to bring my experience and knowledge to the table, and work on something relatable, and purposeful. It was a toss up between two ideas, but a catering management app was nagging at me. There is much that can be done with this project, but for the current stage it is at, I am pleased with the outcome, and I hope to continue working on it over time.
                </Text>
                <Box bg="#141220" mt={6} p={4} display="flex" justifyContent="center" alignItems="center">
                    <Text fontSize="xl" mb={2} color="#F5F5F5">
                        I would like to thank my mentor,  
                        <Text as="b" color={secondary}>
                            Eti-abasi Umobong.
                        </Text>{" "}
                        He provided me with guidance and motivation to get this project off the ground. I am grateful for his help in getting me over the initial learning curve of what a React project entails and how it all comes together. He helped me plan accordingly and stay on track to see this through to completion.
                    </Text>
                </Box>

                <Box outline="2px solid" outlineColor={primary} w={{ base: "95%", md: "80%" }} mt={6} p={4} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                    <Heading fontSize="2xl" mb={2} color={primary}>
                        How is Cater-Captain built?
                    </Heading>
                    <Text fontSize="xl" mb={2} color={textColor}>
                       This project was built with React, Vite, Chakra UI, and TypeScript. 
                    </Text>
                    <Text fontSize="xl" mb={2} color={textColor}>
                       I used DayJS to help
                        me with date formatting/filtering logic, and Beautiful DND for drag and drop functionality in
                        the Inventory page.
                    </Text>
                    <Text fontSize="xl" mb={2} color={textColor}>
                        Chakra UI was used to style the webpages and was the source for some of the button icons used throughout the project.
                        I also created the Event Images and Event Tool Kit Icons using Inkscape.
                    </Text>
                    <Text fontSize="xl" mb={2} color={textColor}>
                        For images such as the Cater-Captain image on this page, the Cater-Captain's Wife
                        on the 404 Not Found page, and the Sailor Waving Goodbye image on the Signed Out page, I used
                        perchance.org/ai-cartoon-generator.
                    </Text>

                    <Text fontSize="xl" mb={2} color={textColor}>
                       I edited the Homepage and Learn Page videos with clipchamp.com.
                       Music used for the videos were all found on pixabay.com.
                    </Text>

                </Box>

                
                <Text mt={6} color={accent}>
                    You can play my game from Module 1 of the Get Coding program here:
                </Text>
                <Box mt={6} display="flex" justifyContent="center" alignItems="center">
                    <Link href="https://jayeyem.github.io/Salmon-Flow-Game/" title="Joshua's Salmon Flow Game" target="_blank" rel="noopener noreferrer" color={secondary}>
                        <Box display="flex" alignItems="center">
                            <Image src={SalmonFlowImage} alt="SalmonFlowImage" maxW="100px" mx="auto" />
                            <Text ml={6} id="playGameButton">
                                Play Salmon Flow!
                            </Text>
                        </Box>
                    </Link>
                </Box>
                <Box mt={6} display="flex" flexDirection="column" alignItems="center" justifyContent="center" bg="#141220" p={4}>
                    <Text color="#F5F5F5" mt={6}>
                        If you would like to get in touch with me, please feel free to reach out through my LinkedIn:{" "}
                        <Box mt={2} display="flex" justifyContent="center">
                            <Link href="https://www.linkedin.com/in/joshuaivany/" title="Joshua's LinkedIn Profile" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="#0077B5" d="M20.94 0H3.06C1.37 0 0 1.37 0 3.06v17.88C0 22.63 1.37 24 3.06 24h17.88C22.63 24 24 22.63 24 20.94V3.06C24 1.37 22.63 0 20.94 0zM7.31 20.88H4.62V9.35h2.69v11.53zM5.96 7.93a1.91 1.91 0 1 1-.02-3.82 1.91 1.91 0 0 1 .02 3.82zM21.07 20.88h-2.69v-4.69c0-1.12-.02-2.55-1.56-2.55-1.56 0-1.8 1.22-1.8 2.48v4.76h-2.69V9.35h2.58v1.32h.04c.36-.68 1.24-1.4 2.55-1.4 2.73 0 3.24 1.8 3.24 4.14v4.49h-.01z"/>
                                </svg>
                            </Link>
                        </Box>
                    </Text>
                    <Text color="#F5F5F5" id="githubSpan" mt={6}>
                        You can view my GitHub profile and the repository for this project here:{" "}
                        <Box mt={2} display="flex" justifyContent="center">
                            <Link href="https://github.com/JayEyeM" title="Joshua's GitHub Profile" target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path fill="#FFFFFF" d="M12 0C5.372 0 0 5.373 0 12c0 5.302 3.438 9.801 8.205 11.385.6.111.82-.261.82-.58 0-.287-.01-1.045-.015-2.05-3.338.724-4.042-1.613-4.042-1.613-.547-1.384-1.336-1.754-1.336-1.754-1.093-.745.083-.729.083-.729 1.207.085 1.84 1.24 1.84 1.24 1.07 1.832 2.805 1.303 3.49.998.108-.777.418-1.305.762-1.605-2.665-.303-5.466-1.333-5.466-5.93 0-1.31.465-2.383 1.235-3.223-.124-.303-.537-1.523.117-3.176 0 0 1.007-.322 3.3 1.23.957-.266 1.982-.399 3-.405 1.016.006 2.041.139 2.998.405 2.29-1.552 3.296-1.23 3.296-1.23.656 1.653.242 2.873.118 3.176.772.84 1.234 1.912 1.234 3.223 0 4.609-2.804 5.624-5.476 5.922.43.371.814 1.102.814 2.219 0 1.604-.015 2.896-.015 3.289 0 .322.217.698.825.577C20.566 21.797 24 17.297 24 12c0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </Link>
                        </Box>
                    </Text>
                </Box>
            </Box>
        </Box>
    );
};

export default AboutMe;
