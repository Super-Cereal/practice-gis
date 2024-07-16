import { domain } from './constants';

export function get<T>(path: string): Promise<T> {
    return fetch(`${domain}${path}`, {
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    });
}
