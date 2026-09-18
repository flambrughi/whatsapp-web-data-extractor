# whatsapp-web-data-extractor

# WhatsApp Web Group Extractor

A simple JavaScript script that extracts the participants of a WhatsApp group from the **WhatsApp Web** local database.

## Usage

1. Open [WhatsApp Web](https://web.whatsapp.com/) and log in.
2. Open the browser Developer Tools and go to the **Console**.
3. Copy and paste the contents of [`wa_chat_group_extractor.js`](./wa_chat_group_extractor.js).
4. Enter the beginning of the group name when prompted.

The script outputs each participant as:

```text
PHONE_NUMBER;PUSH_NAME
```

## How it works

The script reads WhatsApp Web's `model-storage` IndexedDB database and uses the following stores:

* `group-metadata` — finds the group
* `participant` — retrieves participants
* `contact` — resolves phone numbers and names

No external services or dependencies are required.

## Disclaimer

This script relies on WhatsApp Web's internal data structures, which may change at any time.

Use it responsibly and respect applicable privacy laws and WhatsApp's terms of service.

Not affiliated with or endorsed by WhatsApp or Meta.
