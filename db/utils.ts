/**
 * Generate a PostgreSQL TSTZRANGE string using half-open interval [)
 * @param start - Start date (inclusive)
 * @param end - End date (exclusive)
 * @returns PostgreSQL-compatible TSTZRANGE string, e.g. "[2025-08-13T10:00:00.000Z,2025-08-13T11:00:00.000Z)"
 */
export function tstzrange(start: Date, end: Date): string {
  return `[${start.toISOString()},${end.toISOString()})`;
}

/**
 * Parse a PostgreSQL TSTZRANGE string into JavaScript Date objects
 * Only supports half-open interval [)
 * @param rangeStr - TSTZRANGE string, e.g. "[2025-08-13T10:00:00.000Z,2025-08-13T11:00:00.000Z)"
 * @returns An object containing start and end as Date objects
 * @throws Error if the input string does not match the expected [) format
 */
export function parseTstzrange(rangeStr: string): { start: Date; end: Date } {
  const regex = /^\[(.*?),(.*?)\)$/; // only [)
  const match = rangeStr.match(regex);
  if (!match) throw new Error('Invalid TSTZRANGE format');
  return {
    start: new Date(match[1]),
    end: new Date(match[2]),
  };
}
