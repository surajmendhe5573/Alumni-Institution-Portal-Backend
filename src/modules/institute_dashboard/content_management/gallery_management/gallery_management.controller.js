import Gallery_managementService from "./gallery_management.service.js";
import { statusCode } from "../../../../utils/constants/statusCode.js";
import cloudinary from "../../../../helpers/cloudinary.js"; 

export default class Gallery_managementController {
  constructor() {
    this.gallery_managementService = Gallery_managementService;
  }

  // Upload helper (optimized)
  async uploadGalleryFilesToCloudinary(files) {
    const uploadedFiles = [];
    for (const file of files) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "gallery", 
        resource_type: "auto",
      });
      uploadedFiles.push({
        url: uploadResult.secure_url,
        type: uploadResult.resource_type,
      });
    }
    return uploadedFiles;
  }

  create = async (req, res, next) => {
    try {
      const { albumName, description, featured } = req.body;

      const uploadedMedia = await this.uploadGalleryFilesToCloudinary(req.files);

      const albumData = {
        albumName,
        description,
        featured,
        media: uploadedMedia,
      };

      const result = await this.gallery_managementService.create(albumData);
      res.success("Gallery album created successfully", result, statusCode.CREATED);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const result = await this.gallery_managementService.getAll();
      res.success("Fetched all gallery albums successfully", result, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}