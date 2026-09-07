# Tide&Seak

Static frontend for Tide&Seak freight intelligence.

## Run locally

Open the project folder in VS Code, install the Live Server extension, then open `index.html` with Live Server.

## Deploy with GitHub Pages

1. Create a new GitHub repository.
2. Open a terminal in this folder.
3. Run:

   ```text
   git init
   git add .
   git commit -m "Initial Tide&Seak site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
   git push -u origin main
   ```

4. On GitHub, open **Settings > Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and `/ (root)`, then click **Save**.
7. Open the Pages URL shown by GitHub.

The site uses external Google Fonts, Unsplash images, Three.js, OrbitControls, and Earth textures, so the deployed site needs an internet connection for the full visual experience.

This is a static frontend. Login, contact, prediction, and simulation forms do not have a backend service yet.
