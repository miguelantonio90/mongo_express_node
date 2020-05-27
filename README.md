# mongo_express_node
# Backend API
### Quick start

```bash
# clone the repo
git clone https://github.com/miguelcabreja90/mongo_express_node.git

# change directory to repo
cd server

# Use npm to install the dependencies:
npm install

## Defined .env variable in env file 

# Mongo DB URI
# DB_URI=mongodb://localhost:27017/backend
DB_URI=mongodb://host:port/backend

# Facebook App IDs
FACEBOOK_CLIENT_ID=XXXXXXX
FACEBOOK_CLIENT_SECRET=XXXXXXX
FACEBOOK_CALLBACK_URL=http://host:port/api/auth/facebook/callback

# Twitter App IDs
TWITTER_CLIENT_ID=XXXXXXX
TWITTER_CLIENT_SECRET=XXXXXXX
TWITTER_CALLBACK_URL=http://host:port/api/auth/twitter/callback

# Google App IDs
GOOGLE_CLIENT_ID=XXXXXXX
GOOGLE_CLIENT_SECRET=XXXXXXX
GOOGLE_CALLBACK_URL=http://host:port/api/auth/google/callback

# start the server
npm start
```
Navigate to [http://localhost:9000/](http://localhost:9000/) in your browser

### End Point to authentications 
```
1-Local       POST http://host:port/api/auth
1-Facebook    GET http://host:port/api/auth/facebook
2-Google      GET http://host:port/api/auth/google
3-Twitter     GET http://host:port/api/auth/twitter
```

### To Asset
```
Fetch All             GET http://host:port/api/asset
Fetch One             GET http://host:port/api/asset/{id}
Create(Proteted)      POST http://host:port/api/asset
Update(Proteted)      PUT http://host:port/api/asset/{id}
Delete(Proteted)      DELETE http://host:port/api/asset/{id}
```

### To Owners
```
Fetch All             GET http://host:port/api/owners
Fetch One             GET http://host:port/api/owners/{id}
Create(Proteted)      POST http://host:port/api/owners
Update(Proteted)      PUT http://host:port/api/owners/{id}
Delete(Proteted)      DELETE http://host:port/api/owners/{id}
```

### To Category
```
Fetch All             GET http://host:port/api/category
Fetch One             GET http://host:port/api/category/{id}
Create(Proteted)      POST http://host:port/api/category
Update(Proteted)      PUT http://host:port/api/category/{id}
Delete(Proteted)      DELETE http://host:port/api/category/{id}
```