export const saveLocalStorageSimulator = (item) => {
    window.localStorage.setItem("token_sim", item)
    return true
}

export const getLocalStorageSimulator = () => {
    const token = window.localStorage.getItem("token_sim")
    return token
}

export const deleteLocalStorageSimulator = () => {
    const token = window.localStorage.removeItem("token_sim")
    return true
}