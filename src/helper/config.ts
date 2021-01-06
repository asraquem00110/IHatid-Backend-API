export const server = {
    host: process.env.SERVER_HOST || 'localhost',
    port: process.env.PORT
}

export const db = {
    url: process.env.MONGODB_URL,
    mongodbURL: process.env.MONGODB_URL_CLOUD,
}


export const jwtconfig = {
    secret: process.env.SECRET_KEY,
    refreshsecret: process.env.REFRESH_SECRET_KEY,
}

export const twilioconfig = {
    sid: process.env.TWILIO_SID,
    token: process.env.TWILIO_TOKEN,
    mynumber: process.env.TWILIO_NUMBER
}