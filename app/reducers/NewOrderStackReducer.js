const NewOrderStackReducer = (state, action) => {
    switch (action.type) {

        case 'TEST':
            console.log("TEST!!!! ", action.name)

            state.name = action.name

            return {
                ...state
            };
        case 'CHANGE_NAME_ORDER':
            console.log("holis")
            state.name = action.name
            return {
                ...state,
                //name : action.name
            };
        case 'PUSH_ARTICLE_TO_LIST':
            state.listArticle.push(action.value)

            return {
                ...state,     
            };
    }
}

export default NewOrderStackReducer