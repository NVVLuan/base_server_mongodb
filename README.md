## config eslint
```
"rules": {
		"no-console": "error",
		"no-empty": "error",
		"no-multiple-empty-lines": "warn",
		"no-var": "error",
		"@typescript-eslint/no-var-requires": "error"

	}
```
## config prettier
```
{
  "arrowParens": "always",
  "bracketSameLine": false,
  "bracketSpacing": true,
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxSingleQuote": false,
  "proseWrap": "preserve",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true,
  "singleAttributePerLine": false,
  "singleQuote": true,
  "tabWidth": 4,
  "trailingComma": "es5",
  "useTabs": false,
  "vueIndentScriptAndStyle": false,
  "printWidth": 100,
  "parser":"typescript"
}
```
```

settings:{
      "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editorconfig.generateAuto": true
}

```

## config process handle server 
```
try {
        const server = http.createServer(app);
        return new Promise((resolve) => {
            app.listen(port, () => {
                // eslint-disable-next-line no-console
                console.log(`Example app listening at http://${host}:${port}/api/v1/app/`);
                LoggerInfo('server run');
                resolve(this);
            });
            process.on('SIGINT', () => {
                Logger.info('Shutting down server...');
                server.close(() => {
                    Logger.info('Server shut down.');
                    process.exit(0);
                });
            });

            process.on('SIGTERM', () => {
                Logger.info('Shutting down server...');
                server.close(() => {
                    Logger.info('Server shut down.');
                    process.exit(0);
                });
            });
        });
    } catch (err) {
        throw err;
    }

```
## server with node 18

## config mongodb
```
const {
    URLDATABASE,
    POST_DATABASE,
    USERNAME_POSTGRES,
    PASSWORD_POSTGRES,
    DATABASE_POSTGRES,
    HOST,
} = process.env;

// connect db with mongodb
export const connectMongoDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(URLDATABASE as string);
        if (conn.connection.readyState === 1) LoggerInfo('connect mongoDB success');
    } catch (err) {
        Logger.info('==================== connect mongodb  err====================');
    }
};
```

## using logger with winston
```
import winston from 'winston';
import path from 'path';

export const Logger = winston.createLogger({
    // format của log được kết hợp thông qua format.combine
    format: winston.format.combine(
        winston.format.splat(),
        // Định dạng time cho log
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        // thêm màu sắc
        winston.format.colorize(),
        // thiết lập định dạng của log
        winston.format.printf((log) => {
            // nếu log là error hiển thị stack trace còn không hiển thị message của log
            if (log.stack) return `[${log.timestamp}] [${log.level}]: ${log.stack}`;
            return `[${log.timestamp}] [${log.level}]: ${log.message}`;
        })
    ),
    transports: [
        // hiển thị log thông qua console
        new winston.transports.Console({
            level: 'info',
        }),
        // Thiết lập ghi các errors vào file
        new winston.transports.File({
            level: 'error',
            filename: path.join(__dirname + '/logs/', 'errors.log'),
        }),
        new winston.transports.File({
            level: 'info',
            filename: path.join(__dirname + '/logs/', 'errors.log'),
        }),
    ],
});

export const LoggerInfo = (message: string) => {
    const str = '===========================================================================';
    return Logger.info(str.slice(0, (str.length - message.length) / 2) + message + str.slice(0, (str.length - message.length) / 2));
};

export const LoggerError = (message: string) => {
    const str = '===========================================================================';
    return Logger.error(str.slice(0, (str.length - message.length) / 2) + message + str.slice(0, (str.length - message.length) / 2));
};
```

## using bull, worker send email
```
export const sendNewEmail = async (data: EmailDTO) => {
    return new Promise((resolve) => {
        try {
            // new queues
            const emailQueue = new Bull<EmailDTO>('email', {
                redis: URLREDIS,
                limiter: {
                    max: 1000,
                    duration: 3000,
                },
            });

            // hanlde process
            emailQueue.process(async (job: Job) => {
                await nodeMailer(job.data);
            });

            //add process into queues
            emailQueue.add(data);

            // hanlde queues
            emailQueue.on('completed', function (job: Job) {
                Logger.info('Completed: Job-' + job.id);
                resolve(true);
            });

            emailQueue.on('failed', async function (job: Job) {
                Logger.info('Failed: Job-' + job.id);
                resolve(false);
            });
        } catch (err: any) {
            Logger.info(err);
            resolve(false);
        }
    });
};

```

## test

```
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MockMongoose } from 'mock-mongoose';
const mockMongoose = new MockMongoose(mongoose);
dotenv.config();
const { URLDATABASE } = process.env;

describe('Test user service', () => {
    beforeAll(function (done) {
        mockMongoose.prepareStorage().then(function () {
            mongoose.connect(URLDATABASE as string, function (err) {
                done(err);
            });
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should data create user return not  null', async () => {
        const data = await userService.postUser('anhbaHieu', 'foo', 'foo@example.com');
        expect(data).not.toEqual(null);
    }, 70000);
})
```
