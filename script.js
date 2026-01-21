// ===== AUTHENTICATION =====
// Check if user is logged in on protected pages
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();
  const isLoginPage = currentPage === "index.html" || currentPage === "";
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  // Redirect to login if not authenticated
  if (!isLoginPage && !isLoggedIn) {
    window.location.href = "index.html";
  }

  // Redirect to dashboard if already logged in and on login page
  if (isLoginPage && isLoggedIn) {
    window.location.href = "dashboard.html";
  }
});

// ===== LOGIN FUNCTIONALITY =====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const loginAlert = document.getElementById("loginAlert");

    // Simple authentication (in real app, this would be handled by backend)
    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("username", username);
      window.location.href = "dashboard.html";
    } else {
      loginAlert.textContent = "Invalid username or password!";
      loginAlert.classList.add("show");

      setTimeout(() => {
        loginAlert.classList.remove("show");
      }, 3000);
    }
  });
}

// ===== LOGOUT FUNCTIONALITY =====
function logout() {
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("username");
  window.location.href = "index.html";
}

// ===== MOBILE MENU TOGGLE =====
function toggleMobileMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("mobile-active");
}

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.querySelector(".menu-toggle");

  if (sidebar && sidebar.classList.contains("mobile-active")) {
    if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
      sidebar.classList.remove("mobile-active");
    }
  }
});

// ===== FORM SUBMISSION HANDLERS =====

// Add Book Form
const addBookForm = document.getElementById("addBookForm");
if (addBookForm) {
  addBookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const bookId = document.getElementById("bookId").value;
    const bookName = document.getElementById("bookName").value;
    const authorName = document.getElementById("authorName").value;
    const totalCopies = document.getElementById("totalCopies").value;

    // Validation
    if (!bookId || !bookName || !authorName || !totalCopies) {
      showAlert("addBookAlert", "Please fill all fields!", "error");
      return;
    }

    // In real app, send data to backend via API
    console.log("Adding book:", { bookId, bookName, authorName, totalCopies });

    showAlert(
      "addBookAlert",
      `Book "${bookName}" added successfully!`,
      "success",
    );
    addBookForm.reset();
  });
}

// Add Student Form
const addStudentForm = document.getElementById("addStudentForm");
if (addStudentForm) {
  addStudentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const studentId = document.getElementById("studentId").value;
    const studentName = document.getElementById("studentName").value;
    const studentContact = document.getElementById("studentContact").value;
    const studentEmail = document.getElementById("studentEmail").value;
    const studentDept = document.getElementById("studentDept").value;
    const studentSem = document.getElementById("studentSem").value;

    // Validation
    if (
      !studentId ||
      !studentName ||
      !studentContact ||
      !studentEmail ||
      !studentDept ||
      !studentSem
    ) {
      showAlert("addStudentAlert", "Please fill all fields!", "error");
      return;
    }

    // Validate phone number (10 digits)
    if (!/^\d{10}$/.test(studentContact)) {
      showAlert(
        "addStudentAlert",
        "Contact number must be 10 digits!",
        "error",
      );
      return;
    }

    // In real app, send data to backend via API
    console.log("Adding student:", {
      studentId,
      studentName,
      studentContact,
      studentEmail,
      studentDept,
      studentSem,
    });

    showAlert(
      "addStudentAlert",
      `Student "${studentName}" registered successfully!`,
      "success",
    );
    addStudentForm.reset();
  });
}

// Issue Book Form
const issueBookForm = document.getElementById("issueBookForm");
if (issueBookForm) {
  // Set today's date as default issue date
  const issueDateInput = document.getElementById("issueDate");
  const dueDateInput = document.getElementById("dueDate");

  if (issueDateInput && dueDateInput) {
    const today = new Date();
    issueDateInput.valueAsDate = today;

    // Calculate due date (14 days from today)
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + 14);
    dueDateInput.valueAsDate = dueDate;

    // Update due date when issue date changes
    issueDateInput.addEventListener("change", function () {
      const selectedDate = new Date(this.value);
      const newDueDate = new Date(selectedDate);
      newDueDate.setDate(newDueDate.getDate() + 14);
      dueDateInput.valueAsDate = newDueDate;
    });
  }

  issueBookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const studentId = document.getElementById("issueStudentId").value;
    const bookId = document.getElementById("issueBookId").value;
    const issueDate = document.getElementById("issueDate").value;
    const dueDate = document.getElementById("dueDate").value;

    // In real app, send data to backend via API
    console.log("Issuing book:", { studentId, bookId, issueDate, dueDate });

    showAlert(
      "issueBookAlert",
      `Book ${bookId} issued to student ${studentId} successfully!`,
      "success",
    );
    issueBookForm.reset();

    // Reset dates
    const today = new Date();
    issueDateInput.valueAsDate = today;
    const newDueDate = new Date(today);
    newDueDate.setDate(newDueDate.getDate() + 14);
    dueDateInput.valueAsDate = newDueDate;
  });
}

// Return Book Form
const returnBookForm = document.getElementById("returnBookForm");
if (returnBookForm) {
  // Set today's date as default return date
  const returnDateInput = document.getElementById("returnDate");
  if (returnDateInput) {
    returnDateInput.valueAsDate = new Date();
  }

  returnBookForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const studentId = document.getElementById("returnStudentId").value;
    const bookId = document.getElementById("returnBookId").value;
    const returnDate = document.getElementById("returnDate").value;

    // In real app, calculate fine based on due date from backend
    // For demo, assume no fine
    console.log("Returning book:", { studentId, bookId, returnDate });

    showAlert(
      "returnBookAlert",
      `Book ${bookId} returned successfully! No fine applicable.`,
      "success",
    );
    returnBookForm.reset();
    returnDateInput.valueAsDate = new Date();
  });
}

// Next Available Date Form
const nextDateForm = document.getElementById("nextDateForm");
if (nextDateForm) {
  nextDateForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const bookId = document.getElementById("checkBookId").value;
    const resultDiv = document.getElementById("nextDateResult");
    const resultText = document.getElementById("nextDateText");

    // In real app, fetch from backend
    // For demo, show sample result
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 7);

    resultText.textContent = `Book ${bookId} will be available on ${nextDate.toLocaleDateString(
      "en-IN",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    )}`;

    resultDiv.style.display = "block";
  });
}

// Student Fines Form
const studentFinesForm = document.getElementById("studentFinesForm");
if (studentFinesForm) {
  studentFinesForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const studentId = document.getElementById("fineStudentId").value;
    const resultDiv = document.getElementById("studentFinesResult");
    const tbody = document.getElementById("studentFinesBody");
    const totalFine = document.getElementById("totalStudentFine");

    // In real app, fetch from backend
    // For demo, show sample data
    const sampleFines = [
      {
        bookId: "B003",
        bookName: "Computer Networks",
        daysOverdue: 3,
        fine: 30,
      },
      { bookId: "B007", bookName: "Web Development", daysOverdue: 7, fine: 70 },
    ];

    let total = 0;
    tbody.innerHTML = "";

    sampleFines.forEach((fine) => {
      total += fine.fine;
      const row = `
 <tr>
 <td>${fine.bookId}</td>
 <td>${fine.bookName}</td>
 <td>${fine.daysOverdue}</td>
 <td>₹${fine.fine}</td>
 </tr>
 `;
      tbody.innerHTML += row;
    });

    totalFine.textContent = `₹${total}`;
    resultDiv.style.display = "block";
  });
}

// Pay Fine Form
const payFineForm = document.getElementById("payFineForm");
if (payFineForm) {
  // Generate random receipt number
  const receiptInput = document.getElementById("receiptNumber");
  if (receiptInput) {
    receiptInput.value = "RCP" + Math.floor(Math.random() * 1000000);
  }

  payFineForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const studentId = document.getElementById("payStudentId").value;
    const amount = document.getElementById("payAmount").value;
    const paymentMethod = document.getElementById("paymentMethod").value;
    const receiptNumber = document.getElementById("receiptNumber").value;

    // In real app, process payment via backend
    console.log("Processing payment:", {
      studentId,
      amount,
      paymentMethod,
      receiptNumber,
    });

    showAlert(
      "payFineAlert",
      `Payment of ₹${amount} received successfully! Receipt: ${receiptNumber}`,
      "success",
    );
    payFineForm.reset();

    // Generate new receipt number
    receiptInput.value = "RCP" + Math.floor(Math.random() * 1000000);
  });
}

// ===== UTILITY FUNCTIONS =====

// Show alert message
function showAlert(alertId, message, type) {
  const alert = document.getElementById(alertId);
  if (alert) {
    alert.textContent = message;
    alert.className = "alert";
    alert.classList.add(type === "error" ? "alert-error" : "alert-success");
    alert.classList.add("show");

    setTimeout(() => {
      alert.classList.remove("show");
    }, 5000);
  }
}

// ===== LOAD SAMPLE DATA FOR DISPLAY PAGES =====

// This would normally fetch from backend via API
// For demo purposes, we're using static data

// Load books data (display-books.html)
if (document.getElementById("booksTableBody")) {
  // Sample data is already in HTML
  // In real app, fetch from backend and populate
}

// Load issued books data (issued-books.html)
if (document.getElementById("issuedBooksBody")) {
  // Sample data is already in HTML
  // In real app, fetch from backend and populate
}

// Load all fines data (all-fines.html)
if (document.getElementById("allFinesBody")) {
  // Sample data is already in HTML
  // In real app, fetch from backend and populate
}

// Update dashboard stats (dashboard.html)
if (document.getElementById("totalBooks")) {
  // In real app, fetch from backend
  // Sample stats are already in HTML
}

// ===== FILE HANDLING SIMULATION =====
// NOTE: In the real application, the C++ backend would:
// 1. Read from books.txt file
// 2. Parse data in format: BookID|BookName|AuthorName|TotalCopies|IssuedCopies
// 3. Calculate AvailableCopies = TotalCopies - IssuedCopies
// 4. Send data to frontend via API or file reading mechanism

// Example of how frontend would process books.txt data:
function parseBookData(fileContent) {
  const lines = fileContent.split("\n");
  const books = [];

  lines.forEach((line) => {
    if (line.trim()) {
      const [bookId, bookName, authorName, totalCopies, issuedCopies] =
        line.split("|");
      const available = parseInt(totalCopies) - parseInt(issuedCopies);
      const status = available > 0 ? "Available" : "Fully Issued";

      books.push({
        bookId,
        bookName,
        authorName,
        totalCopies: parseInt(totalCopies),
        issuedCopies: parseInt(issuedCopies),
        availableCopies: available,
        status,
      });
    }
  });

  return books;
}

// Example of displaying books in table
function displayBooks(books) {
  const tbody = document.getElementById("booksTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  books.forEach((book) => {
    const statusClass =
      book.status === "Available" ? "status-available" : "status-issued";
    const row = `
 <tr>
 <td>${book.bookId}</td>
 <td>${book.bookName}</td>
 <td>${book.authorName}</td>
 <td>${book.totalCopies}</td>
 <td>${book.issuedCopies}</td>
 <td>${book.availableCopies}</td>
 <td><span class="status-badge ${statusClass}">${book.status}</span></td>
 </tr>
 `;
    tbody.innerHTML += row;
  });
}

// ===== NOTES FOR VIVA =====
/*
EXPLANATION POINTS FOR VIVA:

1. AUTHENTICATION:
 - Simple session-based authentication using sessionStorage
 - Username: admin, Password: admin123
 - Redirects to login if not authenticated

2. FORM VALIDATION:
 - All forms validate input before submission
 - Required fields check
 - Phone number format validation (10 digits)
 - Email format validation (HTML5)

3. AUTO-CALCULATIONS:
 - Issue date: Auto-filled with today's date
 - Due date: Auto-calculated as issue date + 14 days
 - Fine calculation: ₹10 per day overdue (backend handles this)

4. FILE HANDLING:
 - Frontend expects data from books.txt via backend
 - Format: BookID|BookName|AuthorName|TotalCopies|IssuedCopies
 - Backend (C++) reads file and provides data to frontend

5. RESPONSIVE DESIGN:
 - Mobile-friendly sidebar (hamburger menu)
 - Grid layouts adapt to screen size
 - Touch-friendly buttons and forms

6. USER FEEDBACK:
 - Success/error alerts for all operations
 - Auto-hide after 5 seconds
 - Color-coded messages (green=success, red=error)

7. TECHNOLOGY STACK:
 - Pure HTML5, CSS3, vanilla JavaScript
 - No frameworks (easy to explain)
 - Modern CSS features (Grid, Flexbox, Gradients)
 - ES6 JavaScript (arrow functions, const/let, template literals)
*/
