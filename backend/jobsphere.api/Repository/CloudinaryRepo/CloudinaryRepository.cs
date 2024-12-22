using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace jobsphere.api.Repository.CloudinaryRepo
{
    public class CloudinaryRepository : ICloudinaryRepository
    {
        private readonly Cloudinary cloudinary;

        public CloudinaryRepository(IConfiguration configuration)
        {
            cloudinary = new Cloudinary(new Account(
                    configuration["Cloudinary:CloudName"],
                    configuration["Cloudinary:ApiKey"],
                    configuration["Cloudinary:ApiSecret"]
                ));
        }
        public async Task<string> UploadImageAsync(string base64Image, string fileName)
        {
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(fileName, new MemoryStream(Convert.FromBase64String(base64Image))),
                Folder = "profile_photos"
            };

            var uploadResult = await cloudinary.UploadAsync(uploadParams);
            return uploadResult.SecureUrl.ToString();
        }

        public async Task<string> UploadFileAsync(string base64File, string fileName)
        {
            var uploadParams = new RawUploadParams
            {
                File = new FileDescription(fileName, new MemoryStream(Convert.FromBase64String(base64File))),
                Folder = "resumes"
            };

            var uploadResult = await cloudinary.UploadAsync(uploadParams);
            return uploadResult.SecureUrl.ToString();
        }

        public async Task<string> UploadLogoAsync(string base64Image, string fileName)
        {
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(fileName, new MemoryStream(Convert.FromBase64String(base64Image))),
                Folder = "company_logos"
            };

            var uploadResult = await cloudinary.UploadAsync(uploadParams);
            return uploadResult.SecureUrl.ToString();
        }

    }
}
