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

Запустить терминал.

Перейти в директорию server и сделать билд  
`dotnet build ./GISServer.API`

Применить миграцию, то есть перейти в директорию server и ввести команду:  
`dotnet ef database update -s ./GISServer.API -p ./GISServer.Infrastructure`

## Запуск сервера

Если при подготовке сервера не было ошибок, то все готово к запуску. из директории server:  
`dotnet run --project ./GISServer.API`

## Если сервер не запускается или была ошибка при подготовке к запуску

### Проверьте строку подключения в файле GISServer.Infrastructure/Data/Context
Возможно там записаны данные не вашего пользователя. По умолчанию port=5432, password=12345.

### Если не помогло - перейдите в директорию server

Выполните очистку базы данных
`dotnet ef database drop -s ./GISServer.API -p ./GISServer.Infrastructure`.

И заново создайте ее
`dotnet ef database update -s ./GISServer.API -p ./GISServer.Infrastructure`.

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