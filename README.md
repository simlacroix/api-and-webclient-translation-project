# api-and-webclient-project

## Name
Translator

## Description
### Web Client
The web client is based on the REACT library, with TypeScript used for development. React is a library developed by Facebook that simplifies complex processes in web interface development. TypeScript, a typed superset of JavaScript, is also utilized, becoming increasingly standard in the industry.

In addition to React, the following libraries are used in the front-end project:

React Redux: Used for managing application state in a store.
React Redux Toolkit: Facilitates creating an interface for API requests and caching.
Mui (Material-UI): A comprehensive library of visual components.
Axios: Used for making HTTP requests.
The web client operates as follows:

When the user is not logged in, they can:
- Log in
- Register
- Perform anonymous translations

When the user is logged in, they can:
- Perform translations, which will be saved in a translation history
- View their translation history
- Add translations to favorites
- Log out

### Backend
The backend is a .NET API that takes the requests of both the web and Android clients. It was coded in C#. The backend uses the Azupre API AI Translator. This API was used to take care of doing the translation of the text that the backend received from the client, that would then be sent back to the client after it was translated. The backend also took care of authenticating users that wished to keep an history of their translations, and consequently manage this history for each users. A SQLite database was used to manage this.

Routes:

![image](https://github.com/simlacroix/api-and-webclient-translation-project/assets/47335007/e0037798-3c70-4944-a7e9-2fd4367ccd56)

The POST is used to request a translation

Request body:

```json
{
  "sourceLanguage": "string",
  "targetLanguages": [
    "string"
  ],
  "sourceText": "string"
}
```

Response body:

```json
[
  {
    "detectedLanguage": {
      "language": "string",
      "score": 0
    },
    "translations": [
      {
        "text": "string",
        "to": "string"
      }
    ]
  }
]
```

![image](https://github.com/simlacroix/api-and-webclient-translation-project/assets/47335007/847627b6-22c5-4fd9-8ef2-542961207936)
The GET is used to get the translation history for a specific user. A bearer token or cookies can be used for authentication.

Response body:

```json
[
  { 
    "id": 0, 
    "userId": "string", 
    "sourceLanguage": "string", 
    "targetLanguage": "string", 
    "sourceText": "string", 
    "translatedText": "string", 
    "timestamp": "2023-12-03T18:10:29.662Z", 
    "isFavorite": true
  }
]
```
![image](https://github.com/simlacroix/api-and-webclient-translation-project/assets/47335007/02b4c9ef-3a57-41a7-9ce3-e3c7011367f1)

The DELETE is used to clear the history. A bearer token or cookies can be used for authentication.

![image](https://github.com/simlacroix/api-and-webclient-translation-project/assets/47335007/da8a1b0f-a14e-4766-9d58-2de31e22dcdb)

The PUT is used to toggle whether a translation is favorite or not. The id field is the same as the one found in the reponse body of the GET method. The query field `isFavorite` can be set to true or false to execute the change. A bearer token or cookies can be used for authentication.

![image](https://github.com/simlacroix/api-and-webclient-translation-project/assets/47335007/8472136b-0a3f-4bae-8684-e5e1868e4ba0)

This route is used to create a user account.

Request body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response body:

```json
{
  "type": "string",
  "title": "string",
  "status": 0,
  "detail": "string",
  "instance": "string",
  "errors": {
    "additionalProp1": [
      "string"
    ],
    "additionalProp2": [
      "string"
    ],
    "additionalProp3": [
      "string"
    ]
  },
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
```

![image](https://github.com/simlacroix/api-and-webclient-translation-project/assets/47335007/32aa776e-7a8d-444d-b95e-dabbde1a13cf)

This route is used to login a user to their account. The two last fields in the request body can be left empty if not needed. The query params `useCookies` and `useSessionCookies` can also be set to true or false depending on needs.

Request body:

```json
{
  "email": "string",
  "password": "string",
  "twoFactorCode": "string",
  "twoFactorRecoveryCode": "string"
}
```

Response body:

```json
{
  "tokenType": "string",
  "accessToken": "string",
  "expiresIn": 0,
  "refreshToken": "string"
}
```

## Visuals
![image](https://github.com/simlacroix/api-and-webclient-translation-project/assets/47335007/9116812b-801a-4710-8534-e94450a730a6)

![image](https://github.com/simlacroix/api-and-webclient-translation-project/assets/47335007/8f2aae05-ad93-4215-9f3a-fe532d11ec30)

![image](https://github.com/simlacroix/api-and-webclient-translation-project/assets/47335007/ba842232-98e4-49f6-aa14-35ebf509a1bb)

## Installation
Nedd to run the following command to properly setup the database for the project: `dotnet ef database update`

## Usage
Azure Api key is needed to properly run backend, Azure AI Translator API is used for the translations. Backend needs to be executed for the clients to function properly.

## Authors and acknowledgment
- Antoine Toutant
- Mattéo Firrone
- Gwenn Durpoix-Espinasson
- Maxime Edeline
- Simon Lacroix

## Project status
Development complete for now, possibility of modification for improvement of code quality, better UI or minor features
