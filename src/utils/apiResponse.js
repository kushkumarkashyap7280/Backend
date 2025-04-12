class apiResponse {
  constructor(statusCode, data ,message) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400; // true for 2xx and false for 4xx/5xx
  };
};

export default apiResponse;