export const getTrimmedText = (text: string, trimmedAt: number) => {
    if (!text) {
        return ""
    }
    if (text.length > trimmedAt) {
        return text.slice(0, trimmedAt) + "..."
    }
    return text;
}