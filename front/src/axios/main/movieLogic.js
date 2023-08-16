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
