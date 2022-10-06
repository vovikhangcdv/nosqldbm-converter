const assert = require('assert')
const convert = require('../source/convert.js');
const convertType = require('../source/convertType.js');
const convertCollection = require('../source/convertCollection.js');


describe("Convert https://nosqldbm.ru/ JSON data to Moongose Schema.", function () {
    describe("convertType", function () {
        it("should return String", function () {
            assert.deepEqual(convertType("String"), "String");
        });
        it("should return Number", function () {
            assert.deepEqual(convertType("Integer"), "Number");
        });
        it("should return Date", function () {
            assert.deepEqual(convertType("Date"), "Date");
        });
        it("should return Boolean", function () {
            assert.deepEqual(convertType("Boolean"), "Boolean");
        });
        it("should return ObjectId", function () {
            assert.deepEqual(convertType("ObjectId"), "ObjectId");
        });
        it("should return Array", function () {
            assert.deepEqual(convertType("Array"), []);
        });
        it("should return []", function () {
            assert.deepEqual(convertType("[]"), []);
        });
        it("should return Object", function () {
            assert.deepEqual(convertType("Object"), "Object");
        });
        it("should return Double", function () {
            assert.deepEqual(convertType("Double"), "Double");
        });
        it("should return Mixed", function () {
            assert.deepEqual(convertType("Mixed"), "Mixed");
        });
        it("should return Array of type", function () {
            assert.deepEqual(convertType("[String]"), ["String"]);
        });
        it("should return Array of array", function () {
            assert.deepEqual(convertType("[[]]"), [[]]);
        });
        it("should return Array of array string", function () {
            assert.deepEqual(convertType("[[String]]"), [["String"]]);
        });
        it("should return whatever type", function () {
            assert.deepEqual(convertType("Whatever"), "Whatever");
        });
    });

    describe("convertCollection", function () {
        it("should ignore _id field", function () {
            const input = {
                "schemaType": "Collection",
                "name": "User",
                "type": "ObjectId",
                "required": true,
                "unique": true,
                "defaultValue": "",
                "description": "",
                "index": 0,
                "customProps": [],
                "fields": [
                    {
                        "schemaType": "Field",
                        "name": "_id",
                        "type": "ObjectId",
                        "required": true,
                        "unique": true,
                        "defaultValue": "",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    },
                ]
            }
            assert.deepEqual(convertCollection(input), { User: {} });
        });

        it("should convert correct type, required and unique value", function () {
            const input = {
                "schemaType": "Collection",
                "name": "User",
                "type": "ObjectId",
                "required": true,
                "unique": true,
                "defaultValue": "",
                "description": "",
                "index": 0,
                "customProps": [],
                "fields": [
                    {
                        "schemaType": "Field",
                        "name": "name",
                        "type": "String",
                        "required": true,
                        "unique": false,
                        "defaultValue": "",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    },
                    {
                        "schemaType": "Field",
                        "name": "email",
                        "type": "String",
                        "required": true,
                        "unique": true,
                        "defaultValue": "",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    }
                ]
            }
            const expect = {
                User: {
                    name: { type: 'String', required: true, unique: false, default: "" },
                    email: { type: 'String', required: true, unique: true, default: "" }
                }
            }
            assert.deepEqual(convertCollection(input), expect);
        });

        it("should convert correct defaultValue", function () {
            const input = {
                "schemaType": "Collection",
                "name": "User",
                "type": "ObjectId",
                "required": true,
                "unique": true,
                "defaultValue": "",
                "description": "",
                "index": 0,
                "customProps": [],
                "fields": [
                    {
                        "schemaType": "Field",
                        "name": "name",
                        "type": "String",
                        "required": true,
                        "unique": false,
                        "defaultValue": "John",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    },
                ]
            }
            const expect = {
                User: {
                    name: { type: 'String', required: true, unique: false, default: 'John' },
                }
            }
            assert.deepEqual(convertCollection(input), expect);
        });

        it("should convert correct array value", function () {
            const input = {
                "schemaType": "Collection",
                "name": "Task",
                "type": "ObjectId",
                "required": true,
                "unique": true,
                "defaultValue": "",
                "description": "",
                "index": 0,
                "customProps": [],
                "fields": [
                    {
                        "schemaType": "Field",
                        "name": "type",
                        "type": "[String]",
                        "required": true,
                        "unique": true,
                        "defaultValue": "",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    },
                    {
                        "schemaType": "Field",
                        "name": "type2",
                        "type": "[[]]",
                        "required": true,
                        "unique": true,
                        "defaultValue": "",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    }
                ]
            }
            const expect = {
                Task: {
                    type: { type: ['String'], required: true, unique: true, default: "" },
                    type2: { type: [[]], required: true, unique: true, default: "" }
                }
            }
            assert.deepEqual(convertCollection(input), expect);
        }
        );
    });

    describe("convert", function () {
        it("should convert correct seperated object", function () {
            const input = {
                "schemaType": "Collection",
                "name": "User",
                "type": "ObjectId",
                "required": true,
                "unique": true,
                "defaultValue": "",
                "description": "",
                "index": 0,
                "customProps": [],
                "fields": [
                    {
                        "schemaType": "Field",
                        "name": "name",
                        "type": "String",
                        "required": true,
                        "unique": false,
                        "defaultValue": "",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    },
                    {
                        "schemaType": "Field",
                        "name": "email",
                        "type": "String",
                        "required": true,
                        "unique": true,
                        "defaultValue": "",
                        "description": "",
                        "index": 0,
                        "customProps": []
                    }
                ]
            }
            const expect = {
                User: {
                    name: { type: 'String', required: true, unique: false, default: "" },
                    email: { type: 'String', required: true, unique: true, default: "" }
                }
            }
            assert.deepEqual(convert(input), expect);
        });

        it("should convert correct array of objects", function () {
            const input = [
                {
                    "schemaType": "Collection",
                    "name": "User",
                    "type": "ObjectId",
                    "required": true,
                    "unique": true,
                    "defaultValue": "",
                    "description": "",
                    "index": 0,
                    "customProps": [],
                    "fields": [
                        {
                            "schemaType": "Field",
                            "name": "name",
                            "type": "String",
                            "required": true,
                            "unique": false,
                            "defaultValue": "",
                            "description": "",
                            "index": 0,
                            "customProps": []
                        },
                        {
                            "schemaType": "Field",
                            "name": "email",
                            "type": "String",
                            "required": true,
                            "unique": true,
                            "defaultValue": "",
                            "description": "",
                            "index": 0,
                            "customProps": []
                        }
                    ]
                },
                {
                    "schemaType": "Collection",
                    "name": "Task",
                    "type": "ObjectId",
                    "required": true,
                    "unique": true,
                    "defaultValue": "",
                    "description": "",
                    "index": 0,
                    "customProps": [],
                    "fields": [
                        {
                            "schemaType": "Field",
                            "name": "type",
                            "type": "[String]",
                            "required": true,
                            "unique": true,
                            "defaultValue": "",
                            "description": "",
                            "index": 0,
                            "customProps": []
                        },
                        {
                            "schemaType": "Field",
                            "name": "type2",
                            "type": "[[]]",
                            "required": true,
                            "unique": true,
                            "defaultValue": "",
                            "description": "",
                            "index": 0,
                            "customProps": []
                        }
                    ]
                }
            ]
            const expect = [
                {
                    User: {
                        name: { type: 'String', required: true, unique: false, default: "" },
                        email: { type: 'String', required: true, unique: true, default: "" }
                    }
                },
                {
                    Task: {
                        type: { type: ['String'], required: true, unique: true, default: "" },
                        type2: { type: [[]], required: true, unique: true, default: "" }
                    }
                }
            ]
            assert.deepEqual(convert(input), expect);
        });

    });
});