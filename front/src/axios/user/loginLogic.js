import axios from "axios";

export const userLoginDB = async (data) => {
  try {
    const res = await axios.post(`http://localhost:8000/user/login`, data);
    // 서버로부터 받은 응답 데이터를 반환합니다.
    return res.data;
  } catch (error) {
    // 요청이 실패했을 때 오류를 콘솔에 출력하고 오류 객체를 반환합니다.
    console.error("Error during idCheckDB request:", error);
    throw error; // 이 오류를 호출자에게 전달하여 처리하도록 합니다.
  }
};

export const googleSocialLogin = async (data) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/user/login/google",
      data
    );
    return res.data;
  } catch (error) {
    console.error("Error : ", error);
    throw error;
  }
};
