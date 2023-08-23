import axios from "axios";

export const insertMovieCommentDB = async (commentData) => {
  console.log(commentData);
  try {
    const res = await axios.post(
      "http://localhost:8000/contents/movieDetail/insertMovieComment",
      commentData
    );
    return res.data;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};

export const updateMovieCommentDB = async (commentData) => {
  console.log(commentData);
  try {
    const res = await axios.post(
      "http://localhost:8000/contents/movieDetail/updateMovieComment",
      commentData
    );
    return res.data;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};

export const deleteMovieCommentDB = async (commentData) => {
  console.log(commentData);
  try {
    const res = await axios.post(
      "http://localhost:8000/contents/movieDetail/deleteMovieComment",
      commentData
    );
    return res.data;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};

export const getMovieCommentDB = async (movieId, movieSeq) => {
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
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};
