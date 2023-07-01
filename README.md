# Live Link: https://example.com

# Application Routes

# Main part

Auth (User)
Route: https://example.com/api/v1/auth/user/login (POST)
--> User login route
Route: https://example.com/api/v1/auth/refresh-token (POST)
---> Token regenerated Route

Auth (Admin)
Route: https://example.com/api/v1/admin/create-admin (POST)
---> Create Admin
Route: https://example.com/api/v1/admin/login (POST)
---> Login Admin
Route: https://example.com/api/v1/users (GET)
----> Only admin can get users
Route: https://example.com/api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET)
---> Only admin can get a user
Route: https://example.com/api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
---> Only admin can update a user
Route: https://example.com/api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE)
---> Only admin can delete a user
Cows
Route: https://example.com/api/v1/cows/create-cow (POST)
---> Only seller can Create a cow
Route: https://example.com/api/v1/cows (GET)
---> All user can get cows
Route: https://example.com/api/v1/cows/6177a5b87d32123f08d2f5d4 (Single GET)
---> All user can get a cow
Route: https://example.com/api/v1/cows/6177a5b87d32123f08d2f5d4 (PATCH)
---> Only seller can update a cow
Route: https://example.com/api/v1/cows/6177a5b87d32123f08d2f5d4 (DELETE)
---> Only seller can delete a cow
Orders
Route: https://example.com/api/v1/orders/create-order (POST)
---> Only buyer Create an Order
Route: https://example.com/api/v1/orders (GET)
---> Order related user and admin can get orders

# Bonus Part

Admin
-Route: https://example.com/api/v1/admin/create-admin (POST)
---> Create Admin
My Profile
Route: https://example.com/api/v1/users/my-profile (GET)
---> My profile get from req.headers.authorization
Route: https://example.com/api/v1/users/update-profile (PATCH)
---> User can update only name,phoneNumber,address.
Order:
Route: https://example.com/api/v1/orders/6177a5b87d32123f08d2f5d4 (GET)
---> This Order related user and admin can get orders
