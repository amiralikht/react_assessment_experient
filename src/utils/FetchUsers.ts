export async function FetchUsers(url: string, init?: RequestInit) {
    const resp = await fetch(url, init);
    if (!resp.ok) {
        throw new Error(`Request failed ${resp.status} ${resp.statusText}`);
    }
    const data = (await resp.json());
    return data;
}
