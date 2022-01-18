const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
global.socketIo = require('socket.io')(http, {
    upgradeTimeout: 30000
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req,res) => {
    res.sendFile('C:/Users/Andre/Desktop/API Restaurante/index.html')
})

require('./src/schemas/order/service/orderService')(app); //order
require('./src/schemas/payment/service/paymentService')(app); //payment
require('./src/schemas/supplies/service/supplieService')(app); //supplie
require('./src/schemas/user/service/userService')(app); //User
require('./src/schemas/product/service/productService')(app); // Product

socketIo.on('connection', (socket) =>{
    console.log(socket.id)
    socket.on('Pedido Pago', (data) =>{
        socketIo.emit('Visitar Mesa', data)
    })
})


http.listen( 3000, '192.168.1.112', ()=>{
});