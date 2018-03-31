//通过reducer建立
//根据老的状态和action生成新的state
const ADD_GUN = 'ADD_GUN';
const REMOVE_GUN = 'REMOVE_GUN';

const initState = 100;

export function counter(state = initState, action) {
    switch (action.type) {
        case ADD_GUN :
            return state + 1
        case REMOVE_GUN :
            return state - 1
        default:
            return state
    }
}

//action函数集合
export function addGUN() {
    return {type: ADD_GUN}
}

export function removeGUN() {
    return {type: REMOVE_GUN}
}

export function addGunAsync() {
    return dispatch => {
        setTimeout(() => {
            dispatch(addGUN())
        }, 3000)
    }
}
