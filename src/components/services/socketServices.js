import socket from '../../socketHandler';


// socket.on('dummycall', (data) => {
//     console.log('data: ', data);
// })

// socket.emit('receive', {
//     greeting: 'hell0'
// })

export const sendevent1 = (data) => {
    console.log('1');
    return socket.emit("event1", data);
}
