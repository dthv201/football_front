import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/page_tamplate/Layout";
// import { addParticipant, removeParticipant, splitParticipantsIntoTeams } from "../services/postService";
import { addParticipant, getPost, removeParticipant } from "../services/postService";
import { Post } from "../types/Post";
import { User } from "../types/User";
import { axiosInstance } from "../services/api-client";
import { useUserContext } from "../contexts/UserContext";
import { Box, Typography, Button, Grid, Paper, Divider, List, ListItem, ListItemText } from "@mui/material";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { getParticipants } from "../services/auth";

const GameInfoPage: React.FC = () => {
    const { user } = useUserContext();
    const { postId } = useParams<{ postId: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [participants, setParticipants] = useState<User[]>([]);
    // const [teamsGenerated, setTeamsGenerated] = useState(false);
    // const [teamA, setTeamA] = useState<string[]>([]);
    // const [teamB, setTeamB] = useState<string[]>([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                if(postId) {
                const post = await getPost(postId);
                setPost(post);
                
                if (post?.participantsIds?.length) {
                    const participants = await getParticipants(post.participantsIds);
                    setParticipants(participants);
                }
            }
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };
        fetchPost();
    }, [postId]);

    const handleJoinGame = async () => {
        try {
            await addParticipant(postId!, user!._id);
            const response = await axiosInstance.get<Post>(`/posts/${postId}`);
            setPost(response.data);
        } catch (error) {
            console.error("Error joining game:", error);
        }
    };

    const handleLeaveGame = async () => {
        try {
            await removeParticipant(postId!, user!._id);
            const response = await axiosInstance.get<Post>(`/posts/${postId}`);
            setPost(response.data);
        } catch (error) {
            console.error("Error leaving game:", error);
        }
    };

    // const handleGenerateTeams = async () => {
    //     if (teamsGenerated) return;
        
    //     try {
    //         const { GenerateTeamsResponse } = await splitParticipantsIntoTeams(postId!);
    //         setTeamA(teamA);
    //         setTeamB(teamB);
    //         setTeamsGenerated(true);
    //     } catch (error) {
    //         console.error("Error generating teams:", error);
    //     }
    // };

    if (!post) return <Layout title="Game Details">Loading...</Layout>;

    return (
        <Layout title="Game Details">
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {post.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            📍 {post.location}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mt={1}>
                            📅 {new Date(post.date).toLocaleString()}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body2">{post.content}</Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
                        <Typography variant="h6" fontWeight="bold">Participants:</Typography>
                        <List>
                            {participants?.map((participant) => (
                                <ListItem key={participant._id}>
                                    <ListItemText primary={`${participant.username} - ${participant.skillLevel}`} />
                                </ListItem>
                            ))}
                        </List>
                        
                        {/* {teamsGenerated && (
                            <>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="h6" fontWeight="bold" color="primary">
                                    Team A ⚽
                                </Typography>
                                <List>
                                    {teamA.map((player) => (
                                        <ListItem key={player}>
                                            <ListItemText primary={player} />
                                        </ListItem>
                                    ))}
                                </List>
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="h6" fontWeight="bold" color="secondary">
                                    Team B ⚽
                                </Typography>
                                <List>
                                    {teamB.map((player) => (
                                        <ListItem key={player}>
                                            <ListItemText primary={player} />
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        )} */}
                    </Paper>
                </Grid>
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
                <Button variant="contained" color="primary" onClick={handleJoinGame} startIcon={<SportsSoccerIcon />}>
                    Join Game
                </Button>
                <Button variant="contained" color="error" onClick={handleLeaveGame}>
                    Leave Game
                </Button>
                {/* <Button 
                    variant="contained" 
                    color="success" 
                    onClick={handleGenerateTeams}
                    disabled={teamsGenerated}
                >
                    Generate Teams
                </Button> */}
            </Box>
        </Layout>
    );
};

export default GameInfoPage;
