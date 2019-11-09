export const ls_get = (key) => {
    return localStorage.getItem(key)
}

export const ls_set = (key, value) => {
    return localStorage.setItem(key, value)
}
export const ls_remove = (key) => {
    return localStorage.removeItem(key)
}

export const ls_clear = () => {
    return localStorage.clear()
}