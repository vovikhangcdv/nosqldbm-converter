const convertType = require('./convertType.js');

module.exports = function convertElement(obj) {
    var schema = {};
    if (obj["fields"]) {
        obj["fields"].forEach(function (field) {
            var field_name = field["name"];
            var type = convertType(field["type"])[0];
            var enumData = convertType(field["type"])[1];
            if (field_name == "_id") { return; }
            schema[field_name] = {
                "type": type,
                "required": Boolean(field["required"]),
                "unique": Boolean(field["unique"]),
            }

            if (field["defaultValue"]) {
                switch (field["defaultValue"].toString().toLowerCase()) {
                    case "true":
                        schema[field_name]["default"] = true;
                        break;
                    case "false":
                        schema[field_name]["default"] = false;
                        break;
                    default:
                        schema[field_name]["default"] = field["defaultValue"];
                }
            }

            if (type == "String" && enumData != null) {
                schema[field_name]["enum"] = enumData;
            }
        })
    }

    return { [obj["name"]]: schema };
}
