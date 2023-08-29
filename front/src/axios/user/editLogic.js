import axios from "axios";

//이름 변경 로직
export const changeUserNameDB = async (requestData) => {
  console.log(requestData);
  try {
    const res = await axios.post(`http://localhost:8000/user/changeUserName`, requestData);
    return res.data;
  } catch (error) {
    console.error("Error during changeUserNameDB request:", error);
    throw error; 
  }
};

export const updateProfileImageDB = async(requestData) => {
  console.log(requestData);
  try {
    const res = await axios.post(`http://localhost:8000/user/updateProfileImage`, requestData);
    return res.data;
  } catch (error) {
    console.error("Error during updateProfileImageDB request:", error);
    throw error; 
  }
}