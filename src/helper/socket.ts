import io from 'socket.io-client'
export const LocationsSocketclient = io(`${process.env.BACKEND_URL}/locations`, { transports : ['websocket'] })
export const BookingSocketclient = io(`${process.env.BACKEND_URL}/booking`, { transports : ['websocket'] })
export const ChatSocketclient =  io(`${process.env.BACKEND_URL}/chat`, { transports : ['websocket'] })