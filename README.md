# Delivery Fee Calculator Project
## Overview
This project is a delivery fee calculator implemented in TypeScript using React for the front end. It allows users to input various parameters such as cart value, delivery distance, number of items, and delivery date to calculate the delivery fee. The calculation takes into account different surcharges and fees based on the provided input.


## Project Structure
   - **src/components/DeliveryCalculationForm.tsx**: React component for the delivery fee calculation form.
   - **src/model/Orders.ts**: Model class representing an order with properties like cart value, delivery distance, number of items, and delivery date.
   - **src/service/DeliveryCalculator.ts**: Module containing functions for calculating different components of the delivery fee.
   - **src/test/DeliveryCalculator.test.ts**: Unit tests for the functions in the DeliveryCalculator module.


## How to Use


In the project directory, you can run:

### `npm install`
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

## Testing
To run unit tests, use the following command:
### `npm test`

This will execute the test suite and provide feedback on the functionality and correctness of the calculator's various components.
