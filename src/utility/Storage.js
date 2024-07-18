export function persist(key = 'storage', data = {}) {
    localStorage.setItem(key, JSON.stringify(data))
}

export function read(key = 'storage') {
    return JSON.parse(localStorage.getItem(key));
}

export function clear() {
    localStorage.clear()
}

export function remove(key = 'storage') {
    localStorage.removeItem(key)
}