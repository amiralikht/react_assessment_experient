export interface ApiAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
}

export interface ApiUser {
    id: number;
    name: string;
    address: ApiAddress;
}

export interface ParsedName {
    originalName: string;
    title?: string;
    first: string;
    last: string;
    suffix?: string;
}