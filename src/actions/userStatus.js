export const CHANGE_USER_STATUS = 'CHANGE_USER_STATUS';

export const handleChangeUserStatus = (bool) => async dispatch => {
            dispatch({
                type: CHANGE_USER_STATUS,
                data: bool
            })
}