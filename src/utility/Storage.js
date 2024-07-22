export function persist(key = '', data = {}) {
    localStorage.setItem(key, JSON.stringify(data))
}

export function read(key = '') {
    return JSON.parse(localStorage.getItem(key))
}

export function clear() {
    localStorage.clear()
}

export function remove(key = '') {
    localStorage.removeItem(key)
}

export function get() {
    return localStorage
}

export function set(storage) {
    Object.keys(storage).forEach(key => {
        let value = storage[key]
        localStorage.setItem(key, value)
    })
}