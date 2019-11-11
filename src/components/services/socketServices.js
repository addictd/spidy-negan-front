import socket from '../../socketHandler';


export const sendevent1 = (data) => {
    console.log('1');
    return socket.emit("event1", data);
}



export const on = (data) => {
    console.log('1');
    return socket.emit("event1", data);
}
