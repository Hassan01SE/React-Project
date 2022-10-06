const app = require('express')();

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    },
})



io.on("connection", (socket) => {
    console.log("products updated ");


    socket.on("send", (payload) => {
        console.log("payload is ", payload);
        io.emit("products", payload)
    })

})



app.get('/', (req, res) => {
    res.send('hello world')
})


server.listen(5000, () => {
    console.log("Server is listening at port 5000")
})
