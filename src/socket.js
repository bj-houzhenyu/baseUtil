export default class Socket {
  client
  constructor() {
    this.client = new WebSocket();
  }
}
