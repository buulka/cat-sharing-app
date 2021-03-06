# Тестовое задание для компании RobotBull

## Ожидаемый результат  

REST API для сервиса шеринга котиков

## Реализация  

Серверная часть написана на Typescript с использованием фреймворка Nest.js. 

Данные о котиках хранятся в базе данных PostgreSQL, работа с бд осуществляется с использованием TypeOrm.

Фотографии котиков хранятся в Minio.  

#### Сущности 

Главной сущностью является котик:

* `id` - id котика (string)
* `name`- имя котика (string)
* `color` - окрас котика (string)
* `breed` - порода котика (string)
* `age` - возраст котика (integer)
* `price` - стоимость аренды котика (double)
* `isVacant` - состояние брони котика, по умолчанию true (boolean, required=false)
* `imgName` - название фотографии котика, хранящейся в Minio,по умолчанию null (boolean, required=false)


#### API Endpoints

* GET `/cats` - возвращает всех котиков в формате json
    ```json
  [
    {
        "id": 16,
        "name": "Bob",
        "color": "red",
        "breed": "breed1",
        "age": 16,
        "price": 10.0,
        "imgName": "16.jpg",
        "isVacant": true
    },
    {
        "id": 17,
        "name": "Tom",
        "color": "white",
        "breed": "breed2",
        "age": 8,
        "price": 200.0,
        "imgName": null,
        "isVacant": false
    }
  ]
  ```
    * `/cats/:id` - возвращает информацию о котике с заданным id
    * `/cats/vacant` - возвращает только свободных котиков
    * `/cats/reserved` - возвращает только забронированных котиков
    * `/cats/:id/photo` - возвращает фотографию котика с заданным id


* POST `/cats` - принимает котика в формате json и добавляет в базу данных 
```json
{
    "name": "Bob",
    "age": 16,
    "color": "red", 
    "breed": "breed1",
    "price": 10.0
}
```


* POST `/cats/:id/photo` - принимает изображение формата JPEG / JPG в multipart файле с именем 'file', сохраняет изображение в хранилище Minio с именем в формате '{id котика}.jpg' 
 и записывает в поле `imgName` имя изображения в хранилище у котика с заданным id   
* PUT `/cats/:id/vacant` - записывает в поле `isVacant` true у котика с заданным id, т.е котик становится доступным к бронированию
* PUT `/cats/:id/reserved` - записывает в поле `isVacant` false у котика с заданным id, т.е котик бронируется
* DELETE `/cats/:id` - удаляется из базы данных котик с заданным id


## Запуск приложения 
Запуск всего проекта осуществляется  командой
```shell
docker-compose up -d
```