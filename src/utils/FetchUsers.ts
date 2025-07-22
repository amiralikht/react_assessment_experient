export async function FetchUsers(url: string) {
    const resp = await fetch(url);
    if (!resp.ok) {
        throw new Error(`Request failed ${resp.status} ${resp.statusText}`);
    }
    const data = (await resp.json());
    return data;
}

