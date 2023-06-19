Application Routes:
User
api/v1/auth/signup (POST)
api/v1/users (GET)
api/v1/users/6177a5b87d32123f08d2f5d4
api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE)

# Cows ApiRoutes

api/v1/cows (POST)
-> Create a new Cow for sale
api/v1/cows (GET)
-> get all cows except any condition
api/v1/cows/:id (GET)
-> get a single cow details with his seller
api/v1/cows/:id (PATCH)
-> update a single cow data
api/v1/cows/:id (DELETE)
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
