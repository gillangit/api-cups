# 🖨️ CUPS API Wrapper

**CUPS API Wrapper** is a lightweight RESTful service that provides a convenient interface to interact with the **Common UNIX Printing System (CUPS)**. It allows external applications to list printers, submit print jobs, manage queues, and monitor print statuses through standard HTTP requests.


---

## 🎯 Purpose

This project aims to simplify integration with CUPS on UNIX-like systems (Linux/macOS) by offering a clean and accessible HTTP-based API, making it easier to integrate printers with web, mobile, or IoT applications.

---

## ✨ Features

- 📋 Retrieve available printers
- 🖨️ Submit print jobs (file or raw text)
- 🔎 Monitor print jobs and status
- ❌ Cancel queued or ongoing jobs
- ⚙️ (Optional) Manage printers (add/remove) — admin only

---

## 🧰 Technology Stack

- **Backend**: Python / Node.js
- **Print Server**: CUPS (Common UNIX Printing System)
- **Communication**: IPP over `localhost:631`
- **Auth (optional)**: Basic Auth or API Key

---

