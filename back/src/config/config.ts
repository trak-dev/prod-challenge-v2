import dotenv from 'dotenv'
dotenv.config()
const config = {
    database : {
        user : process.env.DB_USER || '',
        host : process.env.DB_HOST || '',
        name : process.env.DB_NAME || '',
        password : process.env.DB_PASSWORD || '',
        port : parseInt( process.env.DB_PORT! ) || 5432,
    },
    port : parseInt( process.env.PORT! ) || 8080,
    jwtSecret : process.env.JWT_SECRET || '',
    mail : {
        host : process.env.MAIL_HOST || '',
        port : parseInt( process.env.MAIL_PORT! ) || 587,
        secure : process.env.MAIL_SECURE === 'true' ? true : false,
        user : process.env.MAIL_USER || '',
        password : process.env.MAIL_PASSWORD || '',
        from : process.env.MAIL_FROM || '',
    }
}

export default config;