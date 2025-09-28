# EtCom - Ethiopia's E-commerce Platform

- This project is a full-stack e-commerce platform connecting Ethiopian farmers and local shops with customers. Users can browse products, view details, and shop securely. The project covers frontend (Next.js), backend APIs, and database design.

## 🌐 Live Demo

- 🔗 [Frontend Demo](https://et-com-ruby.vercel.app/)
- 🔗 [Demo Video]()

---

## 🧰 Tech Stack

### 🖥️ Frontend
- Next.js
- TypeScript
- Tailwind CSS

### 🗄️ Backend
- Node.js (API routes)
- (Planned: Django/MySQL)
- RESTful API

---

## 📂 Project Structure

### Frontend source code

/components  # Reusable UI components     
/app       # Next.js pages
/public      # Static assets (images, icons, etc.)
/styles      # Global styles

README.md      # Project documentation
package.json   # Dependency management
next.config.js # Next.js configuration
tailwind.config.js # Tailwind CSS configuration
tsconfig.json  # TypeScript configuration
postcss.config.js # PostCSS configuration
package-lock.json # Dependency lock file
.gitignore      # Git ignore file

### Backend source code

/app/api      # API routes (Next.js)
(data, interfaces, etc.)
- api source: fakestoreapi.com (for demo purposes)

---

## ⚙️ Installation & Setup

### 🔧 Prerequisites

- Node.js version 16+ installed locally.
- Text editor (e.g., VS Code) with TypeScript and TailwindCSS extensions.

### 💻 Frontend Setup

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🔐 Environment Variables

Add the following to your `.env` files if needed:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 🧪 Testing

```bash
# Run frontend tests
npm test
```

---

## Features

- Displaying paginated list of products 
- Filtering products by category
- API endpoints for products and categories
- Expanded product details
- Responsive design for mobile and desktop
- Additional feature:
    * Add to cart functionality
    * User authentication and profile management
    * Order history and tracking

---

## 🔑 Core Functionalities

EtCom enables core features essential to a marketplace platform.

---

### 1. 🔍 Search and Filtering
- Search by category
- Pagination for large result sets


## 🧱 Technical Requirements


### 2. 🔌 API Development
- RESTful APIs with proper HTTP methods and error responses

---

### 3. 🐞 Error Handling and Logging
- API error handling

---

## 🚀 Non-Functional Requirements

### 4. 📈 Scalability
- Modular architecture

---

## 📸 Screenshots

| Home Page                       | Categories Page                   |
| ------------------------------- | --------------------------------- |
| ![Home](./public/images/screenshots/home.jpg) | ![Categories](./public/images/screenshots/electronics.jpg) |

---

## 🛡️ License

This project is licensed under the [MIT License](./LICENSE).

---

## 👏 Contributing

Contributions are welcome! Please fork the repo and open a pull request.

```bash
https://github.com/Eyobed9/EtCom.git
git checkout -b feature/feature-name
```

---

## 📬 Contact

For questions, reach out at [eyobedteshome@gmail.com](mailto:eyobedteshome@gmail.com) or connect via [LinkedIn](https://www.linkedin.com/in/eyobed-d-249634230/).

---

## 🙏 Acknowledgments

* [Next.js](https://nextjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
