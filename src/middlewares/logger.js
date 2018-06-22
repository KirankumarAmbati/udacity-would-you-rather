export default (store) => (next) => (action) => {
    console.group(action.type)
        console.log('The action\n is: ', action)
        const result = next(action)
        console.log('The New State is: ', store.getState())
    console.groupEnd()

    return result
}