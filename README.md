# Pasos para levantar el proyecto en modo de desarrollo

- Instalar todas las dependencias

```bash
npm install
```

- Renombrar el archivo `.vars_template` a `.env` y completar las variables de entorno

- Levantar la base de datos local, por medio de docker

```bash
docker compose up -d
```

- mover archivo seed de las propiedades, hacia el contenedor de docker donde se aloja la BD para poder cargar la data inicial

```bash
docker cp ./data/properties2.json shadow-properties-db:/data/properties2.json

```

- Cargar la data inicial de las propiedades en la base de datos de mongo, es importante asegurarse que el archivo `properties2.json` se encuentre en el contenedor de docker ya copiado y colocarle las credenciales para poder conectarse a la base de datos y cargar correctamente la data apuntando a la coleccion `properties`

```bash
docker exec -i shadow-properties-db mongoimport --db shadowproperties --collection properties --jsonArray --file ./data/properties2.json  -u koso -p 123456 --authenticationDatabase admin
```

- Levantar el proyecto de next

```bash
npm run dev

```
