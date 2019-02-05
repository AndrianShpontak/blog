const MessageRoomModel = require('../models/messageRoom');
const MessageModel = require('../models/message');

const MessageHandler = function () {

    this.createOrGetChatRoom = (req, res, next) => {
        console.log(req.body);
        const {
            body: {
              //  name,
                receiverId
            },
            session: {
                userId
            }

        } = req;
        MessageRoomModel.findOne({$and: [{users: userId}, {users: receiverId}]})
            .then((result) => {
                if (result) {
                    return MessageModel.find({roomId: result._id}).sort({createdAt: -1})
                        .then((messages) => {
                            return res.json({room: result, messages})

                        })
                }
                const messageRoom = new MessageRoomModel({ users: [receiverId, userId]});
                messageRoom.save()
                    .then(result => {
                        return res.json({room: result, messages: []})

                    })
            })
            .catch(err => next(err))

    };

    this.createMessage = (req, res, next) => {
        const {
            body: {
                body,
                roomId,
                receiverId
            },
            session:{
                userId
            }
        } = req;

        const message = new MessageModel({body, roomId, senderId:userId, receiverId});
        message
            .save()
            .then((result)=>{
                return res.json(result)
            })
            .catch(err => next(err))

    };

    this.readMessage = (req, res, next) => {
        const {
            body: {
                roomId
            },
            session:{
                userId
            }
        } = req;

        MessageModel.update({roomId, receiverId: userId}, {$set:{readAt: new Date()}}, {multi: true})
            .then((result) => {
                res.json({message: 'read successfully'})
            })
            .catch(err => next(err))

    }
};

module.exports = MessageHandler;
