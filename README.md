# Biblioteca de libros

[![CI](https://github.com/jgarciacutillas/practicas-continuas-26-27/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/jgarciacutillas/practicas-continuas-26-27/actions/workflows/ci.yml)

API REST sencilla de una biblioteca, construida con Spring Boot 3, Java 21, Spring Data JPA, Hibernate y PostgreSQL. El proyecto está diseñado para cumplir los requisitos de una aplicación no trivial sin introducir complejidad innecesaria.

## Requisitos

- Java 21
- Maven 3.9+

## Arquitectura

La aplicación está separada en capas:

- `controller`: endpoints REST.
- `service`: reglas de negocio.
- `repository`: persistencia con Spring Data JPA.
- `dto` y `mapper`: entrada/salida y transformación.
- `exception`: errores y manejo centralizado.

## Dominio

Cada libro tiene varios atributos: título, autor, género, ISBN, año de publicación y número de páginas.

Validaciones de entrada:

- título y autor obligatorios;
- género obligatorio;
- ISBN opcional, pero si se informa debe tener 10 o 13 dígitos;
- año entre 1450 y 2100;
- páginas entre 1 y 10000.

Reglas de negocio adicionales:

- no se permite repetir un ISBN;
- no se permite un año de publicación futuro;
- al actualizar, un ISBN que pertenece al mismo libro sigue siendo válido;
- un libro inexistente provoca `404 NOT_FOUND`.

## CRUD

- `POST /api/books`
- `GET /api/books`
- `GET /api/books/{id}`
- `PUT /api/books/{id}`
- `DELETE /api/books/{id}`

## Errores

`GlobalExceptionHandler` centraliza los errores. Un recurso inexistente devuelve HTTP 404; datos inválidos devuelven 400 y un ISBN duplicado devuelve 409.

## Tests unitarios

La suite contiene 15 tests unitarios en total:

- reglas de negocio del servicio: ISBN duplicado al crear, año futuro, ISBN duplicado al actualizar, mismo ISBN permitido al actualizar, recurso inexistente en lectura, actualización y borrado, y borrado correcto;
- manejo centralizado de errores: 404 para libro inexistente y 400 para una regla de negocio inválida;
- validaciones de DTO: título obligatorio, ISBN con 10/13 dígitos, páginas positivas y año mínimo.

La suite mantiene los tests unitarios y un test de repositorio con `@DataJpaTest`. Este último usa H2 únicamente en test para no requerir un PostgreSQL externo durante `mvn test`; la aplicación en ejecución utiliza exclusivamente PostgreSQL.

## Empaquetado ejecutable

El proyecto usa `spring-boot-maven-plugin`, que genera un JAR ejecutable con las dependencias incluidas.

```bash
mvn clean package
java -jar target/book-library.jar
```

La aplicación utiliza PostgreSQL como base de datos persistente. La conexión se configura mediante `DB_URL`, `DB_USERNAME` y `DB_PASSWORD`, con estos valores por defecto para desarrollo local:

```text
DB_URL=jdbc:postgresql://localhost:5432/librarydb
DB_USERNAME=library
DB_PASSWORD=library
```

Hibernate mantiene el esquema actualizado mediante `spring.jpa.hibernate.ddl-auto=update`.

La ampliación añade 5 tests unitarios al conjunto existente.

## Búsqueda avanzada

Además del CRUD existente, la API incorpora un endpoint de búsqueda paginada:

- `GET /api/books/search`
- filtros opcionales: `keyword`, `author`, `genre`, `minYear`, `maxYear` y `available` (`true` devuelve los libros con ejemplares disponibles y `false` los que no tienen ninguno);
- paginación mediante `page` y `size` solamente 100 resultados por página (máximo);
- ordenación mediante `sort`, por ejemplo `title,asc`, `author,desc` o `publishedYear,desc`.

Los filtros de texto no distinguen entre mayúsculas y minúsculas y se pueden combinar. El servicio valida el rango de años, el tamaño de página y los campos de ordenación permitidos antes de consultar el repositorio.

La respuesta de búsqueda usa un DTO propio para mantener estable el contrato JSON y no exponer directamente la estructura interna de `PageImpl` de Spring Data.

## Hooks

Para que lance el hook de formateo automático debes ejecutar el siguiente comando:
```bash
git config core.hooksPath .githooks
```

## Ejecución con Docker

La aplicación puede ejecutarse mediante Docker, utilizando contenedores para la API REST y PostgreSQL. De esta forma, se simplifica la configuración del entorno y se evita instalar las dependencias de la aplicación directamente en el sistema anfitrión.

### Requisitos previos

- Docker Desktop.
- Docker Compose v2.

### Arranque de la aplicación

Desde la raíz del proyecto, ejecutar:

```bash
docker compose up --build -d
```

Este comando construye la imagen de la aplicación, si es necesario, y arranca los servicios definidos en la configuración de Docker Compose.

El nombre `app` debe coincidir con el nombre del servicio de la aplicación definido en el archivo Compose.

### Acceso a la API

Una vez iniciados los servicios, para comprobar que la API se arrancó correctamente, utilizamos la siguiente URL:

```text
http://localhost:8080/actuator/health
```
En caso de que se encuentre iniciado correctamente, devolverá la siguiente respuesta:
```text
{
    "status": "UP"
}
```

La base de datos PostgreSQL se configura mediante las variables de entorno `DB_URL`, `DB_USERNAME` y `DB_PASSWORD`.

Los datos de PostgreSQL se almacenan en un volumen persistente, de modo que no se pierden al detener y volver a iniciar los contenedores.

Finalmente para probar la API con todas las funcionalidad CRUD, debemos usar la siguiente URL:
`http://localhost:8080/api/books`

### Detener la aplicación

Para detener los servicios:

```bash
docker compose down
```

Este comando detiene y elimina los contenedores, pero conserva los volúmenes persistentes. Para eliminar también los volúmenes y los datos almacenados en ellos:

```bash
docker compose down -v
```

**Advertencia:** el último comando elimina los datos persistidos de los volúmenes asociados al proyecto.

## Desarrollo con DevContainer

El proyecto puede desarrollarse desde un DevContainer, proporcionando un entorno de desarrollo preconfigurado y reproducible.

### Requisitos previos

- Docker Desktop, o un entorno compatible con Docker.
- Visual Studio Code.
- La extensión Dev Containers de Visual Studio Code.

### Apertura del entorno

1. Clonar el repositorio y abrir la carpeta del proyecto en Visual Studio Code.
2. Abrir la paleta de comandos con `Ctrl + Shift + P`.
3. Seleccionar `Dev Containers: Reopen in Container`.
4. Esperar a que se construya y se inicie el entorno de desarrollo.

La configuración del DevContainer debe proporcionar las herramientas necesarias para desarrollar la aplicación, incluyendo Java 21 y Maven 3.9 o superior. Si PostgreSQL se ejecuta como un servicio independiente de Docker Compose, también debe configurarse la conectividad entre ambos servicios.

### Ejecución y pruebas

Una vez dentro del entorno de desarrollo, realizamos el comando para construir el contenedor de nuestra aplicación.
```bash
docker compose up --build
```
Y tras esto, podemos probar su correcto funcionamiento probando su acceso mediante el navegador web de nuestra preferencia sobre la siguiente URL.
```text
http://localhost:8080/actuator/health
```
Que en caso de que nuestra API se encuentre funcionando correctamente, nos devuelve la siguiente respuesta.
```text
{
    "status": "UP"
}
```
Por lo que ya podemos probar todas sus funcionalidades CRUD con la URL `http://localhost:8080/api/books`.

### Cierre del entorno

Para cerrar el entorno, salir del contenedor desde Visual Studio Code. Los comandos de ciclo de vida de los contenedores y de PostgreSQL dependerán de la configuración de Docker Compose utilizada por el proyecto.

## Configuración de desarrollo

La aplicación utiliza las siguientes variables de entorno para conectarse a PostgreSQL:

| Variable | Valor predeterminado de ejemplo |
|---|---|
| `POSTGRES_DB` | `tareas` |
| `POSTGRES_USER` | `app` |
| `POSTGRES_PASSWORD` | `cambia_esto` |

Los valores predeterminados están destinados al desarrollo local, para ello habrá que crear un archivo `.env` usando el fichero `.env.example` cambiando los valores que aparecen de ejemplo por los valores reales que se vayan a usar para las pruebas en el desarrollo. En otros entornos, deben configurarse las credenciales correspondientes y evitar almacenar contraseñas reales en el repositorio.