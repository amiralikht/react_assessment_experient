# React Developer Assessment

A simple React application that provides an auto-complete search input to display the selected user's name and address. The app fetches data from the JSONPlaceholder API and uses Material UI's Autocomplete component.

# Features

- Fetch API: Retrieves users from https://jsonplaceholder.typicode.com/users.

- Material UI Autocomplete: Provides a user-friendly search interface.

- Name Formatting: Displays user names as {Last Name} {Suffix}, {First Name} (Title) sorted alphabetically by last name.

- Address Display: Shows the selected user's address.

## Prerequisites

- Node.js: Version 18 or newer (Node 20 LTS recommended).

- npm (comes with Node.js).

# Local Development

```js
// 1. Clone the repository
git clone 'https://github.com/amiralikht/react_assessment_experient.git'
cd react_assessment_experient

// 2. Install dependencies
npm install

// 3. Start the development server
npm run dev
```
Visit http://localhost:5173/ in your browser.

# Building for Production
```js
npm run build
```
# Notes

- No environment variables or additional configuration are required.
