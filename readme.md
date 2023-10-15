# Api Rest - WebHook Whatsappweb.js ![image](https://github.com/DevArKaDiA/whatsapp-web.js-service/assets/15362561/6cf25cc7-6d9a-472e-b840-b064fbc3f135) - Service Image

---

Docker Hub: [arkadia0315/whatsappweb-js-service](https://hub.docker.com/r/arkadia0315/whatsappweb-js-service)

The aim of this repo is make a lenguaje agnostic interface for whatsappwebjs library using a webhook event system and a rest Api to interact with the library using any programing lenguaje.

## Quick Start!!!

### Docker

`docker run -d -p 3000:3000 arkadia0315/whatsappweb-js-service`

#### Hook Sub Request: `POST:localhost:3000/hooks/sub`

### Payload:

```json
{
  "hookUrl": "www.localhost:4444",
  "events": ["authenticated"]
}
```

With this endpoint you can subscribe any event supported by whatsappwebjs library, and the service will call the hookUrl with the event payload.

#### Send Msg Request: `POST:localhost:3000/msg/send`

### Payload:

```json
{
  "msg": "test2",
  "phone": "+57311111111"
}
```

With this endpoint you can send a raw string msg to any phone number. By the way this endpoit only support raw string msg, but in the future will support multimedia msg.

#### Whatsappweb.js Api Docs: [https://docs.wwebjs.dev/](https://docs.wwebjs.dev/)

#### Events Supported: [https://docs.wwebjs.dev/global.html](https://docs.wwebjs.dev/global.html)

### RoadMap:

- [x] (NO AUTH) Hook System
- [x] SUB - UNSUB - Hook peer events System
- [x] Hook Endpoint calling per Event subcribed
- [x] Docker Support
- [x] Send Msg Endpoints (Raw String MSG)
- [ ] Add Multimedia support for Msg endpoint
- [ ] List Chats Endpoints
- [ ] Get Chat Msgs Endpoints

---

Credits: @pedroslopez - Creator of whatsapp-web.js
Official Repo [https://github.com/pedroslopez/whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
