# This is the design document for implement a calculator application

The goal of this design document is to outline the implementation of a calculator software.

## Architecture Level:
The calculator software will be designed using a modular architecture that will allow for easy maintenance and scalability. The software will be broken down into two primary modules: the user interface and the arithmetic module.

## User Interface:
The user interface will be designed to be intuitive and user-friendly. It will be a graphical user interface (GUI) that allows users to input numbers and select mathematical operations. The GUI will consist of a display area, input fields for numbers, and buttons for mathematical operations. The display area will show the result of the mathematical operation.

## Arithmetic Module:
The arithmetic operations module will handle the actual mathematical operations. It will be responsible for performing addition, subtraction, multiplication, and division. It will also be responsible for handling the order of operations and dealing with negative numbers.

## Auxiliary Information
- Data Structure:
    1. Stack: The stack data structure can be used to handle the order of operations. The stack will store the numbers and mathematical operations in the order they are entered.
    2. Queue: The queue data structure can be used to store and retrieve input from the user.
- Input Validation: The calculator software will validate user input to prevent errors and ensure that the input is within the range of valid values. The software will check that the input is a valid number, that the mathematical operation selected is valid, and that the input does not result in division by zero.

## Requirement Check List

1. [x] The calculator should have a browser-based user interface (ie it can be opened using a web browser)
2. [x] The calculator should have a number pad with digits 0-9 and decimal point.
3. [x] The calculator should have buttons for addition, subtraction, multiplication, and division.
4. [x] The calculator should have a display that shows the input and the result of the calculation.
5. [] The calculator should follow the order of operations (PEMDAS).
6. [] The calculator should have a way to sign up with a username and password
7. [] The calculator should have a way to log in with username and password
8. [x] The calculator should be usable with or without authentication
9. [] The calculator should have a navigation bar or panel which displays the user’s authentication status
10. [] The calculator should have the following features
    - [] Memory functions (M+, M-, MR, MC)
    - [x] Percentage function (%)
    - [x] Square root function (√)
    - [x] Exponential function (^)
    - [] History function
