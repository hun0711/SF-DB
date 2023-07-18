import axios from "axios";

//회원가입 axios 로직
export const regInsertDB = (data) => {
  console.log(data);
  return new Promise((resolve,reject) => {
    try {
      const response = axios({
        method : "post", //@RequestBody
        url : "http://localhost:8000/user/regInsert",
        data : data,
      });
      resolve(response)
    } catch (error) {
      reject(error);
    }
  })
}