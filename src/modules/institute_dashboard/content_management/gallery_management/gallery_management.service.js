 import { GALLERY_MANAGEMENT_MODEL } from "./gallery_management.model.js";

 class Gallery_managementService {
   
  async create(data) {
    const album = await GALLERY_MANAGEMENT_MODEL.create(data);
    return album;
  }

  async getAll() {
    const albums = await GALLERY_MANAGEMENT_MODEL.find();
    const totalAlbums = await GALLERY_MANAGEMENT_MODEL.countDocuments();
    const totalUploads = albums.reduce((acc, album) => acc + album.media.length, 0);
    const featuredAlbums = await GALLERY_MANAGEMENT_MODEL.countDocuments({ featured: true });

    return {
      stats: { totalAlbums, totalUploads, featuredAlbums },
      data: albums,
    };
  }

}

export default new Gallery_managementService();