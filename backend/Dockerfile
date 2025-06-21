FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443
ENV ASPNETCORE_URLS=http://+:80;https://+:443
ENV ASPNETCORE_Kestrel__Certificates__Default__Password=admin
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/app/https/aspnetapp.pfx

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["backend.csproj", "./"]
RUN dotnet restore "backend.csproj"
COPY . .
RUN dotnet build "backend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "backend.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app

RUN mkdir -p /app/https

COPY --from=publish /app/publish .

COPY ./https/aspnetapp.pfx /app/https/

ENTRYPOINT ["dotnet", "backend.dll"]