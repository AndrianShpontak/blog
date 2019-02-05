const MessageRoomHandler = require('../handlers/messageRoom');
const express = require('express');
const router = express.Router();
const messageRoomHandler = new MessageRoomHandler();

router.post('/createRoom', messageRoomHandler.createOrGetChatRoom);
router.post('/readMessage', messageRoomHandler.readMessage);
router.post('/', messageRoomHandler.crea0000teMessage);

module.exports = router;
