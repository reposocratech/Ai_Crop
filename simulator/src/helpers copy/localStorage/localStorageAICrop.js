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

export const saveLocalStorageAICropGreenhouse = (item) => {
    window.localStorage.setItem("greenhouse", item)
    return true
}

export const getLocalStorageAICropGreenhouse = () => {
    const token = window.localStorage.getItem("greenhouse")
    return token
}

export const deleteLocalStorageAICropGreenhouse = () => {
    const token = window.localStorage.removeItem("greenhouse")
    return true
}