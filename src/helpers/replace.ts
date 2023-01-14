type Replace<T, R> = Omit<T, keyof R> & R;

export type { Replace };
