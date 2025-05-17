const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0VXREhVSVNOcUhHK1V2Z0tvMVhnekpwZm1FUzNuTzlLd1VmUm8wZFVXWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZmNCeWxVYW0yZEdzelZ1Zm9OVll2WE9lY2hLN3BUZ294bnR1T1VDVHpsRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2RTdUYUpselZUSWk4TzAyT0hFS2hyN0kzQ0J4ZitQZUNSaU14YzkzWm5jPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ6dDdKSXFqSTJtSng3WkxEV1hJVUxOWS8wR1BVeXE4VW1tSDR3NHQwaFFBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBENHJwd1I2OEV0WnFEODlEWTI4UUtUK2szVitvZUg4Q3RZdmdwM1pnMlU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImgxUHEyUkpSb0lya1RDL2dzYmZhTWpuWG83WnljbzE2KzBwWDBYWUtNRHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOERwdThRenlnYXVNclYrQ3ExeWVaSlZiV1U2aTRLUzlCOGcxRnAzY3ZtTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSE1VVnpvYzdTQWx5N0pBUnU3MmxkUjVjamVUTVdyUmhRbTFXL2JudEltMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBDUFJmenlhaG9IbUZUMStZd0IxTk9ZTWErN3lCRGV3VCtjcUxaZFNrOVRaT0cwMnQzNXpBSEY4d2k2VWQxVkVCVndVcHZIMkxmN3crUlUzUmtaZUN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTEsImFkdlNlY3JldEtleSI6IlVHdDlFVGZEMlRZSURqdFRvanEweitXUDdJOGdjYXdzOWFqTFo0QVBtZ0E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjpmYWxzZSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09UTy9SWVEyYXVod1FZWUdDQUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjdmODBUT0Vpcjl6cEFsekpYcDFSV2hNSjBKakF1K21CNTliWk1zcXUzaGs9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjlpVlBpS0NJaXVkZTlEdEtxMU5ib3JNWDBqZUlWdXd1Qi9HSnlvOThsdHBKQ1NUNlB3Qy9xaUxPNDhtM2VBM1phZ2ZoVXZFMXRkUGtraXlrRUQvQUJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ2b0h5aVBGRlZ4aUdzb0VRL3Z2MFc0TTRZWU9RZ1hTRTZGT0VCY1E0MC83ZHFnMnZDZkhPeFU1SU9KSlovakUxWnprV3Z3bEU4TGtKaWNvY242S0VEZz09In0sIm1lIjp7ImlkIjoiMjYzNzg5MDg1NTMzOjhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2Qt/CdkLjihJXwnZC18J2ZivCdkYwiLCJsaWQiOiIxMjM5MTgzOTY0ODU4ODI6OEBsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzg5MDg1NTMzOjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZTMvTkV6aElxL2M2UUpjeVY2ZFVWb1RDZENZd0x2cGdlZlcyVExLcnQ0WiJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3NDczODk1LCJsYXN0UHJvcEhhc2giOiIyUDFZaGYiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9xNiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "𝐷𝐸ℕ𝐵𝙊𝑌",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263789085533",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-VMD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
    AUTO_READ : process.env.AUTO_READ || 'no',
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

