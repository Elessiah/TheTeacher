import 'dotenv/config';
import {
    Client,
    GatewayIntentBits, Guild, User,
} from "discord.js";
import {Env, getEnvInstance} from "@/env/env";
import {formatCorrection} from "@/corrections/formatCorrection";
import {correctMessage} from "@/corrections/correctMessage";
import {commands} from "@/config/commands";
import { updateCommands } from "./utils/updateCommands";

const client = new Client({
            intents: [
                GatewayIntentBits.Guilds, // Nécessaire pour recevoir les événements des serveurs (guilds)
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.DirectMessages, // Pour les DM
                GatewayIntentBits.GuildMessages, // Pour les messages
                GatewayIntentBits.MessageContent  // Pour accéder au contenu des messages
            ],
        });


client.on("clientReady", async () => {
    if (!process.env.OWNER_ID) {
        console.error("No env conf in the project. Stopping the bot.");
        process.exit(0);
    }
    // Init env
    const author: User = await client.users.fetch(process.env.OWNER_ID);
    const env: Env = await getEnvInstance(author);

    // Init command on servers
    for (const guild of client.guilds.cache.values()) {
        console.log("Server ready : ", guild.name);
        await updateCommands(guild.id);
    }

    await env.author.send({content: "# The Teacher is online !"});
});

client.on("guildCreate", async (guild: Guild) => {
    await updateCommands(guild.id);
    await (await getEnvInstance()).author.send({content: "The bot has join " + guild.name});
})

client.on("messageCreate", async message => {
    if (message.author.bot || message.author.system) return;
    if (message.content.startsWith("!") || message.content.startsWith("/") || message.content.includes("```")) return;
    const env: Env = await getEnvInstance();
    if (env.isInclude(message.author.id)) {
        const correction: string | null = await correctMessage(message.content);
        if (correction) {
            await message.author.send({content: formatCorrection(message.content, correction)});
        }
    }
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand() || !interaction) return;
    const commandName: string = interaction.commandName;
    const command = commands[commandName];
    await command.handler(client, interaction, interaction.guildId);
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