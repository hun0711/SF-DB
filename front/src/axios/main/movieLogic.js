import axios from "axios";

export const top20sfmoviesDB = async () => {
  try {
    const res = await axios.get(`http://localhost:8000/movie/top20SfMovie`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const recommendMoviesDB = async () => {
  try {
    const res = await axios.get(`http://localhost:8000/movie/recommendMovie`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const todayBoxofficeDB = async () => {
  try {
    const res = await axios.get(
      `http://localhost:8000/movie/todayBoxofficeRank`
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const ottExistanceDB = async (movieSeq) => {
  try {
    const res = await axios.get(`http://localhost:8000/movie/ottExistance`, {
      params: {
        movieSeq: movieSeq,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateBoxofficeDB = async () => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/movies/updateBoxoffice`
    );
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const movieDetailDB = async (movieId, movieSeq) => {
  try {
    const res = await axios.get(`http://localhost:8000/movie/movieDetail`, {
      params: {
        movieId: movieId,
        movieSeq: movieSeq,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
