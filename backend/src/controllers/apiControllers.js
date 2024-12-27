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

    // console.log("existingUrl", existingUrl);

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
        message: `This alias - ${alias} used by another user, Please choose the other`,
      });
    }

    //checking the creation of last 30 minutes, the limit is 3, if the user creating the fourth one within the 30 minutes will get the error to wait
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    console.log(thirtyMinutesAgo);
    const entries = await Url.find({
      createdAt: { $gte: thirtyMinutesAgo }, // Filter entries created in the last 30 minutes
    })
      .sort({ createdAt: -1 }) // Sort by creation time in descending order
      .limit(3);

    if (entries.length == 3) {
      const timeDifference = Date.now() - entries[0].createdAt.getTime();
      const remainingMinutes = Math.max(
        30 - Math.floor(timeDifference / 60000),
        0
      );
      return res.status(400).json({
        success: false,
        message: `Please wait to ${remainingMinutes} minutes. Users allowed only three creation within 30 minutes`,
      });
    }

    if (!alias) {
      alias = nanoid(9);
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

export const getDetailsByAlias = async () => {
  try {
    const { alias } = req.params;

    const url = await Url.findOne({ alias });
    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Details not found",
      });
    }
    console.log(url);
    return res.status(200).json({
      success: true,
      data: url,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};
