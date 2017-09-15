import WebSocketAsPromised from 'websocket-as-promised';
import config from './config';

const WS_URL = 'ws://{tvIP}/api/v2/channels/{channelName}';

export default class TVConnection {
  constructor() {
    const url = WS_URL.replace('{tvIP}', config.tvIP).replace('{channel}', config.channelName);
    this._wsp = new WebSocketAsPromised(url);
  }
  open() {
    return this._wsp.open();
  }
  sendMessage(data) {
      this._wsp.send(JSON.stringify(data));
  }
}