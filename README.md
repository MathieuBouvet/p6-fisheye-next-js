This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Environment variables setup

Create `.env` file and 
- set the `DATABASE_URL` variable to your local database connection string
- set the `JWT_SECRET` variable to be able to sign jwt tokens

optional configuration :
- the `NEXT_PUBLIC_MEDIA_STORAGE_STRATEGY` controls how images and videos are stored. Supported strategies are `"fileSystem"` or `"imageKit"`. It defaults to `"fileSystem"`. If set to `"imageKit"` the environment variables starting with `IMAGE_KIT_` must be set
- `IMAGE_KIT_PUBLIC_KEY`
- `IMAGE_KIT_PRIVATE_KEY`
- `IMAGE_KIT_URL_ENDPOINT`


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



