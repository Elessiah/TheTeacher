import {LTMatch} from "@/types";

function applySafeCorrections(text: string, matches: LTMatch[]): string {
    const allowedCategories = new Set(["TYPOS", "GRAMMAR", "CASING", "MISC"]);

    const filtered = matches
        .filter((m) => {
            const replacements = m.replacements ?? [];
            const categoryId = m.rule?.category?.id ?? "";

            return (
                replacements.length === 1 &&
                !!replacements[0]?.value &&
                allowedCategories.has(categoryId) &&
                m.length <= 20
            );
        })
        .sort((a, b) => b.offset - a.offset);

    let out = text;

    for (const m of filtered) {
        const replacement = m.replacements![0].value;
        out = out.slice(0, m.offset) + replacement + out.slice(m.offset + m.length);
    }

    return out;
}

export {applySafeCorrections}