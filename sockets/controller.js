const { Socket } = require("socket.io");

const socketController = (socket) => {

    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    })

    //Voy a escuchar cuando el cliente me mande el mensaje
    //y luego vien un callback, este callback es lo que voy a hacer
    //cuando el cliente me mande el mensaje
    //el payload es el mensaje que me manda el cliente
    //Es recomendable que el payload sean objetos literales o primitivos
    //el callback es la referencia de lo que tenemos en el cliente (creo)
    socket.on('enviar-mensaje', (payload, callback) => {
        //console.log('enviar-mensaje, recibido:', payload);
        
        const id = 12345678;
        callback({ id, fecha: new Date().getTime() });
    
        //Envío mensajes a todos lo clientes
        //lo que recibo, lo envío
        //para enviarle el mensaje a todos, es el broadcast
        socket.broadcast.emit('enviar-mensaje', payload );

    

    })
}


module.exports = {
    socketController
}