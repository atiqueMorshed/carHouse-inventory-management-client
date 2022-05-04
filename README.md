# carHouse - Car Inventory Management

> [frontend](https://carhouse-warehouse-management.web.app/)
> or https://carhouse-warehouse-management.web.app/
>
> [backend](https://carhouse-backend.herokuapp.com/)
> or https://carhouse-backend.herokuapp.com/

## Features

- Dynamically loads home page slider informations.
- When adding a new car, you can select whether to use it in the homepage slider.
- Users can login and register with their email or use Google or Facebook login system.
- addCar route is kept private and is authorized with JWT, so when an unauthorized user tries to access it, s/he will be redirected to the login page if he is not logged in or does not have correct jwt. After login, user is automatically redirected to the addCar page.
- Header shows currently active link.
- Fully responsive site that allows a user to browse from any device.

## Technologies used

### Front End

- react
- react-router-dom
- react-query
- react-helmet-async
- react-error-boundary
- axios
- firebase
- react-firebase-hooks
- react-hook-form
- tailwind
- react-toastify
- swiper

### Back End

- express
- mongodb
- jsonwebtoken
- cors
- dotenv
