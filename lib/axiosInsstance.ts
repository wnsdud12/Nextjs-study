import axios from "axios";

// Axios 인스턴스
const axiosInstance = axios.create({
  baseURL: "",
  withCredentials: true, // ✅ 쿠키 자동 포함
  headers: {
    "Content-Type": "application/json",
  },
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("originalRequest._retry: ", originalRequest._retry);
    
    // accessToken이 만료되어 401이 발생한 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refreshToken으로 accessToken 재발급 요청
        const res = await axiosInstance.post(
          "/api/auth/refresh",
          {
            refreshToken: localStorage.getItem("refreshToken"),
          },
        );
        console.log("res: ", res);
        
        // 재발급 성공 시 원래 요청 다시 시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // refreshToken도 만료되었을 경우 → 로그아웃
        localStorage.removeItem("refreshToken");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
