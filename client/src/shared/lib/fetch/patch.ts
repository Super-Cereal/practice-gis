import { domain } from './constants';

export function patch<T, B>(path: string, body: B): Promise<T> {
    return fetch(`${domain}${path}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    });
}
