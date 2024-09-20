# Social Media API

This API provides basic functionalities for a social media platform, allowing users to register, log in, create posts, follow other users, and more.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL (using Sequelize)
- Bcrypt for password encryption
- Helmet for securing HTTP headers
- Morgan for HTTP request logging
- Dotenv for managing environment variables

## Live Links
- The api service is live on [https://social-media-api-3foh.onrender.com](https://social-media-api-3foh.onrender.com)

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Mukeshkumar1611/Social_Media_API.git
    cd Social_Media_API
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up your environment variables:**

    Create a `.env` file in the root directory and add the following:

    ```env
    DB_USER=your-database-username
    DB_HOST=localhost
    DB_NAME=your-database-name
    DB_PASSWORD=your-database-password
    DB_PORT=your-database-port
    PORT=7000
    ```


    Replace `your-database-username`, `your-database-name`, and `your-database-password` with your PostgreSQL credentials.


4. **Run the application:**


    ```bash
    nodemon start
    ```


    The API will be running at http://localhost:7000.


## Endpoints


### Users


#### Register a new user


- **Endpoint:**


    ```http
    POST /api/users/register
    ```


- **Request body:**


    ```json
    {
      "username": "your-username",
      "email": "your-email@example.com",
      "password": "your-password"
    }
    ```


#### Login


- **Endpoint:**


    ```http
    POST /api/users/login
    ```


- **Request body:**


    ```json
    {
      "email": "your-email@example.com",
      "password": "your-password"
    }
    ```


#### Update user information


- **Endpoint:**


    ```http
    PUT /api/users/:id
    ```


- **Request parameters:** `id` (User ID)


- **Request body:**


    ```json
    {
      // Include fields to update
    }
    ```


#### Delete user account


- **Endpoint:**


    ```http
    DELETE /api/users/:id
    ```


- **Request parameters:** `id` (User ID)


#### Get user information


- **Endpoint:**


    ```http
    GET /api/users/:id
    ```


- **Request parameters:** `id` (User ID)


#### Follow a user


- **Endpoint:**


    ```http
    PUT /api/users/:id/follow
    ```


- **Request parameters:** `id` (User ID)


- **Request body:**


    ```json
    {
      "userId": "user-to-follow-id"
    }
    ```


#### Unfollow a user


- **Endpoint:**


    ```http
    PUT /api/users/:id/unfollow
    ```


- **Request parameters:** `id` (User ID)


- **Request body:**


    ```json
    {
      "userId": "user-to-unfollow-id"
    }
    ```


### Posts


#### Create a new post


- **Endpoint:**


    ```http
    POST /api/posts
    ```


- **Request body:**


    ```json
    {
      "userId": "user-id",
      "desc": "Post description",
      "img": "image-url (optional)"
    }
    ```


#### Update a post


- **Endpoint:**


    ```http
    PUT /api/posts/:id
    ```


- **Request parameters:** `id` (Post ID)


- **Request body:**


    ```json
    {
      // Include fields to update
    }
    ```


#### Delete a post


- **Endpoint:**


    ```http
    DELETE /api/posts/:id
    ```


- **Request parameters:** `id` (Post ID)


#### Like/Dislike a post


- **Endpoint:**


    ```http
    PUT /api/posts/:id/like
    ```


- **Request parameters:** `id` (Post ID)


- **Request body:**


    ```json
    {
      "userId": "user-id"
    }
    ```


#### Get a post


- **Endpoint:**


    ```http
    GET /api/posts/:id
    ```


- **Request parameters:** `id` (Post ID)


#### Get timeline posts


- **Endpoint:**


    ```http
    GET /api/posts/timeline/all
    ```


- **Request body:**


    ```json
    {
      "userId": "user-id"
    }
    ```


## Contributing


Feel free to contribute to the project by opening issues or creating pull requests. Your feedback and contributions are welcome!