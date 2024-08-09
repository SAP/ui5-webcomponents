declare const StartsWithPerTerm: <T>(value: string, items: T[], propName: string) => T[];
declare const StartsWith: <T>(value: string, items: T[], propName: string) => T[];
declare const Contains: <T>(value: string, items: T[], propName: string) => T[];
declare const None: <T>(_: string, items: T[]) => T[];
export { StartsWithPerTerm, StartsWith, Contains, None, };
