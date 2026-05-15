# 📚 Library Management System

A simple and efficient Library Management System developed using C++ (backend) and HTML, CSS, JavaScript (frontend).

The system manages book records, availability, issuing, and returning of books using file handling, making it lightweight and syllabus-friendly.

## 🚀 Features

### Core Functionality

• Add new books with multiple copies
• View all books with availability status
• Search books using Book ID
• Issue books only if copies are available
• Return books and update availability

### Advanced Features

• Supports multiple copies per book
• Auto-updates issued and available count
• Simple fine calculation (optional)
• File-based request and storage system

## 🖥️ Frontend Features

• User-friendly interface built with HTML, CSS, and JavaScript
• Separate pages for:
◦ View Books
◦ Add Book
◦ Issue Book
◦ Return Book
• Tabular display of book records
• Clear availability indicators (Available / Fully Issued)
• Input validation and user feedback

## ⚙️ Backend Features

• Implemented in C++
• Uses file handling for permanent storage
• Modular logic for:
◦ Adding books
◦ Issuing books
◦ Returning books
• Easy to extend and maintain

## 📁 Project Folder Structure

Library-Management-System/ │ ├── backend/ │ └── main.cpp │ ├── frontend/ │ ├── index.html │ ├── style.css │ └── script.js │ ├── data/ │ └── books.txt │ └── README.md

## 🔗 Frontend–Backend Integration

• Backend handles logic and file storage.
• Frontend manages user input and display.
• Communication is done using file-based data exchange.
• Clear separation of responsibilities between frontend and backend.

## 📝 Data Format (books.txt)

Each book record is stored in the following format:
BookID|BookName|AuthorName|TotalCopies|IssuedCopies

### Example:

101|C++ Programming|Bjarne Stroustrup|5|2 102|Clean Code|Robert C. Martin|3|3

## 🎯 Technologies Used

• HTML
• CSS
• JavaScript
• C++
• File Handling
• Git & GitHub

## 🎤 Project Summary

The Library Management System efficiently manages multiple book copies, availability tracking, and issuing logic using C++ file handling with a user-friendly frontend interface.
