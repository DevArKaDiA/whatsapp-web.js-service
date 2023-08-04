import { Client, LocalAuth } from "whatsapp-web.js";
import QRCode from "qrcode";
import express from "express";
import morgan from "morgan";
import { json } from "body-parser";

const restApp = express();
restApp.use(morgan('tiny'));
restApp.use(express.json());
restApp.use(express.static("public"));

const whatsappClient = new Client(
    {
        puppeteer: { headless: "new" }
    }
)

const eventsArray: string[] = [
    'auth_failure',
    'authenticated',
    'change_battery',
    'change_state',
    'disconnected',
    'group_join',
    'group_leave',
    'group_admin_changed',
    'group_update',
    'contact_changed',
    'media_uploaded',
    'message',
    'message_ack',
    'unread_count',
    'message_create',
    'message_revoke_everyone',
    'message_revoke_me',
    'message_reaction',
    'chat_removed',
    'chat_archived',
    'loading_screen',
    'qr',
    'call',
    'ready',
    'remote_session_saved'
];








class Hook {
    hookUUID: string;
    hookUrl: string;
    constructor({ hookUUID, hookUrl }: { hookUUID: string, hookUrl: string }) {
        this.hookUUID = hookUUID;
        this.hookUrl = hookUrl;
    }
}

class SingletonHookStore {
    private hooks: Hook[] = [];
    private static instance: SingletonHookStore;
    private constructor() { }
    public static getInstance(): SingletonHookStore {
        if (!SingletonHookStore.instance) {
            SingletonHookStore.instance = new SingletonHookStore();
        }
        return SingletonHookStore.instance;
    }
    public addHook(hook: Hook): void {
        this.hooks.push(hook);
    }
    public findHook(hookUUID: string): Hook | undefined {
        return this.hooks.find(hook => hook.hookUUID === hookUUID);
    }
    public getHooks(): Hook[] {
        return this.hooks;
    }

}


restApp.post('/hooks/sub', function (req, res) {
    const newHook: Hook = new Hook(req.body);
    if (SingletonHookStore.getInstance().findHook(newHook.hookUUID)) {
        res.status(400).send({
            message: "Hook already exists"
        });
        return;
    }
    SingletonHookStore.getInstance().addHook(newHook);
    res.send(newHook);
    return;
});


restApp.get('/hooks', function (req, res) {
    res.send([{
        hookUUID: "123456789",
        hookUrl: "https://webhook.site/123456789",
    },
    {
        hookUUID: "123456789",
        hookUrl: "https://webhook.site/123456789",
    },
    ]);
});

restApp.get('/hooks', function (req, res) {
    res.send([{
        hookUUID: "123456789",
        hookUrl: "https://webhook.site/123456789",
    },
    {
        hookUUID: "123456789",
        hookUrl: "https://webhook.site/123456789",
    },
    ]);
});

function InitializeWebServer(): void {
    restApp.listen(3000, function () {
        console.log('Listening on port 3000!');
    });
}

function InitializeWhatsappAgent(): void {
    whatsappClient.initialize();
    whatsappClient.on('qr', (qr) => {
        QRCode.toFile('public/qr.png', qr)
        console.info('QR Ready');
        InitializeWebServer();
    });
    whatsappClient.on('ready', () => {
        console.info('Client is ready!');
    });
    eventsArray.forEach(eventName => {
        whatsappClient.on(eventName, (event) => {
            console.log({eventName: eventName, event: event});
        });
    });
    console.log(whatsappClient.eventNames());

}



InitializeWhatsappAgent();

