/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { Box, Input, Button, Textarea } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const FeedbackForm = ({ movieId }) => {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("got called");
      console.log("movieId", movieId);
      console.log(rating, review);

      const response = await axios.post(`/api/user/rating/${movieId}`, {
        rating,
        review,
      });
      if (response.data.success) {
        toast.success(response.data.msg || "Feedback submitted successfully!");
        setTimeout(() => {
          navigate("/"); // Redirect to home page
        }, 2000); // Refresh the page
      } else {
        toast.error(response.data.msg || "An error occurred.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <Box mt={5} p={5} rounded="md" shadow="md">
      <form onSubmit={handleSubmit}>
        <Input
          type="float"
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
    </Box>
  );
};

export default FeedbackForm;
