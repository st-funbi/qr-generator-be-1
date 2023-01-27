installPrisma:
	yarn add @prisma/client && yarn add prisma@latest

prismainit: 
	npx prisma init

compose:
	docker-compose up --build -d

migrate:
	npx prisma migrate dev --create-only 

applymigration:
	npx prisma db push

seeddb:
	npx prisma db seed
server:
	yarn start:dev