module.exports = function convertType(type){
    if (type.match(/\[(.+)\]/)){
        return [convertType(type.match(/\[(.+)\]/)[1])];
    }
    switch (type) {
        case "String":
            return "String";
        case "Integer":
            return "Number";
        case "Date":
            return "Date";
        case "Boolean":
            return "Boolean";
        case "ObjectId":
            return "ObjectId";
        case "Array":
            return [];
        case "[]":
            return [];
        case "Object":
            return "Object";
        case "Double":
            return "Double";
        case "Mixed":
            return "Mixed";
        default:
            return type;
    }
}