npm i
copiar .env.example e fazer .env
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed