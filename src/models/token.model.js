import { Schema, model } from "mongoose"

const tokenSchema = new Schema({
    token: {
        type: String,
        unique: true
    },
    permLevel: Number,
    maxRequests: Number,
    totalRequests: Number,
    tokenDates: {
        _id: false,
        creationDate: Date,
        firtsUsage: Date,
    }
}, {
    versionKey: false,
    retainKeyOrder: true
})

export default model('token', tokenSchema);