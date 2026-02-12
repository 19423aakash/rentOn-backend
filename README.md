# RENTZ Backend

## Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Ensure `.env` exists with the following (update with your credentials):
    ```env
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/rentz
    JWT_SECRET=your_jwt_secret
    ```

3.  **Seed Database**:
    populate the database with initial vehicles:
    ```bash
    npm run data:import
    ```

4.  **Run Server**:
    ```bash
    npm run server
    ```
    The server will run on `http://localhost:5000`.

## API Endpoints

-   **Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/profile`
-   **Vehicles**: `/api/vehicles`, `/api/vehicles/:id`
-   **Bookings**: `/api/bookings` (POST), `/api/bookings/mybookings` (GET)
