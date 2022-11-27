export const truncate = (s: string, n: number) => {
    if (s.length <= n) return s;

    return `${s.slice(0, n)} ...`;
}

export const shuffle = (a: Array<any>) => {
    let r: number;

    for (let i = a.length - 1; i > 0; --i) {
        r = Math.floor(Math.random() * (i + 1));
        [a[i], a[r]] = [a[r], a[i]];
    }

    return a;
}