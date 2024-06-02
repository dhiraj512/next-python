# next-python

First python project

# Contacts API

This is my first Python project, developed alongside a Next.js frontend application. This project demonstrates a simple contacts management API built using Flask, Flask_SQLAlchemy, and Flask_CORS. The API allows you to create, read, update, and delete contact information, complete with status validation and role assignments.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete contacts.
- **Status Validation**: Ensures contacts have valid status types (Customer, Personal, Employees, Office, Staff).
- **Field Management**: Includes additional fields like phone number, role, and company name.
- **CORS Support**: Enabled via Flask-CORS to allow cross-origin requests, useful for frontend integration.

## Technologies Used

- **Backend**: Flask, Flask_SQLAlchemy, Flask_CORS
- **Frontend**: Next.js (to be developed/integrated)

## Endpoints

- `GET /`: Retrieve all contacts.
- `GET /contact/{id}`: Retrieve a single contact by ID.
- `POST /contact`: Create a new contact.
- `PUT /contact/{id}`: Update an existing contact by ID.
- `DELETE /contact/{id}`: Delete a contact by ID.

## Run the backend

1. **Clone the repository**:

   ```sh
   git clone https://github.com/dhiraj512/next-python.git
   cd next-python/backend
   ```

2. **install dependencies**:

   ```sh
   pip install -r requirements.txt
   ```

3. **Run the application**:

   ```sh
   python main.py
   ```

4. **Test the API using Postman or any other API client**.

## Run the frontend

```sh
    cd next-python/frontend
    npm install
    npm run dev
```

## Contributing

Feel free to fork this project, make your changes, and submit a pull request. Any contributions to improve this project are welcome!