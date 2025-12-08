ArtShop Portfolio Demo

A full-stack art gallery web application built with React and Supabase, designed for portfolio demonstration purposes.

⚠️ Demo Mode Active: Signup and password reset are disabled. Only a demo account exists.

This project runs in Demo Mode by default:

No real users can sign up or reset passwords.
Only one demo account is allowed.

Visitors can explore core functionalities without creating personal accounts.

Demo Account Credentials:

Email: demo@artshop.com
Password: demo1234


Disabled Features in Demo Mode:

Signup form
Password reset
Contact form submissions (email-based only)

Features:

Browse artworks by category
View featured art
Add to Favorites
Add items to Cart
View and manage Favorites & Cart
Responsive design for desktop and mobile

Demo Account:

Prefilled login with demo account
Demo user has access to all read/write features allowed for demo exploration
Signup is disabled to prevent new accounts

Data Privacy & GDPR Compliance:

No personal data from visitors is collected.
Only a single demo account exists.

Signup, password reset, and contact forms are non-functional or email-based only.

The site does not use cookies, tracking, analytics, or third-party profiling.

All operations comply with GDPR principles for portfolio/demo projects.

Environment Variables:

VITE_DEMO_MODE=true   # Enable demo mode (default)

When VITE_DEMO_MODE=true, Signup and Password Reset are disabled.

Database Security:

Supabase Row-Level Security (RLS) is implemented.
Users may only read/write their own data (Cart, Favorites).
Demo account is the only user in the database.
Artworks data is public for browsing purposes.


Login with demo credentials to explore the application

Purpose:

This project is a portfolio demonstration to showcase:

React front-end development

Supabase authentication & database management

RLS policies and secure CRUD operations

Full-stack application structure

Note: This project is not intended for production use.