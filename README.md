# webmo-playlistapp
Playlist app for WebMo Module Leuphana University 

## Description

This application has two roles:

The admin can create, edit and delete playlists as well as add or remove songs to the playlists.
Additionally, the admin can create, edit and delete songs.

A further role is the listener, which can view playlists as well as songs and follow playlists.

Both user roles can see their profile with their own data.

## Software Stack

This application is built with following languages/frameworks:

- SQLite
- Express.js
- React
- node.js


## Installation

Install Node Packages for node.js (Backend)

``npm install``


Install Node Packages for React App (Frontend)

``cd frontend && npm install``



## Getting started

Run Backend Server

``npm start``


Run Frontend Server

``cd frontend && npm start``


## Usage

Open http://localhost:3000 in your browser

# Use cases

### Admin
- Change Language
- Login
- Register
- Create, View, Update, Delete Songs
- Create, View, Update Delete Playlists
- View Playlist Details
- Follow Songs
- View Profile
- Logout

### Listener
- Change Language
- Login
- Register
- View Songs
- View Playlists
- View Playlist Details
- Follow Songs
- View Profile
- Logout


# Default Accounts

#### Admin

Username: admin
Password: 1234

#### Listener

Username: listener
Password: 1234



# Folder Structure

Frontend

- Contains all frontend related stuff (React App)

database

- Contains the SQLite File
- Contains a SQL Dump

Routes
    
- Routes for the API
    
    authorization
    
    - The Middleware for checking if the user has the right permisions to access the API

models

- The different models of the backend and for the database ORM
