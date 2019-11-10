
const socketEventListeners = (socket) => {

    socket.on('responseEvent' , data => {
        console.log('response from event1: ', data);
    });

}

export default socketEventListeners;