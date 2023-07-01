# Live Link: https://cow-hut-backend-assignment-eight.vercel.app

# Application Routes

# Main part

Auth (User)
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/auth/user/login (POST)
--> User login route
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/auth/refresh-token (POST)
---> Token regenerated Route

Auth (Admin)
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/admin/create-admin (POST)
---> Create Admin
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/admin (POST)
---> Get Admin
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/admin/login (POST)
---> Login Admin
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/user/login (POST)
---> User Admin
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/users (GET)
----> Only admin can get users
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/users/649e31843dadb8c607e378a3 (Single GET)
---> Only admin can get a user
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/users/649e31843dadb8c607e378a3 (PATCH)
---> Only admin can update a user
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/users/649e31843dadb8c607e378a3 (DELETE)
---> Only admin can delete a user
Cows
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/cows/create-cow (POST)
---> Only seller can Create a cow
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/cows (GET)
---> All user can get cows
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/cows/649ec429186c6379c558cfda (Single GET)
---> All user can get a cow
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/cows/649ec429186c6379c558cfda (PATCH)
---> Only seller can update a cow
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/cows/649ec429186c6379c558cfda (DELETE)
---> Only seller can delete a cow
Orders
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/orders/create-order (POST)
---> Only buyer Create an Order
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/orders (GET)
---> Order related user and admin can get orders

# Bonus Part

Admin
-Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/admin/create-admin (POST)
---> Create Admin
My Profile
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/users/my-profile (GET)
---> My profile get from req.headers.authorization
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/users/update-profile (PATCH)
---> User can update only name,phoneNumber,address.
Order:
Route: https://cow-hut-backend-assignment-eight.vercel.app/api/v1/orders/649e4e6ae2f9df86751d3251 (GET)
---> This Order related user and admin can get orders

# Admin

Admin--- phoneNumber & password /api/v1/admin/login
{
"phoneNumber": "01711111112",
"password": "abrakadabra"
}

# Buyer

Buyer--- phoneNumber & password /api/v1/user/login
{
"phoneNumber": "01755327723",
"password": "abrakadabra"
}

# Seller

Buyer--- phoneNumber & password /api/v1/user/login
{
"phoneNumber": "01910322714",
"password": "abrakadabra"
}
