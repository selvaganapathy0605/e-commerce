
# EcomGrove

EcomGrove is a full-featured eCommerce application built using the MERN (MongoDB, Express.js, React, Node.js) stack. It provides a seamless shopping experience with features such as user authentication, product management, cart functionality, and payment processing. Additionally, Cloudinary is integrated for efficient media storage and management.

## Features

- **User Authentication**: Secure login and registration using JWT authentication.
- **Product Management**: Admin panel to add, update, and delete products.
- **Shopping Cart**: Users can add, remove, and update items in their cart.
- **Order Processing**: Users can place orders with secure payment gateways.
- **Cloudinary Integration**: Efficient image and media storage and retrieval.
- **Responsive UI**: Built with React for an intuitive and mobile-friendly experience.

## Tech Stack

- **Frontend**: React.js, Redux, Bootstrap
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Media Storage**: Cloudinary
- **Payment Gateway**: Stripe/PayPal

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ecomgrove.git
   cd ecomgrove
   ```
2. Install dependencies:
   ```sh
   npm install
   cd client && npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory and add the necessary credentials (MongoDB URI, Cloudinary API keys, etc.)

4. Start the development server:
   ```sh
   npm run dev
   ```

## Folder Structure
```
EcomGrove/
│── backend/       # Express server and database logic
│── client/        # React frontend
│── config/        # Configuration files (Cloudinary, JWT, etc.)
│── models/        # Database models
│── routes/        # API routes
│── controllers/   # Business logic controllers
│── middleware/    # Authentication and security middleware
│── public/        # Static files
│── .env           # Environment variables
│── package.json   # Node.js dependencies
```

## Contributions
Contributions are welcome! Feel free to fork this repository and submit pull requests.

## License
This project is licensed under the MIT License.

---
Developed with ❤️ by selvaganapathy0605

