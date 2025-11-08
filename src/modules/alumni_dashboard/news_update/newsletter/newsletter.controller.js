import NewsletterService from "./newsletter.service.js";
import { statusCode } from '../../../../utils/constants/statusCode.js';
import imagekit from "../../../../helpers/imagekit.js";

export default class NewsletterController {
  constructor() {
    this.newsletterService =  NewsletterService;
  }

  getAll = async (req, res, next) => {
    try {
      const newsletters = await this.newsletterService.getAll();
      res.success("All Newsletters fetched successfully", newsletters, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      const { month, theme } = req.body;

      if (!req.file) {
        return res.fail("File is required", statusCode.BAD_REQUEST);
      }

      const uploadResponse = await imagekit.upload({
        file: req.file.buffer,
        fileName: `${Date.now()}-${req.file.originalname}`,
        folder: "/newsletters"
      });

      const newsletter = await this.newsletterService.create({
        month,
        theme,
        fileUrl: uploadResponse.url,
      });

      res.success("Newsletter uploaded successfully", newsletter, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };
}
