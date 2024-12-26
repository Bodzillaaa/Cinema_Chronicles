import { connectDB } from "../config/db.js";

let connection;

export async function searchMovie(req, res) {
  const query = req.params.query;

  try {
    if (!connection) {
      connection = await connectDB();
    }

    const [result] = await connection.query(
      `SELECT * FROM movies WHERE title LIKE ?`,
      [`%${query}%`]
    );

    if (result.length === 0) {
      return res.status(404).send(null);
    }

    res.status(200).json({ success: true, content: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

export async function searchMovieByGenre(req, res) {
  const query = req.params.query;

  try {
    if (!connection) {
      connection = await connectDB();
    }

    const [result] = await connection.query(
      `SELECT m.*
        FROM movies m
        JOIN movie_genre mg ON m.movie_id = mg.movie_id
        JOIN genre g ON mg.genre_id = g.id
        WHERE g.name = ?`,
      [query]
    );

    if (result.length === 0) {
      return res.status(404).send(null);
    }

    res.status(200).json({ success: true, content: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

export async function getWatchlist(req, res) {
  try {
    if (!connection) {
      connection = await connectDB();
    }

    const [result] = await connection.query(
      `SELECT * FROM watchlist WHERE user_id = ?`,
      [req.user.users_id]
    );

    res.status(200).json({ success: true, content: result });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}

export async function deleteItemFromWatchlist(req, res) {
  const { id } = req.params;

  try {
    if (!connection) {
      connection = await connectDB();
    }

    const [result] = await connection.query(
      `DELETE FROM watchlist WHERE watchlist_id = ? AND user_id = ?`,
      [id, req.user.users_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send("Item not found");
    }

    res.status(200).json({ success: true, message: "Item removed" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
}
