import { Schema, model } from "mongoose"

const playerSchema = new Schema({
    uniqueId: {
        type: String,
        unique: true
    },
    playerName: {
        type: String,
        unique: true,
    },
    displayName: {
        type: String,
        unique: true
    },
    money: Number,
    level: Number,
    exp: Number,
    rank: {
        _id: false,
        packageRank: String,
        displayRank: String,
        expireDate: Date,
        plusMember: String
    },
    playerLogins: {
        _id: false,
        firstLogin: Date,
        lastLogin: Date,
        lastLogout: Date
    },
    stats: {
        _id: false
    }
}, {
    versionKey: false,
    retainKeyOrder: true
})

export default model('player', playerSchema);