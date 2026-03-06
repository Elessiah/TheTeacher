import {Client, REST, Routes} from "discord.js";
import {commands} from "@/config/commands";
import {getEnvInstance} from "@/env/env";

async function updateCommands(guildId: string): Promise<void> {
    if (!process.env.TOKEN) throw new Error("No TOKEN in .env");
    if (!process.env.CLIENT_ID) throw new Error("No CLIENT_ID in .env");
    const rest: REST = new REST({ version: "10" }).setToken(process.env.TOKEN);
    try {
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
            {
                body: Object.keys(commands).map((updatedCommandName) => {
                    return {
                        name: updatedCommandName,
                        ...commands[updatedCommandName].parameters,
                    };
                }),
            }
        );
    } catch (error) {
        await (await getEnvInstance()).author.send({content: "Failed to update Commands : " +(error as TypeError).message});
    }
}

export { updateCommands };