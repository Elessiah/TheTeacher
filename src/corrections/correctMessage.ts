import {LTMatch} from "@/types";
import {applySafeCorrections} from "@/corrections/applySafeCorrections";

async function correctMessage(message: string): Promise<string | null> {
    const body = new URLSearchParams();
    body.set("text", message);
    body.set("language", "en-US");

    const res = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
    });

    if (!res.ok) return null;

    const data = await res.json() as {matches?: LTMatch[]};

    if (data.matches) {
        return applySafeCorrections(message, data.matches);
    }
    return null;
}

export {correctMessage};
