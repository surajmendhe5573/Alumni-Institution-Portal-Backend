import { Router } from "express";
import Gallery_managementController from "./gallery_management.controller.js";
import { uploadGalleryFiles } from "../../../../helpers/galleryManagement.upload.js";

const router = Router();
const gallery_managementController = new Gallery_managementController();

router.get("/", gallery_managementController.getAll);
router.post("/", uploadGalleryFiles, gallery_managementController.create);

export default router;
