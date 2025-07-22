import type { ParsedName } from "../types";

const TITLES = [
    'mr', 'mrs', 'ms', 'miss', 'dr', 'prof', 'prof.', 'sir', 'madam'
];

const SUFFIXES = [
    'jr', 'sr', 'ii', 'iii', 'iv', 'v', 'phd', 'md'
];

function Normalize(name: string): string {
    return name.replace(/[.]/g, '').toLowerCase();
}

export function parseName(name: string): ParsedName {
    const originalName = name.trim();
    if (!originalName) {
        return { originalName: name, first: name, last: '' };
    }

    const tokens = originalName.split(/\s+/);
    if (tokens.length === 1) {
        return { originalName, first: tokens[0], last: '' };
    }

    let start = 0;
    let end = tokens.length - 1;
    let title: string | undefined;
    let suffix: string | undefined;

    const firstNormal = Normalize(tokens[start]);
    if (TITLES.includes(firstNormal)) {
        title = tokens[start];
        start += 1;
    }

    const lastNormal = Normalize(tokens[end]);
    if (SUFFIXES.includes(lastNormal)) {
        suffix = tokens[end];
        end -= 1;
    }

    if (start > end) {
        return { originalName, first: originalName, last: '' };
    }

    const first = tokens[start];
    const lastTokens = tokens.slice(start + 1, end + 1);
    const last = lastTokens.join(' ');

    return { originalName, title, first, last, suffix };
}
export function formatParsedName(p: ParsedName): string {
    const lastPart = p.last ? p.last : p.first;
    const suffixPart = p.suffix ? ` ${p.suffix}` : '';
    const firstPart = p.first ? p.first : '';
    const titlePart = p.title ? ` (${p.title})` : '';
    return `${lastPart}${suffixPart}, ${firstPart}${titlePart}`.trim();
}

export function compareParsedNames(a: ParsedName, b: ParsedName): number {
    const last_a = (a.last || a.first).toLocaleLowerCase();
    const last_b = (b.last || b.first).toLocaleLowerCase();
    if (last_a < last_b) return -1;
    if (last_a > last_b) return 1;
    const first_a = a.first.toLocaleLowerCase();
    const first_b = b.first.toLocaleLowerCase();
    if (first_a < first_b) return -1;
    if (first_a > first_b) return 1;
    const suffix_a = (a.suffix || '').toLocaleLowerCase();
    const suffix_b = (b.suffix || '').toLocaleLowerCase();
    if (suffix_a < suffix_b) return -1;
    if (suffix_a > suffix_b) return 1;
    const title_a = (a.title || '').toLocaleLowerCase();
    const title_b = (b.title || '').toLocaleLowerCase();
    if (title_a < title_b) return -1;
    if (title_a > title_b) return 1;
    return 0;
}