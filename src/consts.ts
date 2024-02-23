export const REFRESH_RATE = 33;

export const calculateDelayIndex = (delay: number | undefined): number  => {
    if (delay === undefined || delay <= 0) return 0;

    return Math.floor(delay / REFRESH_RATE);
}