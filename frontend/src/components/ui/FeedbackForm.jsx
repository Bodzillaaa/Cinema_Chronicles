/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { Box, Input, Button, Textarea } from "@chakra-ui/react";

const FeedbackForm = ({ movieId }) => {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/movies/${movieId}/feedback`, {
        rating,
        review,
      });

      if (response.data.success) {
        setMessage("Feedback submitted successfully!");
      } else {
        setMessage(response.data.msg || "An error occurred.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage("Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <Box bg="gray.100" p={5} rounded="md" shadow="md">
      <form onSubmit={handleSubmit}>
        <Input
          type="number"
          placeholder="Rating (0-10)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="0"
          max="10"
          mb={3}
        />
        <Textarea
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          mb={3}
        />
        <Button colorScheme="blue" type="submit">
          Submit Feedback
        </Button>
      </form>
      {message && (
        <Box mt={3} color="green.500">
          {message}
        </Box>
      )}
    </Box>
  );
};

export default FeedbackForm;
