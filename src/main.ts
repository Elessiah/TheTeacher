import 'dotenv/config';
import {
    Client,
    GatewayIntentBits,
} from "discord.js";

const client = new Client({
            intents: [
                GatewayIntentBits.Guilds, // Nécessaire pour recevoir les événements des serveurs (guilds)
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages, // Pour les messages
                GatewayIntentBits.MessageContent  // Pour accéder au contenu des messages
            ],
        });

client.on("messageCreate", async message => {

})

client.on("clientReady", async () => {
});

process.on('SIGINT', async () => {
    console.log('Arrêt du bot...');
    await client.destroy();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Arrêt du bot...');
    await client.destroy();
    process.exit(0);
});

client.login(process.env.TOKEN);