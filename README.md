# CRUD de Usuarios - Node.js, Express y MongoDB

## Descripción

Este proyecto fue desarrollado con **Node.js**, **Express** y **MongoDB** que permite realizar operaciones CRUD sobre una colección de usuarios. Incluye pruebas unitarias con **Jest** para garantizar el correcto funcionamiento de las operaciones principales.

---

## Instalación

1. **Clona el repositorio:**
    ```bash
      git clone https://github.com/edwinmghdez/mongodb-crud-users

      cd mongodb-crud-users
    ```

2. **Instala las dependencias:**
    ```bash
      npm install
    ```

3. **Configura las variables de entorno:**
    ```bash
      cp .env.example .env
    ```
  - Copia el archivo `.env.example` a `.env` y ajusta los valores según tu entorno.

4. **Ejecutar:**
    #### **Local:**
      ```bash
        npm run start
      ```

    #### **Docker:**
      ```bash
        # Ejecutar contenedores (solo la primera vez)
        docker compose up --build

        # Ejecutar contenedores
        docker compose up
      ```

- En cualquiera de los dos casos la API estará disponible en `http://localhost:3000` (o el puerto configurado).

---

## Tests

**Para ejecutar las pruebas:**
  #### **Local:**
  ```bash
    npm run test
  ```

  #### **Docker:**
  ```bash
    docker exec -it mongodb-crud-users-backend-1 /bin/bash

    npm run test
  ```

---

## Endpoints

| Método | Endpoint         | Descripción                |
|--------|------------------|----------------------------|
| GET    | /api/v1/users       | Listar todos los usuarios  |
| GET    | /api/v1/users/:id   | Obtener usuario por ID     |
| POST   | /api/v1/users       | Crear un nuevo usuario     |
| PUT    | /api/v1/users/:id   | Actualizar usuario por ID  |
| DELETE | /api/v1/users/:id   | Eliminar usuario por ID    |

Puedes encontrar un ejemplo más detallado en la documentación interactiva disponible en:

- http://localhost:3000/api/docs

---

## Decisiones de Diseño

Se optó por usar Service-Repository Pattern ya que de esta manera podemos separar la lógica de negocios de la lógica de base de datos, así como también si en algún momento se piensa cambiar a otro proveedor de base de datos solo se vería afectado el repository.

Por otra parte, todo el tema de validaciones se maneja en varios directorios:
  - `middlewares/errorHandler.js`:
    - Detecta cualquier excepción en la aplicación y define la estructura de los errores.

  - `middlewares/validateMiddleware.js`:
    - Permite validar los requests de las rutas que deseemos.

  - `validations/createUserValidation.js`:
    - Reglas de validación para la creación de usuarios (campos requeridos, caracteres mínimos, etc.).

  - `validations/updateUserValidation.js`:
    - Reglas de validación para actualizar usuarios.

  - `exceptions/customException.js`:
    - Excepción personalizada que permite definir mensaje y status del error.
