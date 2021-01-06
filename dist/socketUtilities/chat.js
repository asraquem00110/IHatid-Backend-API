"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChat = exports.disconnectChat = exports.JoinChatRoom = void 0;
let ChatRoomsConnected = [];
exports.JoinChatRoom = (socketID, room) => {
    let index = ChatRoomsConnected.findIndex(chat => chat.socketID === socketID);
    if (index !== -1) {
        ChatRoomsConnected[index] = {
            socketID: socketID,
            room: room
        };
    }
    else {
        ChatRoomsConnected.push({
            socketID: socketID,
            room: room
        });
    }
};
exports.disconnectChat = (socketID) => {
    let index = ChatRoomsConnected.findIndex(chat => chat.socketID === socketID);
    if (index !== -1) {
        ChatRoomsConnected.splice(index, 1);
    }
};
exports.getChat = () => {
    return ChatRoomsConnected;
};
