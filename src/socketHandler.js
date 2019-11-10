import config from '../config';
import * as socketIo from 'socket.io-client';
import socketServicesListener from './components/services/socketServices-listen';

const socket = socketIo(config.SERVER_URL + ":" + config.SERVER_PORT);
socketServicesListener(socket);

export default socket;