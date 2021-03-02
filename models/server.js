const express = require('express');
const cors = require('cors');

const { socketController } = require('../sockets/controller');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Para elocket.io
        //el http ya viene en node, por eso no hay que importar nada
        //y le voy a mandar mi aplicación de express "app", la que está arribe
        //Esto es de la página de socket.io
        this.server = require('http').createServer(this.app);
        //Esto también, y le le voy a mandar mi server, el de arriba
        //io es toda la informacioón de mis sockets conectado
        //se puede utilizar io para mandar mensajes a todas las personas conectadas a mi backend
        //el server que debo levantar el de arriba, no el de express
        this.io = require('socket.io')(this.server);
        
        //Ponerlos en orden alfabético
        this.paths = {
            
        }

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();

        //sockets
        this.sockets();
    }

    middlewares() {

        //Cors
        this.app.use( cors() );

        //Directorio público
        this.app.use( express.static( 'public' ) );

    }

    routes() {
        //Haciendo la importación de los routes. Solo como referencia dejo esta, pero no la voy a ocupar
        //this.app.use(this.paths.auth, require('../routes/auth'));
    }

    sockets() {

        //Esto es un callback
        this.io.on('connection', socketController);
    }

    listen() {
        //Ahora, en lugar de app, voy a levantar a server de io
        //this.app.listen( this.port, () => {
        this.server.listen( this.port, () => {
            console.log( 'Servidor corriendo en puerto', this.port );
        });
    }
}

module.exports = Server;