module.exports = function convertType(type) {
    const arrayRegex = /Array<(.+)>/;
    const enumRegex = /Enum{(.+)}/;
    if (type.match(arrayRegex)) {
        return [[convertType(type.match(arrayRegex)[1])[0]], null];
    }
    if (type.match(enumRegex)) {
        return ["String", type.match(enumRegex)[1].split(",")];
    }
    if (type === "Integer") {
        return ["Number", null];
    }

    if (type === "Array") {
        return [[], null];
    }
    
    return [type, null];
}