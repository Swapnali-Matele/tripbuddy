# TripBuddy – Travel Discovery Website

## Project Overview

TripBuddy is a travel discovery website built with React. It allows users to explore hotels, view hotel details, save favorite hotels, and discover travel-related blog posts.

## Features

- **Home Page:** Landing page with travel-related content and navigation.
- **Hotels:** Browse hotels by country and view hotel information.
- **Hotel Details:** View details for a selected hotel.
- **Favorites:** Save and remove favorite hotels.
- **Travel Blogs:** Browse blog posts and view individual blog details.
- **About Page:** Learn about TripBuddy and explore frequently asked questions.
- **Newsletter Validation:** Validate email input in the footer.
- **Responsive Design:** Navigation and layouts adapt to mobile, tablet, and desktop screens.
- **API Integration:** Fetch hotel data through a server-side proxy and retrieve blog posts from the blog API.

## Technologies Used

- React
- Vite
- Redux and React-Redux
- Redux Thunk
- React Router
- Tailwind CSS
- React Icons
- LiteAPI for hotel data
- DummyJSON for blog data
- Vitest and React Testing Library for testing

## Local Setup

### Prerequisites

- Node.js and npm
- A valid LiteAPI API key

### Installation

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/Swapnali-Matele/tripbuddy1
cd TripBuddy
npm install
```

### Environment Variables

Create a `.env` file in the project root. Add the environment variables required by the existing project configuration.

For the local server-side proxy, configure:

```env
LITEAPI_API_KEY=your_liteapi_api_key
```

Do not commit `.env` or expose your API key in frontend code.

### Run the Application

Start the local API proxy in one terminal:

```bash
node --env-file=.env server.mjs
```

Start the frontend in a second terminal:

```bash
npm run dev
```

Open the local URL displayed by Vite, usually `http://localhost:5173/`.

Keep both processes running while testing hotel functionality.

## Testing

Run the automated tests:

```bash
npm test
```

Create a production build:

```bash
npm run build
```

## Deployment

The project includes Vercel API routes intended to support the server-side hotel API proxy in production. Configure the required environment variables in the deployment platform before deploying.

**Live Website:** Add your verified Vercel URL after testing the deployed website.

## Author
Swapnali Matele
