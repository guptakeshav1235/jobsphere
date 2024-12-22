namespace jobsphere.api.Repository.CloudinaryRepo
{
    public interface ICloudinaryRepository
    {
        Task<string> UploadImageAsync(string base64Image,string fileName);
        Task<string> UploadFileAsync(string base64File, string fileName);
        Task<string> UploadLogoAsync(string base64Image, string fileName);
    }
}
