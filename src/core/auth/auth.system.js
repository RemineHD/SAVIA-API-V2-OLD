// Import Response Lib
import { Response } from '../libs/Response.lib';

//Import Tokens Let
import { tokens } from '../../controllers/token.controller';
import tokenModel from '../../models/token.model';

async function updateSqlTokens(token) {
    var suma = parseInt(token.totalRequests) + parseInt(1)
    var totalReqs = { totalRequests: suma}
    await tokenModel.findOneAndUpdate({token: token}, totalReqs, {
        new: true
    }); 
}

function authLogin(req, res, level) {
    try {
        if (typeof req.headers.authorization !== 'undefined') {
            let tokenSplit = req.headers.authorization.split(" ")[1];
            if (tokens.find((token) => token.token == tokenSplit)) {
                const usedToken = tokens.find((token) => token.token == tokenSplit);
                if (usedToken.permLevel >= level) {
                    if (usedToken.maxRequests == 0) {
                        usedToken.totalRequests = parseInt(usedToken.totalRequests) + parseInt(1);
                        updateSqlTokens(usedToken);
                        return "YES";
                    } else if (usedToken.maxRequests >= usedToken.totalRequests) {
                        usedToken.totalRequests = parseInt(usedToken.totalRequests) + parseInt(1);
                        updateSqlTokens(usedToken);
                        return "YES";
                    } else {
                        return "MAX";
                    }
                } else {
                    return "NOT";
                }
            } else {
                return "NOT";
            }
        } else {
            return "NOT";
        }
    } catch (err) {
        console.log(`authLogin: ${err}`);
        return "ERR";
    }
}

export function get(req, res, next) {
    try {
        let TokenLevel = 1;
        const vuelta = authLogin(req, res, TokenLevel);
        switch (vuelta) {
            case "YES":
                return next();
                break;
            case "MAX":
                res.status(401).json(Response("false", "You have exceeded the maximum requests per token."));
                break;
            case "NOT":
                res.status(401).json(Response("false", "Not authorized."));
                break;
            case "ERR":
                res.status(500).json(Response("false", "Internal server error."));
        }
    } catch (err) {
        console.log(`authGet: ${err}`);
        res.status(500).json(Response("false", "Internal server error."));
    }
}

export function post(req, res, next) {
    try {
        let TokenLevel = 2;
        const vuelta = authLogin(req, res, TokenLevel);
        switch (vuelta) {
            case "YES":
                return next();
                break;
            case "MAX":
                res.status(401).json(Response("false", "You have exceeded the maximum requests per token."));
                break;
            case "NOT":
                res.status(401).json(Response("false", "Not authorized."));
                break;
            case "ERR":
                res.status(500).json(Response("false", "Internal server error."));
        }
    } catch (err) {
        console.log(`authGet: ${err}`);
        res.status(500).json(Response("false", "Internal server error."));
    }
}

export function modify(req, res, next) {
    try {
        let TokenLevel = 3;
        const vuelta = authLogin(req, res, TokenLevel);
        switch (vuelta) {
            case "YES":
                return next();
                break;
            case "MAX":
                res.status(401).json(Response("false", "You have exceeded the maximum requests per token."));
                break;
            case "NOT":
                res.status(401).json(Response("false", "Not authorized."));
                break;
            case "ERR":
                res.status(500).json(Response("false", "Internal server error."));
        }
    } catch (err) {
        console.log(`authGet: ${err}`);
        res.status(500).json(Response("false", "Internal server error."));
    }
}
