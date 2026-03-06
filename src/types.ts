type LTMatch = {
    offset: number;
    length: number;
    replacements?: Array<{ value: string }>;
    rule?: {
        category?: {
            id?: string;
        };
    };
};

export {LTMatch};