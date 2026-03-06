import {escapeMarkdown} from "discord.js";

function sanitizeForDiscord(input: string): string {
    return escapeMarkdown(input)
        .replace(/@everyone/g, "@\u200beveryone")
        .replace(/@here/g, "@\u200bhere")
        .replace(/<@&?\d+>/g, "[mention]")
        .replace(/<#\d+>/g, "[channel]")
        .replace(/<a?:\w+:\d+>/g, "[emoji]");
}

export { sanitizeForDiscord };