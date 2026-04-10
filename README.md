🔐 Digital Evidence Tracker (Node.js)

A lightweight forensic-inspired system to securely store and verify digital evidence using hash validation.

---

🚀 Features

- 📁 Upload digital evidence (files)
- 🔑 Generate SHA-256 hash for each file
- 🕒 Store timestamp and ownership details
- ✅ Verify file integrity (tamper detection)
- 📜 Maintain evidence history (chain of custody)

---

🧠 Concept

This project simulates a digital forensic system, ensuring that files are not altered after being stored by using cryptographic hashing.

---

🛠️ Tech Stack

- Node.js
- Express.js
- File System (fs)
- Crypto (SHA-256)
- JSON (for storage)

---

📂 Project Structure

evidence-tracker/
│── uploads/
│── data.json
│── app.js
│── README.md

---

⚙️ Installation

git clone https://github.com/your-username/evidence-tracker.git
cd evidence-tracker
npm install

---

▶️ Run the Project

node app.js

Server runs at:

http://localhost:3000

---

📌 API Endpoints

1. Upload Evidence

POST "/upload"

- Upload file using form-data
- Fields:
  - file
  - owner

---

2. Verify Evidence

POST "/verify"

- Upload file again
- System checks if it was modified

---

3. Get All Evidence

GET "/evidence"

- Returns all stored records

---

🔐 Example Output

{
  "fileName": "image.png",
  "hash": "a3f5c9...",
  "owner": "Gowtham",
  "timestamp": "2026-04-10T10:30:00Z"
}

---

💡 Future Improvements

- Add database (MongoDB)
- Add authentication
- Add QR code for evidence tracking
- Blockchain-based verification

---

📜 License

MIT License

---

👨‍💻 Author

Gowtham Sai# Smart-and-Small-Foreign-sick-
