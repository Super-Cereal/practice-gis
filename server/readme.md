# Server

## Дополнительный софт

- Postgres (16)
- [PostGis](https://download.osgeo.org/postgis/windows/pg16/)
- [asp.net 6.0](https://dotnet.microsoft.com/ru-ru/download/dotnet/6.0)
- еще что-то связанное с сервером MS или runtime сервера MS. я не помню, решим по ходу дела.
- dotnet; dotnet-ef

### Postgres

При создании пользователя оставьте параметры поумолчанию - port=5432 password=12345

### PostGis

Устанавливается из Stack Builder при установке Postgres или по ссылке

### Asp.Net

Обязательно 6 версия.
\
\
**_Далее все команды вводятся в терминале_**

### dotnet

Скачивается при установке asp.net. проверить можно так:\
`dotnet --version`

### dotnet-ef

`dotnet tool install --global dotnet-ef`

## Подготовка к запуску сервера

> Ее следует выполнять каждый раз после новых коммитов.

1. Запустить терминал

2. Cделать билд:  
   `dotnet build ./GISServer.API`

3. Применить миграцию:  
   `dotnet ef database update -s ./GISServer.API -p ./GISServer.Infrastructure`

4. Если при подготовке сервера не было ошибок, то можно запускать сервер:  
   `dotnet run --project ./GISServer.API`

## Если сервер не запускается или была ошибка при подготовке к запуску

### Проверьте строку подключения в файле GISServer.Infrastructure/Data/Context

Возможно там записаны данные не вашего пользователя. Измените их на собственные. По умолчанию данные пользователя port=5432, password=12345.

### Если не помогло - ...

Выполните очистку базы данных.
`dotnet ef database drop -s ./GISServer.API -p ./GISServer.Infrastructure`.

И заново создайте ее.
`dotnet ef database update -s ./GISServer.API -p ./GISServer.Infrastructure`.

> ↑↑↑ В любой непонятной ситуации с сервером сносите базу данных и создавайте ее заново ↑↑↑

## Пример структуры объекта

Минимальный набор информации требуемый для создания объекта

```
{
  "name": "имя объекта",
  "geometry": {
    "authoritativeKnowledgeSource": "источник/автор",
    "borderGeocodes": "geoJson",
    "areaValue": 0,
    "westToEastLength": 0,
    "northToSouthLength": 0
  },
  "geoObjectInfo": {
    "language": "язык",
    "commonInfo": "дополнительная информация"
  }
}
```
