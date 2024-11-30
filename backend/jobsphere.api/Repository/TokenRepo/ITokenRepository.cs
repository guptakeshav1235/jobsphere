namespace jobsphere.api.Repository.TokenRepo
{
    public interface ITokenRepository
    {
        void GenerateTokenAndSetCookie(Guid userId,HttpResponse response);
    }
}
