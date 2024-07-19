export const isDataEmpty = (data) => {
    for (let key in data) {
        if (data[key].length === 0 || data[key] === "") {
            return true;
        }
    }
    return false;
};
