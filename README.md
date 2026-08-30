🧠 Jotion – Notion Clone

A full-stack Notion-style productivity application built with modern web technologies. Users can create, edit, organize, search, and manage documents with a clean and responsive interface.

🚀 Features
📄 Create, edit, and organize documents
🗂️ Nested document structure (like Notion)
📝 Rich text editor for creating and editing notes
🔍 Search and quick access to documents
👁️ Document preview functionality
⚡ Real-time updates using Convex
🔐 Authentication with Clerk
🖼️ Upload, change, and remove cover images
🎨 Clean and responsive UI
🌙 Light/Dark mode support
✨ Document Management
Create new documents
Edit document titles and content
Organize documents in a nested structure
Archive and restore documents
Search documents quickly
Preview documents using dynamic routes
🛠️ Tech Stack
Frontend: Next.js (App Router), React, Tailwind CSS
Backend & Database: Convex
Authentication: Clerk
UI Components: Shadcn/UI
Editor: BlockNote
Language: TypeScript
⚙️ Getting Started
1. Clone the repository
git clone https://github.com/preetika260606/notes-chat-app.git
cd notes-chat-app
2. Install dependencies
npm install
3. Configure environment variables

Create a .env.local file in the root directory and add your required environment variables.

Example:

NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

⚠️ Never commit .env.local or secret keys to GitHub.

4. Start Convex

Open a separate terminal:

npx convex dev
5. Start the development server
npm run dev

Open the application in your browser:

http://localhost:3000
📁 Project Highlights
Built using the Next.js App Router architecture
Real-time document updates with Convex
Secure user authentication with Clerk
Dynamic document routes using document IDs
Responsive design for a smooth user experience
Document preview functionality
Light and Dark mode support
