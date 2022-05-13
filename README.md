This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Environment variables setup

Create `.env` file and set the `DATABASE_URL` variable to your local database connection string

### Install dependencies

Run 

```bash
yarn install
```

### Setup prisma

Generate the prisma client
```bash
npx prisma generate
```

Apply the migrations
```bash
npx prisma migrate dev
```
This will also seed the database

### Run the dev server

```bash
yarn dev
#or
npm run dev
```

And you're good to go 😀



