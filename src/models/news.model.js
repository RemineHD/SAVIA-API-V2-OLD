import { Schema, model } from "mongoose"

const newsSchema = new Schema({
    newsName: {
        type: String,
        unique: true
    },
    newType: {
        type: String,
    },
    newBody: {
        _id: false
    }
}, {
    versionKey: false,
    retainKeyOrder: true
})

export default model('news', newsSchema);