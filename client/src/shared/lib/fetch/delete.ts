import { domain } from './constants';

export function del<T>(path: string): Promise<T> {
    return fetch(`${domain}${path}`, {
        method: 'DELETE',
    }).then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        if (response.status === 204) {
            return;
        }
        return response.json();
    });
}
