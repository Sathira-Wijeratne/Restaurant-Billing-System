# Restaurant Billing System

A modern, responsive web application for restaurant billing management. This system helps restaurant owners manage their menu items and track sales efficiently.

## 🍽️ Features

- **Menu Management**
  - Add new menu items with names and prices
  - Edit existing menu items
  - Delete menu items with confirmation
  - Real-time updates using Firebase

- **Sales Tracking**
  - View all sales transactions
  - Detailed view of each sale with items, quantities, and amounts
  - Total sales calculation
  - Real-time updates using Firebase

- **User Interface**
  - Clean, responsive design with Material UI
  - Consistent theme based on warm restaurant colors
  - Toast notifications for user feedback

## 🛠️ Technologies Used

### Frontend
- **React** - UI library for building the user interface
- **React Router** - For client-side routing between pages
- **Material UI** - Component library for consistent design
- **React Toastify** - For displaying notifications

### Backend
- **Firebase Firestore** - NoSQL database for storing menu items and sales data
- **Firebase Real-time Updates** - For instant data synchronization

## 📂 Project Structure

```
/frontend
  /public           # Static files
  /src
    /components     # React components
      /dialogs      # Modal dialog components
    /hooks          # Custom React hooks
    /theme          # Theme configuration
    /utils          # Utility functions
```

## ⚙️ Setup and Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Restaurant-Billing-System.git
   cd Restaurant-Billing-System
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project
   - Set up Firestore database
   - Update the Firebase configuration in `src/Firebase.js`

4. **Run the application**
   ```bash
   npm start
   ```

## 📱 Usage

### Menu Management
- Navigate to the home page to view all menu items
- Click "Add New Item" to add a new menu item
- Use the edit/delete buttons to modify or remove items

### Sales Tracking
- Click "View Sales" to see all sales transactions
- Click "Details" on any sale to view the specific items sold

## 🔒 Environment Variables

This project uses Firebase for backend services. You'll need to set up Firebase configuration in `src/Firebase.js`
