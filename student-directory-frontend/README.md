# Student Directory Frontend

<!-- banana -->

## Setup Instructions
1. Ensure your Lesson 5 backend is running on `http://localhost:3000`.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the frontend on `http://localhost:5173`.
4. Required environment variables for the backend: `MONGO_URI`, `JWT_SECRET`, `PORT=3000`.

## Reflection Questions

**1. Why do we store the token in localStorage? What is one security risk of doing so, and what is a more secure alternative?**
We store the token in `localStorage` so the user stays logged in even after refreshing the page or closing the browser tab, as it persists data across sessions. One major security risk is that `localStorage` is accessible via JavaScript, making it vulnerable to Cross-Site Scripting (XSS) attacks where a malicious script can steal the token. A more secure alternative is storing the token in an `HttpOnly` and `Secure` cookie, which cannot be accessed by client-side scripts, combined with CSRF protections.

**2. What is the purpose of the AuthContext? Why not just pass the token as a prop to each component?**
The `AuthContext` provides a global state for authentication, allowing any component in the app to access the `user`, `token`, and `login`/`logout` functions without prop drilling. Passing the token as a prop through multiple layers of components makes the code messy and hard to maintain. Context solves this by letting components subscribe to auth data directly.

**3. What happens on the frontend when the JWT expires? Describe the user experience you would want to implement.**
Currently, if the JWT expires, the backend returns a 401 Unauthorized error on the next API call. The frontend handles this by catching the error, logging the user out, and redirecting them to the `/login` page. A better user experience would be to decode the token on the frontend, detect the expiration time, and automatically refresh the token using a refresh token mechanism, or display a friendly message saying "Session expired, please log in again" before redirecting.

**4. What is the difference between the backend's requireAuth middleware and the frontend's ProtectedRoute component? Why do we need both?**
The backend's `requireAuth` middleware is the actual security layer; it verifies the JWT signature and prevents unauthorized data from being sent from the server. The frontend's `ProtectedRoute` is purely for User Experience (UX); it prevents unauthenticated users from seeing broken pages and redirects them to login. We need both because frontend checks can be easily bypassed by attackers (e.g., using API tools), so the backend must enforce security, while the frontend provides smooth navigation.