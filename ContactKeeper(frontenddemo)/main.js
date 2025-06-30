const API_BASE = 'https://contactkeeper-ulq2.onrender.com/api'; // Replace with your Render backend URL


let tempOtp = "";
let otpVerified = false;

function sendOtp() {
  const email = document.getElementById("email").value;
  tempOtp = Math.floor(1000 + Math.random() * 9000).toString();

  // Call backend to send email with OTP
  fetch(`${API_BASE}/users/send-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp: tempOtp })
  })
  .then(res => res.json())
  .then(data => {
    alert("OTP sent to your email.");
  });
}

function getOtpValue() {
  return (
    document.getElementById('otp1').value +
    document.getElementById('otp2').value +
    document.getElementById('otp3').value +
    document.getElementById('otp4').value
  );
}


function verifyOtp() {
  const otp = getOtpValue(); // gets 4-digit OTP from inputs
  const email = document.getElementById("email").value;

  if (!otp || otp.length !== 4) {
    alert("Enter the full 4-digit OTP.");
    return;
  }

  if (otp === tempOtp) {
    alert("OTP verified successfully.");
    otpVerified = true;
  } else {
    alert("Incorrect OTP.");
  }
}


// USER AUTHENTICATION
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${API_BASE}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    console.log("Login response:", data);
    if (data.accessToken) {
      localStorage.setItem("token", data.accessToken);
      window.location.href = "dashboard.html";
    } else {
      alert("Login failed");
    }
  })
  .catch(err => {
    console.error("Fetch error:", err);
    alert("Network error during login.");
  });
}

function validateRegisterInputs(username, password) {

  const passwordPattern = /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=(?:.*\d){2,}).{6,}$/;

  if (username.trim().length < 5) return "Username must be at least 5 characters.";
  if (!passwordPattern.test(password)) {
    return "Password must have:\n- 1 uppercase\n- 1 special character\n- At least 2 digits\n- Minimum 6 characters";
  }
  return null;
}

function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value.trim();
  if (!username || !email || !password) {
    return alert("Please fill all fields.");
  }

  const validationError = validateRegisterInputs(username, password);
  if (validationError) return alert(validationError);
  if (!otpVerified) return alert("Please verify OTP before registering.");

  fetch(`${API_BASE}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data._id) {
      alert("Registration successful!");
      window.location.href = "index.html";
    } else {
      alert("Registration failed.");
    }
  });
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// CONTACT MANAGEMENT
function loadContacts() {
  fetch(`${API_BASE}/contacts`, {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
  })
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("contact-list");
    list.innerHTML = "";
    data.forEach(contact => {
      const item = document.createElement("li");
      item.innerHTML = `
        <strong>${contact.name}</strong> - ${contact.email} - ${contact.phone}
        <div style="margin-top: 6px;">
          <button onclick="editContact('${contact._id}')" style="margin-right: 8px;">✏️ Edit</button>
          <button onclick="deleteContact('${contact._id}')">🗑️ Delete</button>
        </div>
      `;
      list.appendChild(item);
    });
  });
}

function addContact() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  fetch(`${API_BASE}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
    body: JSON.stringify({ name, email, phone })
  })
  .then(res => res.json())
  .then(() => {
    alert("Contact added");
    window.location.href = "dashboard.html";
  });
}

function deleteContact(id) {
  if (confirm("Are you sure you want to delete this contact?")) {
    fetch(`${API_BASE}/contacts/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
    })
    .then(() => {
      alert("Contact deleted");
      loadContacts();
    });
  }
}

function editContact(id) {
  localStorage.setItem("editId", id);
  window.location.href = "edit-contact.html";
}

function loadEditForm() {
  const id = localStorage.getItem("editId");
  fetch(`${API_BASE}/contacts/${id}`, {
    headers: { 'Authorization': 'Bearer ' + localStorage.getItem("token") }
  })
  .then(res => res.json())
  .then(contact => {
    document.getElementById("name").value = contact.name;
    document.getElementById("email").value = contact.email;
    document.getElementById("phone").value = contact.phone;
  });
}

function updateContact() {
  const id = localStorage.getItem("editId");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  fetch(`${API_BASE}/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    },
    body: JSON.stringify({ name, email, phone })
  })
  .then(() => {
    alert("Contact updated");
    localStorage.removeItem("editId");
    window.location.href = "dashboard.html";
  });
}

// ROUTE TRIGGERS
if (window.location.pathname.endsWith("dashboard.html")) {
  loadContacts();
}
if (window.location.pathname.endsWith("edit-contact.html")) {
  loadEditForm();
}
