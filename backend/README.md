## Infrastructure

This application is built using Node.js, Express, MongoDB and RabbitMQ.
  1. Node.Js and Express for building the framework
  2. MongoDB as Database
  3. RabbitMQ for handling async tasks.

## How to run

to start the application application:

`npm start`

once the app is running you can open:

http://localhost:3001

on your browser.

## Available Scripts

In the project directory, you can run:

### `npm run seed:DB`

This command will seed 2 database(Jobs and YoutubeApiKeys).

### `npm run fetchYoutubeVideosProducerJob`

FetchYoutubeVideosProducerJob will run every 10 seconds using cron tab and produces a message to `SEARCH_QUEUE`.

### `npm run fetchYoutubeVideosConsumerJob`

fetchYoutubeVideosConsumerJob is a consumer listens to `SEARCH_QUEUE` and fetches youtube videos and stores in mongo db.
It first fetches the oldest youtube api key from `YoutubeApiKeys` model (round rabin fashion) and uses it to fetch the `Youtube API`.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run lint`

For linting the application(used `ESLint`)

### `npm run format`

For formatting the application(used `Prettier`)

### Database

1. Jobs Model - stores job related details
2. YoutubeApiKeys - stores set of youtube api keys
3. videos - stores videos data fetched from youtube api(added full text search index on title and description fields)


### Test API

Models are defined through the `Schema` interface.

```js
  GET: http://localhost:3001/search?searchQuery=football&lastPageTS=2023-01-03T02:46:36.000Z&pageLimit=3&pageDirection=1&sortBy=-publishedAt

  Sample Response: 
    {
      "message": "SUCCESS",
      "size": 3,
      "nextPageTS": "2023-01-01T17:52:28.000Z",
      "prevPageTS": "2023-01-03T02:45:17.000Z",
      "data": [
        {
          "_id": "63b4135d2ed5765fbfca2217",
          "videoId": "NH8qXTOHv4E",
          "channelId": "UCE3yf1AcIlXdps2EYbq3lzw",
          "channelTitle": "TMZSports",
          "description": "Horrifying moment during the Bills vs. Bengals game on \"Monday Night Football\" -- Buffalo safety Damar Hamlin collapsed at the ...",
          "publishedAt": "2023-01-03T02:45:17.000Z",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/NH8qXTOHv4E/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/NH8qXTOHv4E/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/NH8qXTOHv4E/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "title": "Bills Safety Damar Hamlin Collapses On Field, Officials Administer Emergency CPR | TMZ Sports"
        },
        {
          "_id": "63b4135d2ed5765fbfca221a",
          "videoId": "sJafsXoLwuo",
          "channelId": "UCy5YY4ove_brGfXphrhG15Q",
          "channelTitle": "BenchwarmerBran",
          "description": "",
          "publishedAt": "2023-01-03T00:06:48.000Z",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/sJafsXoLwuo/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/sJafsXoLwuo/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/sJafsXoLwuo/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "title": "Russell Wilson Conquers the Bathrooms, Brock Purdy Stays Undefeated #nfl #football #qbclub #sports"
        },
        {
          "_id": "63b413672ed5765fbfca2254",
          "videoId": "lhjN1fiHlYc",
          "channelId": "UCy5YY4ove_brGfXphrhG15Q",
          "channelTitle": "BenchwarmerBran",
          "description": "",
          "publishedAt": "2023-01-01T17:52:28.000Z",
          "thumbnails": {
            "default": {
              "url": "https://i.ytimg.com/vi/lhjN1fiHlYc/default.jpg",
              "width": 120,
              "height": 90
            },
            "medium": {
              "url": "https://i.ytimg.com/vi/lhjN1fiHlYc/mqdefault.jpg",
              "width": 320,
              "height": 180
            },
            "high": {
              "url": "https://i.ytimg.com/vi/lhjN1fiHlYc/hqdefault.jpg",
              "width": 480,
              "height": 360
            }
          },
          "title": "NFL Teams’ New Year’s Resolutions #football #skit #sports"
        }
      ]
    }
```





