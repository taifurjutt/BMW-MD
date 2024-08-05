const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0Q5M1ZjQTk0T0FwRm95aXZ0Y3V6c2k0K2FGNWdWa2pxNC9OZGtXaUtIWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibjIrM3VjUjIwM1g4anNBclh2aFhFNFdsTmNObG5OZEF0bWhjT2l0TTJBUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5QXhvMjhwQkxaUlYwUmp2RDEveHl1QzBmQ3NjWGs0ck5zMHNtTFc2U0VVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNK2Y3MmZDalFUVHBlVGFlYlg1bHhpQjBCczVvZXNPRGVqRWdRK3R1RG5ZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVPTTZrQWhlY0NNSG5zNi9xcTYyd0l1VkV4T3ZLOXpESGNNTjUvbnNFSGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5NbWNmSEhzN1VYVTlwZGM5MDBOVytMS080d3c2TGxSZUhGalhNcFRsMU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU54RUtyOFVxclhLMFFraURUM3B0QW53NGFJdU9tMkVhM3NXTnF5RTVIQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTTVTb29EQ25RNUMxSjVTY2ZVVG5RYkplUVl2MlJZNGVWeUR4V3dWWlRFQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilp5Nzd3U2szN25aZVhWd0NuQkNla0dQazd3MDlwamRHeFRNUmJRWFRNM1U1VGlsRi9NUWVZcjNYUVJmM1dXZXlWMEUydm5WQTRsWHZjZU9JOTZYK0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg0LCJhZHZTZWNyZXRLZXkiOiJVVVc0bTVKbjVPZlVtQVNzZUZySTNVQzFKUEVpSzRnK0NQRlArU3pZYnlRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI0a0hzWXJBUFRnQ1NySUU5c0NfV01nIiwicGhvbmVJZCI6ImEwODg1NTExLWFjYzgtNDQ5My04M2U4LTkyMDljZTYxNTk2NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQK0FsdjFraWd3YmJEdlFUWXMycVRLMjBrblU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibnYyWHVhYTRFWXhuNVg5b1pneUFFTzh6aStFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkNSM1I2VDlBIiwibWUiOnsiaWQiOiIyMTI2MTI0MzU5NzI6MjRAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8JOGqfCdkIvwnZCU8J2QgvCdkIjwnZCF8J2QhPCdkJHwk4aqXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cbi4ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01TUTFPQUJFUFdIeGJVR0dBZ2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImFZd2dSU3Q1K00rNlMrUHMxbXhldFpPVEd1aEp3WnVUN25pYUM2RnB6ekk9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlMxbk1FMC9CWmgwVUo4cUR0WlZjNmJnQ3luZ3c2amVOWXhTOFo0MUdOMyt5VGVhT1d2VDJ1Y285UkJiMVZ4aGd2TGxZNS9UN21PbGNvSTFnNTAwd0JnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJtcGxZYS9TR3E3elc3N1B3c0pYTVVlMjNxVThxLzFGR1QxSmZPVVJjOWJEcUIyOWlPbkh2UnYwdENNLys5NjZiSlROcjBxbjVuQU8zeHBXbE9lRG1EQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIxMjYxMjQzNTk3MjoyNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXbU1JRVVyZWZqUHVrdmo3TlpzWHJXVGt4cm9TY0diays1NG1ndWhhYzh5In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyODkzMzE0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9pQSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝐓𝐀𝐈𝐅𝐔𝐑",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "4593707292",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '🇵🇰⃢⃟👿𓆩𝐋𝐔𝐂𝐈𝐅𝐄𝐑𓆪 🇹🇷⃢⃟🖤',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/90e4df856b5d457e9700c.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
