export const saveLocalStorageAICrop = (item) => {
    window.localStorage.setItem("token", item)
    return true
}

export const getLocalStorageAICrop = () => {
    const token = window.localStorage.getItem("token")
    return token
}

export const deleteLocalStorageAICrop = () => {
    const token = window.localStorage.removeItem("token")
    return true
}