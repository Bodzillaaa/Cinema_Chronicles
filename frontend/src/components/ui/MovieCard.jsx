/* eslint-disable react/prop-types */
import { Button, Card, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "@/components/ui/color-mode";
import axios from "axios";
import toast from "react-hot-toast";

const MovieCard = ({ movie }) => {
  const buttonBg = useColorModeValue("black", "white");
  const buttonColor = useColorModeValue("black", "white");

  const addToWatchlist = async () => {
    try {
      const res = await axios.post(`/api/user/watchlist/${movie.movie_id}`);
      toast.success(res.data.message, "Movie added to watchlist.");
    } catch (error) {
      console.error("Error adding movie to watchlist", error);
      // alert("Failed to add movie to watchlist.");
      toast.error("Failed to add movie to watchlist.", error);
    }
  };

  return (
    <>
      <Card.Root overflow="hidden" shadow={"xl"}>
        <Image
          src={movie.posterUrl || "/download.jpg"}
          alt={`${movie.title} poster`}
        />
        <Card.Body gap="2">
          <Card.Title>{movie.title || "title"}</Card.Title>
          <Card.Description>
            {movie.description ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
          </Card.Description>
          <Text textStyle="xs" mt="2">
            Duration: {movie.duration}
          </Text>
          <Text textStyle="xs" mt="2">
            Rating: {movie.rating || "5.0"}
          </Text>
        </Card.Body>
        <Card.Footer gap="2">
          <Button
            color={buttonColor}
            variant="outline"
            onClick={addToWatchlist}
          >
            Add to watchlist
          </Button>
          <Link to={`api/movie/details/${movie.movie_id}`}>
            <Button bg={buttonBg}>Get Details</Button>
          </Link>
        </Card.Footer>
      </Card.Root>
    </>
  );
};

export default MovieCard;
