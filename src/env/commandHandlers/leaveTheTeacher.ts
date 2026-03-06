import {ChatInputCommandInteraction, Client, MessageFlags} from "discord.js";
import {Env, getEnvInstance} from "@/env/env";

async function leaveTheTeacher(client: Client,
                               interaction: ChatInputCommandInteraction): Promise<void> {
    const env: Env = await getEnvInstance();
    let msg: string = "";
    if (await env.rmUser(interaction.user.id)) {
        msg = "You have been added successfully! The Teacher will send you the correction of your messages !"
    } else {
        msg = "Failed to remove you ! Were you sure to be a student ? Contact Elessiah if you have any problem !";
    }
    await interaction.reply(
        {
            content: msg,
            flags: MessageFlags.Ephemeral,
        });
}


export { leaveTheTeacher };