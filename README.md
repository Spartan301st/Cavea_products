# Cavea product app

## Available Scripts

In the backend directory, you can run:

### `npm start`

Runs the server + connects to the db

In the frontend directory, you can run:

### `npm start`

Runs the React client side app
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

In the frontend directory, you can run:

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## P.S. Don't forget to create your own:

- On backend dir:
  -- PostgreSQL DB, add a product table with fields for products id, location, name & price.
  -- PG_USER, PG_PASSWORD, PG_HOST, PG_PORT, PG_DATABASE, PORT
- On frontend dir:
  -- Modify urls for fetch requests in InputProd.tsx & ListProds.tsx
