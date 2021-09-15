// Import news model
import newsModel from '../models/news.model';

//Import response && time libs
import { Response } from '../core/libs/Response.lib';
import * as Time from '../core/libs/TimeStamp.lib';

export const getNews = async(req, res) => {
    try {
        const news = await newsModel.find();
        res.status(200).json(Response("true", news));

    } catch (err) {
        res.status(500).json(Response("false", "Internal server error."));
        console.log(`getNews: ${err}`); 
    }
}

export const getNewByName = async(req, res) => {
    try {
        const news = await newsModel.findOne({ newsName: req.paramas.newsName });
        if (news != null) {
            res.status(200).json(Request("true", news));
        } else {
            res.send(404);
        }
    } catch (err) {
        res.status(500).json(Response("false", "Internal server error."));
        console.log(`getNewByName: ${err}`); 
    }
}