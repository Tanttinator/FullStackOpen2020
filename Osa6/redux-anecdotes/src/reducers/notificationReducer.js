var currentTimeout;

export const showNotification = (msg, time) => {
    return async dispatch => {
        if(currentTimeout !== null) {
            clearTimeout(currentTimeout)
        }
        dispatch({
            type: 'SHOW',
            msg
        })
        currentTimeout = setTimeout(() => {
            dispatch({ type: 'HIDE' })
            currentTimeout = null
        }, time)
    }
}

const reducer = (state = { shown: false, msg: "" }, action) => {
    switch(action.type) {
        case 'SHOW':
            return { shown: true, msg: action.msg }
        case 'HIDE':
            return { shown: false, msg: "" }
        default:
            return state
    }
}

export default reducer