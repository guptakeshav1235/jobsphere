# Use the .NET SDK image for building the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["jobsphere.api.csproj", "."]
RUN dotnet restore "./jobsphere.api.csproj"
COPY . . 
WORKDIR "/src/."
RUN dotnet build "./jobsphere.api.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "./jobsphere.api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Use the runtime image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "jobsphere.api.dll"]
