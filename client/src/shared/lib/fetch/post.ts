import { domain } from './constants';

interface ExtraSettings {
    domain?: string;
}

export function post<T, B>(path: string, body: B, settings?: ExtraSettings): Promise<T> {
    return fetch(`${settings?.domain ?? domain}${path}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    });
}
