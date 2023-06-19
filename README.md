# ---------------------Application Routes-------------------------------

# User ApiRoutes

api/v1/auth/signup (POST)
-> Create a new user
api/v1/users (GET)
-> Get all users
api/v1/users/64900b40e6a11339ae1ec43a
-> Get a user with its id
api/v1/users/64900b40e6a11339ae1ec43a (PATCH)
-> Update a user with its id
api/v1/users/64900b40e6a11339ae1ec43a (DELETE)
-> Delete a user with its id

# Cows ApiRoutes

api/v1/cows (POST)
-> Create a new Cow for sale
api/v1/cows (GET)
-> get all cows except any condition
api/v1/cows/648fcba5ca384956d53a67bd (GET)
-> get a single cow details with his seller
api/v1/cows/648fcba5ca384956d53a67bd (PATCH)
-> update a single cow data
api/v1/cows/648fcba5ca384956d53a67bd (DELETE)
-> Delete a single cow data

# ------ data retrive with condition -----

api/v1/cows?page=1&limit=10
api/v1/cows?sortBy=price&sortOrder=asc
api/v1/cows?minPrice=20000&maxPrice=70000
api/v1/cows?location=Chattogram
api/v1/cows?searchTerm=Cha

# Orders ApiRoutes

api/v1/orders (POST)
api/v1/orders (GET)

# Live Link

Hosted in Vercel -> [Digital Cow Hut.](https://cow-hut-backend-assignment-eight.vercel.app/)

## Cors

Documentation -> [Cors](https://www.npmjs.com/package/cors)

## Express Js

Hosted in Vercel -> [Express Js](https://expressjs.com/)

## Resourse

MongoDB used as a database -->[mongo DB](https://www.mongodb.com/atlas/database)

## Vercel CLI

Documentation Link -> [Link](https://vercel.com/dashboard)
