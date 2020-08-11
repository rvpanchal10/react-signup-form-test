export function clearLocalStorage() {
    localStorage.clear();
}

export function saveUserToLocalStorage(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return null;
}

export function saveTokenToLocalStorage(token) {
    localStorage.setItem('token', token);
}

export function getTokenFromLocalStorage() {
    return localStorage.getItem('token');
}

export default {
    saveUserToLocalStorage,
    getUserFromLocalStorage,
    saveTokenToLocalStorage,
    getTokenFromLocalStorage
}
  