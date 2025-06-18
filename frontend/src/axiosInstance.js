import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";

const axiosInstance = Axios.create();

// Config para instancia de axios en APP
setupCache(axiosInstance);

export default axiosInstance;
