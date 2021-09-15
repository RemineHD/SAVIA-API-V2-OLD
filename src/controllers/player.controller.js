// Import player model
import playerModel from '../models/player.model';

//Import response && time libs
import { Response } from '../core/libs/Response.lib';
import * as Time from '../core/libs/TimeStamp.lib';

export const getPlayers = async(req, res) => {
    try {
        const players = await playerModel.find();
        res.status(200).json(Response("true", players));
    } catch (err) {
        res.status(500).json(Response("false", "Internal server error."));
        console.log(`getPlayers: ${err}`);
    }
}

export const registerPlayer = async(req, res) => {
    try {
        const { uniqueId, playerName, displayName } = req.body;
        if (uniqueId && playerName && displayName) {
            const existscheck = await playerModel.findOne({ uniqueId: uniqueId, playerName: playerName, displayName: displayName}).exec();
            if (existscheck == null) {
                    const money = 150;
                    const level = 1;
                    const exp = 0;
                    const rank = {
                        "packageRank": "DEFAULT",
                        "displayRank": "DEFAULT",
                        "expireDate": null,
                        "plusMember": "false"
                    }
                    const playerLogins = {
                        "firstLogin": Time.TimeType2(),
                        "lastLogin": Time.TimeType2(),
                        "lastLogout": null
                    }
                    const stats = {
            
                    }
                    const newPlayer = new playerModel({ uniqueId, playerName, displayName, money, level, exp, rank, playerLogins, stats});
                    const PlayerSaved = await newPlayer.save();
                    res.status(201).json(Response("true", PlayerSaved));                
            } else {
                res.status(400).json(Response("false", "Player Already Exists."));
            }
        } else {
            res.status(400).json(Response("false", "Missing data."))
        }
    } catch (err) {
        res.status(500).json(Response("false", "Internal server error."));
        console.log(`registerPlayer: ${err}`);
    }
}

export const getPlayerById = async(req, res) => {
    try {
        const player = await playerModel.findOne({ uniqueId: req.params.uniqueId}).exec();
        if (player != null) {
            res.status(200).json(Response("true", player));
        } else {
            res.send(404);
        }
    } catch (err) {
        res.status(500).json(Response("false", "Internal server error."));
        console.log(`getPlayerById: ${err}`);
    }
}

export const updatePlayerById = async(req, res) => {
    try {
        const player = await playerModel.findOne({ uniqueId: req.params.uniqueId}).exec();
        if (player != null) {
            const updatedPlayer = await playerModel.findOneAndUpdate({uniqueId: req.params.uniqueId}, req.body, {
                new: true
            })
            res.status(200).json(Response("true", updatedPlayer));
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json(Response("false", "Internal server error."));
        console.log(`updatePlayerById: ${err}`);
    }
}

export const deletePlayerById = async(req, res) => {
    try {
        const player = await playerModel.findOne({ uniqueId: req.params.uniqueId}).exec();
        if (player != null) {
            const deletedPlayer = await playerModel.findOneAndDelete({uniqueId: req.params.uniqueId});
            res.status(200).json(Response("true", deletedPlayer));
        } else {
            res.status(404);
        }
    } catch (err) {
        res.status(500).json(Response("false", "Internal server error."));
        console.log(`deletePlayerById: ${err}`);
    }
}