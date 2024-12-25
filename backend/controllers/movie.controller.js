import { connectDB } from "../config/db.js";

let connection;

export async function getTrendingMovie(req, res) {
  try {
    if (!connection) {
      connection = await connectDB();
    }

    const [movies] = await connection.query("SELECT * FROM movies");

    if (movies.length === 0) {
      return res.status(404).json({ success: false, msg: "No movies found" });
    }

    const randomMovie = movies[Math.floor(Math.random() * movies?.length)];
    // console.log(randomMovie);

    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

export async function getAllMovies(req, res) {
  try {
    if (!connection) {
      connection = await connectDB();
    }

    const [movies] = await connection.query("SELECT * FROM movies");

    if (movies.length === 0) {
      return res.status(404).json({ success: false, msg: "No movies found" });
    }

    res.status(200).json({ success: true, content: movies });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

export async function getMovieDetails(req, res) {
  const { id } = req.params;

  try {
    if (!connection) {
      connection = await connectDB();
    }

    const [movie] = await connection.query(
      "SELECT * FROM movies WHERE movie_id = ?",
      [id]
    );

    res.status(200).json({ success: true, content: movie[0] });
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).send("Server Error");
  }
}
