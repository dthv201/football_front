import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/page_tamplate/Layout";
import { addParticipant, removeParticipant, splitParticipantsIntoTeams, getPost } from "../services/postService";
import { Post } from "../types/Post";
import { User } from "../types/User";
import { useUserContext } from "../contexts/UserContext";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  CircularProgress
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { getParticipants } from "../services/auth";

const GameInfoPage: React.FC = () => {
  const { user } = useUserContext();
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [participants, setParticipants] = useState<User[]>([]);
  const [teamsGenerated, setTeamsGenerated] = useState(false);
  const [teamA, setTeamA] = useState<User[]>([]);
  const [teamB, setTeamB] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPost = useCallback(async () => {
    setLoading(true);
    try {
      if (postId) {
        const post = await getPost(postId);
        setPost(post);

        if (post?.participantsIds?.length) {
          const participants = await getParticipants(post.participantsIds);
          setParticipants(participants);
          setTeamA(participants.filter(p => post.teamA?.includes(p._id)));
          setTeamB(participants.filter(p => post.teamB?.includes(p._id)));
        }
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  const handleJoinGame = useCallback(async () => {
    setLoading(true);
    try {
      await addParticipant(postId!, user!._id);
      await fetchPost();
      alert("Participant added successfully");
    } catch (error) {
      console.error("Error joining game:", error);
    } finally {
      setLoading(false);
    }
  }, [postId, user, fetchPost]);

  const handleLeaveGame = useCallback(async () => {
    setLoading(true);
    try {
      await removeParticipant(postId!, user!._id);
      await fetchPost();
      alert("Participant removed successfully");
    } catch (error) {
      console.error("Error leaving game:", error);
    } finally {
      setLoading(false);
    }
  }, [postId, user, fetchPost]);

  const handleGenerateTeams = useCallback(async () => {
    if (teamsGenerated) return;
    setLoading(true);
    try {
      const postWithSplitTeams = await splitParticipantsIntoTeams(postId!);
      setPost(postWithSplitTeams);
      if (postWithSplitTeams?.participantsIds?.length) {
        const participants = await getParticipants(postWithSplitTeams.participantsIds);
        setParticipants(participants);
        setTeamA(participants.filter(p => postWithSplitTeams.teamA?.includes(p._id)));
        setTeamB(participants.filter(p => postWithSplitTeams.teamB?.includes(p._id)));
      }
      setTeamsGenerated(true);
      alert("Teams generated successfully!");
    } catch (error) {
      console.error("Error generating teams:", error);
    } finally {
      setLoading(false);
    }
  }, [postId, teamsGenerated]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  // While any asynchronous function is in progress, show a spinner.
  if (loading) {
    return (
      <Layout title="Game Details">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <CircularProgress size={50} />
        </Box>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout title="Game Details">
        <Typography variant="h6" textAlign="center" mt={4}>
          No post found.
        </Typography>
      </Layout>
    );
  }

  return (
    <Layout title="Game Details">
      <Grid container spacing={2}>
        <Grid size={6}>
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
        <Grid size={2}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold">
              Participants:
            </Typography>
            <Divider sx={{ my: 1 }} />
            <List>
              {participants.map((participant) => (
                <ListItem key={participant._id}>
                  <ListItemText primary={participant.username} secondary={participant.skillLevel} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid size={2}>
          <Paper sx={{ p: 3, borderRadius: 1, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight="bold" color="primary">
              Team A ⚽
            </Typography>
            <Divider sx={{ my: 1 }} />
            <List>
              {teamA.map((player) => (
                <ListItem key={player._id}>
                  <ListItemText primary={player.username} secondary={player.skillLevel} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid size={2}>
          <Paper sx={{ p: 3, borderRadius: 1, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight="bold" color="secondary">
              Team B ⚽
            </Typography>
            <Divider sx={{ my: 1 }} />
            <List>
              {teamB.map((player) => (
                <ListItem key={player._id}>
                  <ListItemText primary={player.username} secondary={player.skillLevel} />
                </ListItem>
              ))}
            </List>
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
        <Button
          variant="contained"
          color="success"
          onClick={handleGenerateTeams}
          disabled={teamsGenerated}
        >
          Generate Teams
        </Button>
      </Box>
    </Layout>
  );
};

export default GameInfoPage;
