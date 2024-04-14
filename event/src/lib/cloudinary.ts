import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export const uploadImageToCloudinary = async (
  buffer: Buffer,
  filename: string,
  options: { tags?: string[] } = {},
) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream(
        {
          tags: options.tags || [""],
          use_filename: true,
          filename_override: filename,
        },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        },
      )
      .end(buffer);
  });
};

export const deleteImage = async (url: string) => {
  // find the filename from url using regex
  const filename = url.match(/\/([^\/]+)$/);
  if (!filename) {
    return { error: "Unable to get filename" };
  }
  const index = filename[1].lastIndexOf(".");
  if (index === -1) {
    return { error: "Unable to get publicId" };
  }
  const publicId = filename[1].slice(0, index);
  return cloudinary.v2.uploader.destroy(publicId);
};
