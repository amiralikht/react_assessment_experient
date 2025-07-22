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
    const la = (a.last || a.first).toLocaleLowerCase();
    const lb = (b.last || b.first).toLocaleLowerCase();
    if (la < lb) return -1;
    if (la > lb) return 1;
    const fa = a.first.toLocaleLowerCase();
    const fb = b.first.toLocaleLowerCase();
    if (fa < fb) return -1;
    if (fa > fb) return 1;
    const sa = (a.suffix || '').toLocaleLowerCase();
    const sb = (b.suffix || '').toLocaleLowerCase();
    if (sa < sb) return -1;
    if (sa > sb) return 1;
    const ta = (a.title || '').toLocaleLowerCase();
    const tb = (b.title || '').toLocaleLowerCase();
    if (ta < tb) return -1;
    if (ta > tb) return 1;
    return 0;
}