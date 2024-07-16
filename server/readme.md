# Server
## Дополнительный софт
- Postgres (16)
- [PostGis](https://download.osgeo.org/postgis/windows/pg16/)
- [asp.net 6.0](https://dotnet.microsoft.com/ru-ru/download/dotnet/6.0)
- еще что-то связанное с сервером MS или runtime сервера MS. я не помню, решим по ходу дела.
- dotnet; dotnet-ef
 
### Postgres
При создании пользователя лучше поставьте пароль 12345, а порт оставте 5432. Эти настройки используются поумолчанию для сервера ;)

### PostGis
Устанавливается из Stack Builder при установке Postgres или по ссылке

### Asp.Net
Обязательно нужна 6 версия. Возможно надо будет руками устанавливать используемые библиотеки. но это не точно

### dotnet
Скачивается при установке asp.net. проверить можно так:
> `dotnet --version`

### dotnet-ef
`dotnet tool install --global dotnet-ef`

## Запуск сервера
Запустить терминал\
\
Перейти в директорию server и сделать билд \
`dotnet build .\GISServer.API\`\
\
Применить миграцию, то есть перейти в директорию server и ввести одну команду\
`cd ..`\
`dotnet ef database update -s .\GISServer.API\ -p .\GISServer.Infrastructure\`\
\
Сервер готов к запуску. из директории server\
`dotnet run --project .\GISServer.API\`\



