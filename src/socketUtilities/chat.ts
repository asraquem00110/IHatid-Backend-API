interface IChatRoomsConnected {
    socketID: string,
    room: string,
}

let ChatRoomsConnected: Array<IChatRoomsConnected> = []

export const JoinChatRoom = (socketID: string, room: string)=>{
    let index = ChatRoomsConnected.findIndex(chat=> chat.socketID === socketID)
    if(index !== -1) {
        ChatRoomsConnected[index] = {
            socketID: socketID,
            room: room
        }
    }else{
        ChatRoomsConnected.push({
            socketID: socketID,
            room: room
        })
    }
}

export const disconnectChat = (socketID: string) => {
    let index = ChatRoomsConnected.findIndex(chat=> chat.socketID === socketID)
    if(index !== -1){
        ChatRoomsConnected.splice(index,1)
    }
}

export const getChat = (): Array<IChatRoomsConnected> => {
    return ChatRoomsConnected
}
