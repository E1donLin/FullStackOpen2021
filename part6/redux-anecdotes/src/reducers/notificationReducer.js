const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'RESET_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
    })

    setTimeout(
      () =>
        dispatch({
          type: 'RESET_NOTIFICATION',
        }),
      time * 1000
    )
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION',
  }
}

export default notificationReducer
