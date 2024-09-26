class Response {
  constructor(status, message = null, data = null) {
    this.status = status;
    if (message) {
      this.message = message;
    }
    if (data) {
      this.data = data;
    }
  }
}

export function response(status, message, data) {
  return new Response(status, message, data);
}
