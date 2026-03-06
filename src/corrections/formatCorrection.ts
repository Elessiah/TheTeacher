import {sanitizeForDiscord} from "@/utils/sanitizeForDiscord";

function formatCorrection(original: string, corrected: string): string {
    const safeOriginal: string = sanitizeForDiscord(original).replace(/```/g, "'''");
    const safeCorrected: string = sanitizeForDiscord(corrected).replace(/```/g, "'''");

    return [
        "✍️ Correction proposée :",
        "",
        "**Original**",
        "```",
        safeOriginal,
        "```",
        "**Corrigé**",
        "```",
        safeCorrected,
        "```",
    ].join("\n");
}

export {formatCorrection};