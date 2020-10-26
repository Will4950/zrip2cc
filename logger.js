const config = require('./config.js');
const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: config.log.dlevel,
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
            )
        }),
        new winston.transports.File({
            level: config.log.level,
            filename: config.log.filename,
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
            )
        })
    ]
});

logger.stream = {
    write: function(message, encoding){
        logger.info(message.trim());
    }
};

module.exports = logger;