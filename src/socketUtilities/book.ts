
interface IBookRoomsConnected {
    socketID: string,
    bookID: string,
    type: string,
    room: string,
}


let BookRoomsConnected: Array<IBookRoomsConnected> = []

export const joinBookingRoom = (socketID: string, room: string, bookID: string, type: string)=> {

    let index = BookRoomsConnected.findIndex(book=> book.socketID === socketID)
    if(index !== -1) {
        BookRoomsConnected[index] = {
            socketID: socketID,
            bookID: bookID,
            type: type,
            room: room
        }
    }else{
        BookRoomsConnected.push({
            socketID: socketID,
            bookID: bookID,
            type: type,
            room: room
        })
    }
}


export const leaveBookingRoom = (room: string) => {

    let newlist = BookRoomsConnected.filter(book=>book.room !== room)
    BookRoomsConnected = newlist
}

export const disconnectBooking = (socketID: string) => {
    let index = BookRoomsConnected.findIndex(book=> book.socketID === socketID)
    if(index !== -1){
        BookRoomsConnected.splice(index,1)
    }
}

export const getBookings = (): Array<IBookRoomsConnected> => {
    return BookRoomsConnected
}