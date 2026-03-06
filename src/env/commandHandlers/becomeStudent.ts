import {ChatInputCommandInteraction, Client, MessageFlags} from "discord.js";
import {Env, getEnvInstance} from "@/env/env";

async function becomeStudent(client: Client,
                             interaction: ChatInputCommandInteraction): Promise<void> {
    const env: Env = await getEnvInstance();
    let msg: string = "";
    if (await env.addUser(interaction.user.id)) {
        msg = "You have been added successfully! I will send you the correction of your next messages !"
    } else {
        msg = "An error occured while I tried to added you. Please try again."
    }
    await interaction.reply(
        {
            content: msg,
            flags: MessageFlags.Ephemeral,
        });
}

export { becomeStudent };