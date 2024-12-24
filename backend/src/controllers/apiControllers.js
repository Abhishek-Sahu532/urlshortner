import { Url } from "../models/url.model.js";
import { nanoid } from "nanoid";

export const createShortUrl = async (req, res, next) => {
  try {
    let { longUrl, alias, topic } = req.body;
    // console.log(longUrl, alias, topic);

    if (!longUrl) {
      return res.status(400).json({
        success: false,
        message: "Provide the long url",
      });
    }
    if (
      !/^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
        longUrl
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide the valid URL",
      });
    }
    //if already shorten by users

    let existingUrl = await Url.findOne({ longUrl });

    console.log("existingUrl", existingUrl);

    if (existingUrl) {
      return res.status(200).json({
        success: true,
        url: existingUrl,
      });
    }

    //checking the alias for uniqueness provides by the user, meanwhile nanoid generating the unique string
    let existingAlias = await Url.findOne({ alias });

    if (existingAlias) {
      return res.status(400).json({
        success: false,
        message: "This alias used by another user, Provide the other",
      });
    }

    if (!alias) {
      alias = nanoid(7);
    }
    console.log("alias", alias);
    let newUrl = await Url.create({
      longUrl: longUrl,
      alias: alias,
      topic: topic,
      shortUrl: `shorturl.at/${alias}`,
      //   user : ,
    });

    return res.status(200).json({
      success: true,
      shortUrl: newUrl?.shortUrl,
      createdAt: new Date(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};
