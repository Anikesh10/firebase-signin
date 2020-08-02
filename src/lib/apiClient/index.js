import axios from "axios";

//default timeout for API requests
axios.defaults.timeout = 300000;

/**  API Calling methods integrated with axios */

class apiClient {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_BASE_URL}`;
  }

  postData = async (url, body, log) => {
    try {
      const apiUrl = this.baseUrl + url;
      const response = await axios.post(apiUrl, body, headers);
      return response;
    } catch (error) {
      console.log("error ^^^^^^^", error);
      return handleReponseConvert({
        error,
      });
    }
  };

  getData = async (url, log) => {
    const apiUrl = this.baseUrl + url;
    try {
      const headers = this.setHeaders();

      const response = await axios.get(apiUrl, headers);
      return response;
    } catch (error) {
      console.log("error ^^^^^^^", error);
      return error;
    }
  };
}

export default new apiClient();
