# 📚 BookNook

## Description

BookNook is a small online library. Readers can browse every book, add their own books, borrow a book for seven days and return it when they are done. All data is stored in MongoDB, and book images are uploaded to imgbb.

## Technologies Used

Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Better Auth, MongoDB, Express.js, JWT, Swiper.js, Framer Motion, react-hot-toast

## Key Features

1. **Swiper slider and new arrivals** – a 3 slide banner and the latest 6 books loaded from MongoDB (newest first).
2. **Add, edit and delete books** – images are uploaded to imgbb, edits open a form with the old data filled in, and deletes use a confirm modal.
3. **Borrow system** – borrow a book from a modal, see all your borrows in a table and return a book with one click.
4. **Available copies** – borrowing reduces the copies by 1, returning gives the copy back, and a book with 0 copies shows "Not Available".
5. **No double borrow** – the same user cannot borrow the same book twice at the same time.
6. **Authentication** – email/password and Google login with Better Auth, password validation, and toast messages for every action.
7. **JWT protected API** – private routes and server routes check the login token. Reloading a private page keeps you logged in.
8. **Dark / light theme and animations** – a theme button in the navbar and smooth Framer Motion animations.
9. **Fully responsive** – works on mobile, tablet and desktop with loading spinners and a custom 404 page.
