const utils = {};

utils.parseJSON = (string) => {
    try {
        return JSON.parse(string);
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

export default utils;