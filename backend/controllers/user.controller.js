import { connectDB } from "../config/db.js";

let connection;

export async function postRating(req, res) {
  const movie_id = req.params.id;
  const { rating } = req.body;
  const user_id = req.user.users_id;
  console.log(user_id);

  try {
    if (!connection) {
      connection = await connectDB();
    }

    const [ratingExists] = await connection.query(
      "SELECT * FROM reviews WHERE movie_id = ? AND user_id = ?",
      [movie_id, user_id]
    );

    if (ratingExists.length > 0) {
      await connection.query(
        "UPDATE reviews SET rating = ? WHERE movie_id = ? AND user_id = ?",
        [rating, movie_id, user_id]
      );
    } else {
      await connection.query(
        "INSERT INTO reviews (movie_id, user_id, rating) VALUES (?, ?, ?)",
        [movie_id, user_id, rating]
      );
    }

    res.status(200).json({ success: true, msg: "Rating submitted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

export async function postReview(req, res) {
  const movie_id = req.params.id;
  const { review } = req.body;
  const user_id = req.user.users_id;

  try {
    if (!connection) {
      connection = await connectDB();
    }

    const [reviewExists] = await connection.query(
      "SELECT * FROM reviews WHERE movie_id = ? AND user_id = ?",
      [movie_id, user_id]
    );

    if (reviewExists.length > 0) {
      await connection.query(
        "UPDATE reviews SET review = ? WHERE movie_id = ? AND user_id = ?",
        [review, movie_id, user_id]
      );
    } else {
      await connection.query(
        "INSERT INTO reviews (movie_id, user_id, review) VALUES (?, ?, ?)",
        [movie_id, user_id, review]
      );
    }

    res.status(200).json({ success: true, msg: "Review submitted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}
