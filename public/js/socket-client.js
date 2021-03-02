
//Referencias Html
const lblOnLine  = document.querySelector('#lblOnLine');
const lblOffLine = document.querySelector('#lblOffLine');

const txtMensaje = document. querySelector('#txtMensaje');
const btnEnviar  = document. querySelector('#btnEnviar');

console.log('Holas pato cua')

const miSocketClient = io();

//Este listener me ayuda a saber cuando el cliente se conecta
//on para estar escuchado algún evento
//el connect es un evento predeterminado en socket.io
//se va a disparar cuando tengamos una conexion
miSocketClient.on('connect', () => {
    console.log('Conectadote al servidorzote');

    lblOffLine.style.display = 'none';
    lblOnLine.style.display = '';
});

//Para saber cuando se desconecta del servidor, el evento "disconnect"
miSocketClient.on('disconnect', () => {
    console.log('Desconectadote del servisorzote');

    lblOnLine.style.display = 'none';
    lblOffLine.style.display = '';
});

//Ahora escucharé le evento 'enviar-mensaje'
//() => es el callback que quiero ejecutar cuando se reciba ese mensaje
miSocketClient.on('enviar-mensaje', ( payload ) => {
    console.log('Ya lo escuché puto!!')
    console.log(payload);

})

//Voy a disparar este callback cada vez que se presione en él
btnEnviar.addEventListener( 'click', () => {
    const mensaje = txtMensaje.value;
    console.log(mensaje);

    const payload = {
        mensaje,
        id: '123ABC',
        fecha: new Date().getTime()
    }

    //Envío un mensaje al servidor
    //miSocketClient.emit('enviar-mensaje', mensaje);
    //miSocketClient.emit('enviar-mensaje', payload);

    //Puedo mandar un tercer argumento, lo pongo en el callback
    miSocketClient.emit('enviar-mensaje', payload, (id) => {
        console.log( 'Desde el puto server:', id );
    });

});