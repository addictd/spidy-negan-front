import config from '../config';
import * as socketIo from 'socket.io-client';
import socketServicesListener from './components/socketEvents';

const options = {
    forceNew : true,
    transports: ['websocket']
}

const socket = socketIo(config.SERVER_URL + ":" + config.SERVER_PORT, options);
socketServicesListener(socket);

export default socket;