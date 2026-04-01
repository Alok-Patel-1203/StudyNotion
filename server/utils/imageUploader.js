const cloudinary = require('cloudinary').v2


exports.uploadImageToCloudinary  = async (file, folder, height, quality) => {
    const options = {
        folder,
    };
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    const isVideo = file?.mimetype?.startsWith("video/")
    options.resource_type = isVideo ? "video" : "image"

    try {
        // Use chunked upload only for large videos; normal upload is faster and more stable for small files.
        if (isVideo && (file?.size || 0) > 100 * 1024 * 1024) {
            options.chunk_size = 6000000
            return await cloudinary.uploader.upload_large(file.tempFilePath, options)
        }

        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        throw new Error(error?.message || "Cloudinary upload failed")
    }
}