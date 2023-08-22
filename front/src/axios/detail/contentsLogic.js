import axios from "axios";

export const insertMovieComment = async (commentData) => {
  console.log(commentData);
  try {
    const res = await axios.post(
      "http://localhost:8000/contents/movieDetail/insertMovieComment",
      data
    );
    return res.data;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};

export const updateMovieComment = async (commentData) => {
  console.log(commentData);
  try {
    const res = await axios.post(
      "http://localhost:8000/contents/movieDetail/updateMovieComment",
      data
    );
    return res.data;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};

export const deleteMovieComment = async (commentData) => {
  console.log(commentData);
  try {
    const res = await axios.post(
      "http://localhost:8000/contents/movieDetail/deleteMovieComment",
      data
    );
    return res.data;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};

export const getMovieComment = async (movieId, movieSeq) => {
  try {
    const res = await axios.get(
      "http://localhost:8000/contents/movieDetail/getMovieComment",
      {
        params: {
          movieId: movieId,
          movieSeq: movieSeq,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};
