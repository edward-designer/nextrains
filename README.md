# Nextrains 2.0 - Real-time UK Train Schedule App

![Nextrains App](nextrains.jpg)

## Why Another UK Train App?

I find catching and changing trains in UK is quite a daunting task as trains are often _late or cancelled_, meaning the connecting trains are often not the planned ones. Using the apps by train companies often would require _a lot of tapping, searching and updating_. That's what the Nextrains app tries to solve by providing all the essential information on a single page.

## Features

- **Get the real-time train info fast between two train stations (for up to two hours from now)**
  - departure platforms are highlighted
  - count-down timer to train arrival
  - destination alighting platform number
  - a tag to indicate the fastest train to arrival at destination
  - auto refresh the train info every 60 seconds and when the tab (inactive) becomes active again
- **Optionally add up to 4 exchange stations**
  - by selecting a train in the first leg, the connecting trains will be shown with the available time for changing trains
  - direct trains between the from station to the final destination is highlighted with a tag
- **URL Shortcuts**
  - by entering the URL in the format of _/[from]/[change (optional)]/[destination]_, the corresponding train info will be shown
- **Save Train Routes**
  - train routes can be saved for fast retrieval
  - drag and drop to reorder the saved list (new routes will be added to the top by default)
- Real-time notices for delay/cancellation are shown whenever available
- Localstorage to store saved routes
- A reverse button for fast retrieving return information
- Light/Dark theme

## Note on version 2.0

This is a complete rewrite of the previous version[https://github.com/edward-designer/nextrain] which incorporate the following features:

- Separation of presentation (pure functional components) and logic whenever possible
- Enhance the performance of the app by eliminating unnecessary re-rendering through composition, sparation of context and memoisation
- Use Context to reduce props drilling
- Unit, integration (Vitest, React Testing Library, Jest) and E2E (Cypress) testing 
- Runs on Vite for a much faster development performance
- Deployed to Netlify which makes use of Lambda functions for backend service
- Replaced the React TimeAgo library with custom functions

## Todo

- Suggest nearest stations through Geolocation API

## Tech Stacks

### Front-end

- React (with ViteJS, as this app displays real-time information in a SPA, no server-side rendering or SEO info is required)
- Typescript - for type-checking to reduce bugs
- TailwindCSS - as this app is rather simple, TailwindCSS allows fast styling without the overhead of extra css files
- MUI
- React Router
- Vitest/Jest/React Testing Library for unit and integration testing
- Cypress for E2E testing
- Figma - for logo and UI design

### Back-end

A simple node server is created to retrieve information from the source API by supplying the API secret key from the server instead of the client side.

- Node.js
- Express
- Amazom Lambda functions

### CI/CD

- A simple github action has been set up to perform automatic testing before merging into the main branch.
- Connected to Netlify for automatical deployment upon commiting to github.

## Data Source

- UK trains real-time arrival and departure info is provided by [National Rail Enquiries](https://www.nationalrail.co.uk/100296.aspx)
