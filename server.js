const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // 'public'フォルダ内の静的ファイルを提供

io.on('connection', (socket) => {
    console.log('ユーザーが接続しました');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // 受信したメッセージを全クライアントに送信
    });
    socket.on('disconnect', () => {
        console.log('ユーザーが切断されました');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`サーバーがポート${PORT}で実行中`);
});
