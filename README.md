# 📚 BookNook – A Small Online Library

**Live site:** https://your-booknook.vercel.app  
**Server repository:** https://github.com/your-username/booknook-server

BookNook is a small online library. Add a book, borrow a book, return a book.
Readers can browse every book, share their own books, borrow a book for seven
days and return it when they are done.

## ✨ Features

- **Swiper slider and dynamic new arrivals** – a 3 slide banner and the latest 6 books loaded from MongoDB (newest first).
- **Add, edit and delete books** – book images are uploaded to imgbb, edits use a form with the old data filled in, and deletes use a confirm modal.
- **Borrow system** – borrow a book from a modal, see all your borrows in a table and return a book with one click.
- **Available copies** – every book has total copies; borrowing uses `$inc` to reduce copies, returning gives the copy back, and a book with 0 copies shows **Not Available**.
- **No double borrow** – the same user cannot borrow the same book twice at the same time.
- **Secure authentication** – BetterAuth with the MongoDB adapter, email/password and Google login, password validation, and JWT protected API routes.
- **Private routes** – logged out users are sent to Login and come back to the page they wanted; reloading a private route keeps you logged in.
- **Dark / light theme and animations** – a theme button in the navbar and smooth Framer Motion animations.
- **Fully responsive** – works on mobile, tablet and desktop with equal height cards, loading spinners and a custom 404 page.

## 🛠️ Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| UI | shadcn/ui (base-ui), Tailwind CSS v4, Lucide icons |
| Authentication | BetterAuth + MongoDB adapter + JWT plugin |
| Slider and animation | Swiper.js, Framer Motion |
| Notifications | react-hot-toast |
| Image upload | imgbb |
| Backend | Express.js + MongoDB (separate repository) |

## 📁 Routes

| Route | Access | Description |
|---|---|---|
| `/` | public | Banner, new arrivals, how borrowing works, top categories |
| `/books` | public | All books (with category filter) |
| `/books/:id` | private | Book details and borrow modal |
| `/add-book` | private | Add a new book |
| `/my-books` | private | Edit and delete your books |
| `/my-borrows` | private | Your borrowed books and return button |
| `/profile` | private | Your profile |
| `/login`, `/register` | public | Authentication |

## 🚀 Run Locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Start the
[server](https://github.com/your-username/booknook-server) too, so books can be loaded.

### Environment variables

```env
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_IMGBB_API_KEY=
```

For Google login add `<BETTER_AUTH_URL>/api/auth/callback/google` as an
authorized redirect URI in the Google Cloud console.
