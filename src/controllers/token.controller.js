
// Unique ID generator
import { v4 as uuidv4 } from 'uuid';

//Import Time Stamp lib && Response Lib
import * as Time from '../core/libs/TimeStamp.lib';
import { Response } from '../core/libs/Response.lib';


//Tokens LET && Token Model
import tokenModel from '../models/token.model';
export let tokens = [];

export async function downloadTokens() {
    console.log("Downloading tokens from database...");
    const dbtokens = await tokenModel.find({});
    await dbtokens.forEach(token => {tokens.push(token)});
    console.log("Tokens downloaded and saved.");
}

export function generateServerToken() {
    const uniqueToken = uuidv4();
    const tokenDates = {
        "creationDate": TimeType2(),
        "firtsUsage": TimeType2(),
    }
    tokens.push({token: uniqueToken, permLevel: 999, maxRequests: 0, totalRequests: 0, tokenDates});
    return uniqueToken;

}

export const generateToken = async(req, res) => {
    try {
        const tokenInfo = req.body;
        if (tokenInfo.permLevel != null && tokenInfo.maxRequests != null && tokenInfo.totalRequests != null) {
            const token = uuidv4();
            const tokenDates = {
                "creationDate": Time.TimeType2(),           
                "firtsUsage": Time.TimeType2()
            }
            tokens.push({token: token, ...tokenInfo, tokenDates: tokenDates});
            const SaveToken = new tokenModel({token: token, permLevel: tokenInfo.permLevel, maxRequests: tokenInfo.maxRequests, totalRequests: tokenInfo.totalRequests, tokenDates})
            await SaveToken.save();
            res.status(201).json(Response("true", SaveToken));
            return;
        }
        res.status(400).json(Response("false", "Missing Data."));
    } catch (err) {
        res.status(500).json(Response("false", "Interal Server Error"));
        console.log(`generateToken: ${err}`)
    }
}

export const deleteToken = async(req, res) => {
    try {
        const token = await tokenModel.findOne({ token: req.params.token}).exec();
        if (token != null) {
            await tokenModel.findOneAndDelete({token: req.params.token});
            tokens.filter((token) => token.token != token);
            res.status(200).json(Response("true", "Token Deleted"));
        }
        res.status(400).json(Response("false", "Token not deleted. Maybe token don't exist"));
    } catch(err) {
        res.status(500).json(Response("false", "Internal Server Error"));
        console.log(`deleteToken: ${err}`);
    }
}