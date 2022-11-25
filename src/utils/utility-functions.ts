export const truncate = (s: string) => {
    if (s.length <= 50) return s;

    return `${s.slice(0,50)} ...`;
}
