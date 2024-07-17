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

## Запуск сервера

Запустить терминал

Перейти в директорию server и сделать билд  
`dotnet build ./GISServer.API`

Применить миграцию, то есть перейти в директорию server и ввести команду:  
`dotnet ef database update -s ./GISServer.API -p ./GISServer.Infrastructure`

Сервер готов к запуску. из директории server:  
`dotnet run --project ./GISServer.API`

## Шаблон объекта

```
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "name": "string",
  "geoNameId": 0,
  "status": 0,
  "updateTime": "2024-07-05T01:03:55.733Z",
  "creationTime": "2024-07-05T01:03:55.733Z",
  "geoNameFeature": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "geoNamesFeatureCode": "string",
    "geoNamesFeatureKind": "string",
    "featureKindNameEn": "string",
    "featureNameEn": "string",
    "featureKindNameRu": "string",
    "featureNameRu": "string",
    "commentsEn": "string",
    "commentsRu": "string"
  },
  "geometry": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "authoritativeKnowledgeSource": "string",
    "version": 0,
    "status": 0,
    "archiveTime": "2024-07-05T01:03:55.733Z",
    "updateTime": "2024-07-05T01:03:55.733Z",
    "creationTime": "2024-07-05T01:03:55.733Z",
    "borderGeocodes": "string",
    "areaValue": 0,
    "westToEastLength": 0,
    "northToSouthLength": 0
  },
  "geometryVersion": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "authoritativeKnowledgeSource": "string",
      "version": 0,
      "status": 0,
      "archiveTime": "2024-07-05T01:03:55.733Z",
      "updateTime": "2024-07-05T01:03:55.733Z",
      "creationTime": "2024-07-05T01:03:55.733Z",
      "borderGeocodes": "string",
      "areaValue": 0,
      "westToEastLength": 0,
      "northToSouthLength": 0
    }
  ],
  "geoObjectInfo": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "fullName": "string",
    "shortName": "string",
    "authoritativeKnowledgeSource": "string",
    "version": 0,
    "languageCode": "string",
    "language": "string",
    "status": 0,
    "archiveTime": "2024-07-05T01:03:55.733Z",
    "updateTime": "2024-07-05T01:03:55.733Z",
    "creationTime": "2024-07-05T01:03:55.733Z",
    "commonInfo": "string"
  },

  "parentGeoObjects": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa4",
      "parentGeographicalObjectName": "string",
      "childGeographicalObjectName": "string",
      "completelyIncludedFlag": true,
      "includedPercent": 0,
      "creationDateTime": "2024-07-05T01:03:55.733Z",
      "lastUpdatedDateTime": "2024-07-05T01:03:55.733Z"
    }
  ],
  "childGeoObjects": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa5",
      "parentGeographicalObjectName": "string",
      "childGeographicalObjectName": "string",
      "completelyIncludedFlag": true,
      "includedPercent": 0,
      "creationDateTime": "2024-07-05T01:03:55.734Z",
      "lastUpdatedDateTime": "2024-07-05T01:03:55.734Z"
    }
  ],
  "outputTopologyLinks": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa5",
      "predicate": "string",
      "status": 0,
      "creationDateTime": "2024-07-05T01:03:55.734Z",
      "lastUpdatedDateTime": "2024-07-05T01:03:55.734Z",
      "commonBorder": "string"
    }
  ],
  "inputTopologyLinks": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa4",
      "predicate": "string",
      "status": 0,
      "creationDateTime": "2024-07-05T01:03:55.734Z",
      "lastUpdatedDateTime": "2024-07-05T01:03:55.734Z",
      "commonBorder": "string"
    }
  ]
}
```
