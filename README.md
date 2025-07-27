# Vibe Trail - Next.js & Firebase App Hosting

Welcome to Vibe Trail, a modern, immersive web application built with Next.js and ready to be deployed on Firebase App Hosting. This starter project features a futuristic, animated authentication interface and is set up with a best-practices structure for building scalable web apps.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [ShadCN UI](https://ui.shadcn.com/) for components.
- **AI/Generative:** [Genkit](https://firebase.google.com/docs/genkit) for integrating generative AI features.
- **Deployment:** Pre-configured for [Firebase App Hosting](https://firebase.google.com/docs/hosting).
- **Linting & Formatting:** TypeScript, ESLint.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Firebase CLI](https://firebase.google.com/docs/cli) (for deployment)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Firebase:**
    - Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
    - Find your web app's configuration object and copy the values into the placeholder object in `src/lib/firebase.ts`.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Runs the app in development mode with Turbopack.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts a production server.
- `npm run lint`: Lints the code using Next.js's built-in linter.
- `npm run typecheck`: Runs the TypeScript compiler to check for type errors.

## Deployment

This project is configured for easy deployment with **Firebase App Hosting**.

### Deploying from your Local Machine

1.  **Login to Firebase:**
    ```bash
    firebase login
    ```

2.  **Initialize Firebase (if you haven't already):**
    ```bash
    firebase init hosting
    ```
    When prompted, select "App Hosting" and follow the instructions to connect to your Firebase project.

3.  **Deploy your application:**
    ```bash
    firebase apphosting:backends:deploy
    ```
    The CLI will build and deploy your Next.js application, providing you with a live URL once it's complete.

### Continuous Deployment with GitHub

For an automated workflow, you can connect your GitHub repository to Firebase App Hosting in the Firebase Console. This will automatically build and deploy your application every time you push a change to your main branch.
