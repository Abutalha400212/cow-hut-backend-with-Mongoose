# Cow-Hut-Backend-Auth

#### Live Link

```bash
https://cow-hut-backend-assignment-eight.vercel.app
```

## Application Routes

### Main Part

#### Auth (User)

```http
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/auth/login (POST)
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/auth/signup (POST)
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/auth/refresh-token (POST)
```

#### Auth (Admin)

```http
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/admins/create-admin (POST)
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/admins/login (POST)
```

#### User

```http
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/users (GET)
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/users/649e31843dadb8c607e378a3 (Single GET)
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/users/649e31843dadb8c607e378a3 (PATCH)
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/users/649e31843dadb8c607e378a3 (DELETE)
```

#### Cow

```http
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/cows/create-cow (POST)
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/cows (GET)
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/cows/649ec429186c6379c558cfda (Single GET)
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/cows/649ec429186c6379c558cfda (PATCH)
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/cows/649ec429186c6379c558cfda (DELETE)

```

#### Order

```http
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/orders/create-order (POST)
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/orders (GET)
```

### Bonus Part

#### Admin

```http
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/admin/create-admin (POST)
```

#### My Profile

```http
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/users/my-profile (GET)
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/users/update-profile (PATCH)
```

#### Order

```http
https://cow-hut-backend-assignment-eight.vercel.app/api/v1/orders/649e4e6ae2f9df86751d3251 (GET)
```
