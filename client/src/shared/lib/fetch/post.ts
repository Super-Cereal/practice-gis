import { domain } from './constants';

export function post<T, B>(path: string, body: B): Promise<T> {
    return fetch(`${domain}${path}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 'content-type': 'application/json' },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    });
}
