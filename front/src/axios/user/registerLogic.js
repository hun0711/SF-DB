import axios from "axios";

//ID 중복체크 axios 로직
export const idCheckDB = (id) => {
  console.log(id);
  return new Promise((resolve,reject) => {
    try {
      const response = axios({
        method : "get", //조회이므로 GET방식
        url : "http://localhost:8000/register/idCheck",
        params : id,
      })
      resolve(response)
    } catch (error) {
      reject(error);
    }
  })
}

//회원가입 axios 로직
export const regInsertDB = (data) => {
  console.log(data);
  return new Promise((resolve,reject) => {
    try {
      const response = axios({
        method : "post", //@RequestBody
        url : "http://localhost:8000/register/userJoin",
        data : data,
      });
      resolve(response)
    } catch (error) {
      reject(error);
    }
  })
}