# Boletín 1

## Resumen de commits

| # | Mensaje del commit | Qué se hizo | Autor | Enlace |
|---|--------------------|-------------|-------|--------|
| 1 | `chore: proyecto Maven inicial de la API de tareas`        | Se creó el proyecto inicial y el repositorio         | Javier García Cutillas   | [boletin1](https://github.com/jgarciacutillas/boletin1/commit/af32bfd1050c6300bec9be21120ec5e140bbe6bf) |
| 2 | `chore(editor): añade .editorconfig`        | Se creó el archivo `.editorconfig` para que todos los editores usen la misma identación        | Javier García Cutillas   | [boletin1](https://github.com/jgarciacutillas/boletin1/commit/9a1ffa65989e40e4296fba1420883372a23bfc64) |
| 3 | `feat(books): añadida búsqueda de libros con filtros` | Se añadió la funcionalidad de hacer búsquedas de libros con ciertos filtros | Javier García Cutillas   | [boletin1](https://github.com/jgarciacutillas/boletin1/commit/31d27a1333f56e28838351522bcee1d2b465ecfe) |
| 4 | `chore(build): añade Spotless para formateo automático` | Añadido el plugin **Spotless** para que el proyecto tenga un único estilo | Javier García Cutillas   | [boletin1](https://github.com/jgarciacutillas/boletin1/commit/e41853e6d3fa75a1121966bec4626e7db8c0cc84) |
| 5 | `chore(hooks): añade hook de pre-commit con Spotless` | Se creó el hook y se configuró Git para que lo utilizase | Javier García Cutillas   | [boletin1](https://github.com/jgarciacutillas/boletin1/commit/9e1b12d85b2b7fa30174264b60612366ce36acf5) |
| 6 | `chore: test para comprobar el formateo` | Comprobación del hook provocando una mala identación | Javier García Cutillas   | [boletin1](https://github.com/jgarciacutillas/boletin1/commit/4152630fb58f5bd819efa3037dcbb991b8a16902) |
| 7 | `docs: añadido al README.md el aviso del hook` | Modificación del `README.md` para avisar del nuevo hook | Javier García Cutillas   | [boletin1](https://github.com/jgarciacutillas/boletin1/commit/76704a15e30864ed03bba982a95e2487718c0b49) |
| 8 | `docs: explicación en búsqueda avanzada modificada` | En la rama `docs/actualizar-readme` se ha modificado el `README.md` para provocar un conflicto | Javier García Cutillas   | [boletin1](https://github.com/jgarciacutillas/boletin1/commit/0777c7efda6b2e3baa711ccb6e8abbf6911fa4ea) |
| 9 | `docs: explicación en búsqueda avanzada mejorada en README.md` | En la rama `docs/actualizar-doc` se ha modificado el `README.md` para provocar un conflicto | Javier García Cutillas   | [boletin1](https://github.com/jgarciacutillas/boletin1/commit/930e0173b130402c00bfbf7f3044cfc9d764dc5b) |
| 10 | `docs: actualizada explicación de búsqueda avanzada` | En la rama `main` se ha realizado el merge y se ha solucionado el conflicto | Javier García Cutillas   | [boletin1](https://github.com/jgarciacutillas/boletin1/commit/688532cc9d681e61311b9c894e7829c911bded41) |

## Detalle por commit

### 1. `chore: proyecto Maven inicial de la API de tareas`
- **Qué se hizo:** Se creó el proyecto inicial y el repositorio junto a los archivos `.gitignore` y `.gitattributes`.
- **Autor:** Javier García Cutillas.
- **Relación con el boletín:** Parte D (Control de versiones con Git).
- **Uso de IA:** ChatGPT.

#### Prompts
```
Genera un proyecto Maven con Spring Boot 3 y Java 21: una API REST de gestión de tareas (entidad Task con id, título, descripción, estado, prioridad y fecha límite). Usa Spring Data JPA con Hibernate para la persistencia y H2 en memoria como base de datos. Incluye endpoints CRUD, capa de servicio, repositorio JPA, validaciones con Bean Validation, manejo de errores con @RestControllerAdvice y tests unitarios con JUnit 5.

Requisitos mínimos de la aplicación para considerarse "no trivial":

Al menos una entidad de dominio con varios campos y validaciones.
Persistencia mediante Spring Data JPA/Hibernate.
Operaciones CRUD completas (crear, leer, actualizar, borrar).
Separación en capas (controlador / servicio / repositorio).
Manejo de errores centralizado: un recurso inexistente devuelve 404, no una traza de excepción.
Al menos 5 tests que comprueben reglas de negocio reales (p. ej. "no se puede crear una tarea con fecha límite pasada"), no simples assertNotNull.
No debe incluir tests de integración que levanten el contexto de la aplicación y/o una base de datos. Solo debe incluir tests unitarios.
El proyecto debe generar mediante mvn package un JAR ejecutable (fat JAR) que incluya todas las dependencias y pueda iniciarse mediante java -jar target/<nombre>.jar.

Solo necesito que me des el código del proyecto no que ejecutes ni nada de eso.
```

```
Necesito que modifiques la idea de gestión de tareas, por una biblioteca de libros sin mucha complejidad
```

### 2. `chore(editor): añade .editorconfig`
- **Qué se hizo:** Se creó el archivo `.editorconfig` para que todos los editores usen la misma identación.
- **Autor:** Javier García Cutillas.
- **Relación con el boletín:** Parte D (Control de versiones con Git).
- **Uso de IA:** No se ha usado.

### 3. `feat(books): añadida búsqueda de libros con filtros`
- **Qué se hizo:** Se añadió la funcionalidad de hacer búsquedas de libros con ciertos filtros.
- **Autor:** Javier García Cutillas.
- **Relación con el boletín:** Parte D (Control de versiones con Git).
- **Uso de IA:** ChatGPT.

#### Prompt

Con el proyecto adjuntado:

```
Quiero que leas el proyecto y me añadas, sin quitar nada, solamente añadir un cambio no trivial, es decir, algo que no sea añadir un atributo solamente
```

### 4. `chore(build): añade Spotless para formateo automático`
- **Qué se hizo:** Se añadió al `pom.xml` del proyecto el plugin **Spotless** para que el proyecto tenga un único estilo y que se compruebe automáticamente.
- **Autor:** Javier García Cutillas.
- **Relación con el boletín:** Parte E (Formateo automático en cada commit).
- **Uso de IA:** No se ha usado.

### 5. `chore(hooks): añade hook de pre-commit con Spotless`
- **Qué se hizo:** Se creó la carpeta de hooks y el hook para que se ejecute antes de realizar el commit. Además de configurar Git para que use esa carpeta de hooks. En este commit ya se comprueba que el hook funciona.
- **Autor:** Javier García Cutillas.
- **Relación con el boletín:** Parte E (Formateo automático en cada commit).
- **Uso de IA:** No se ha usado.

### 6. `chore: test para comprobar el formateo`
- **Qué se hizo:** Se comprueba que el hook de pre-commit funciona correctamente provocando una mala identación.
- **Autor:** Javier García Cutillas.
- **Relación con el boletín:** Parte E (Formateo automático en cada commit).
- **Uso de IA:** No se ha usado.

### 7. `docs: añadido al README.md el aviso del hook`
- **Qué se hizo:** Se modifica el `README.md` para avisar a otros compañeros que configuren el hook de pre-commit añadido.
- **Autor:** Javier García Cutillas.
- **Relación con el boletín:** Parte E (Formateo automático en cada commit).
- **Uso de IA:** No se ha usado.

### 8. `docs: explicación en búsqueda avanzada modificada`
- **Qué se hizo:** En la rama `docs/actualizar-readme` se ha modificado la línea 80 del `README.md` para provocar un conflicto con otra rama (`docs/actualizar-doc`).
- **Autor:** Javier García Cutillas.
- **Relación con el boletín:** Parte F (Provocar y resolver un conflicto).
- **Uso de IA:** No se ha usado.

### 9. `docs: explicación en búsqueda avanzada mejorada en README.md`
- **Qué se hizo:** En la rama `docs/actualizar-doc` se ha modificado la línea 80 del `README.md` para provocar un conflicto con otra rama (`docs/actualizar-readme`).
- **Autor:** Javier García Cutillas.
- **Relación con el boletín:** Parte F (Provocar y resolver un conflicto).
- **Uso de IA:** No se ha usado.

### 10. `docs: actualizada explicación de búsqueda avanzada`
- **Qué se hizo:** En la rama `main` se han realizado los merge de las 2 ramas anteriores y se ha producido un conflicto que se ha tenido que solucionar.
- **Autor:** Javier García Cutillas.
- **Relación con el boletín:** Parte F (Provocar y resolver un conflicto).
- **Uso de IA:** No se ha usado.

## Descripción narrativa de lo hecho en la sesión y relación con los commits

### Parte A (Instalación y verificación del **entorno**)
Inicialmente iba a utilizar en la asignatura JDK 25 y Spring Boot 4.1.1. Para evitar futuros problemas, he decidido mantener las versiones indicadas en la asignatura. He revisado que dispongo en mi dispositivo de Git, Java y Maven.

```bash
git --version
java -version
mvn -version
```

Posteriormente, he configurado mi identidad en Git, he añadido una política de pull segura para evitar merges automáticos y he establecido que la rama por defecto de los proyectos de Git se llame `main`.

```bash
git config --global user.name "Javier"
git config --global user.email "j.garciacutillas@um.es"
git config --global pull.ff only # evita merges automáticos sorpresa
git config --global init.defaultBranch main
```

### Parte B (Generar la aplicación con ayuda de IA)
Le he pedido a la IA que genere un API REST con Spring Boot y Maven de una biblioteca en la que se almacenan libros.

Existe una entidad (y repositorio) llamada `Book` con los atributos: `title`, `author`, `genre`, `isbn`, `publishedYear` y `pages`.

El servicio relacionado con la entidad anterior tiene las funciones para crear (`create`), buscar (`findById`), listar todos los libros (`findAll`), modificar (`update`) y borrar (`delete`). Estas devuelven un objeto `BookResponse` formado por los atributos de la entidad, un listado de estos objetos, o nada (en el caso del borrado).

El controlador expone los endpoints para gestionar los libros mencionados anteriormente en el servicio. Todos ellos devuelven el mismo formato que los servicios.

De la misma manera, en los endpoints (servicio y controlador) de crear y modificar se utiliza un objeto `BookRequest` con los parámetros necesarios para crear o modificar un libro, con algunas validaciones:

```java
@NotBlank(message = "El título es obligatorio")
@Size(max = 255, message = "El texto no puede superar los 255 caracteres")

@Pattern(regexp = "^(?:\d{10}|\d{13})$", message = "El ISBN debe tener 10 o 13 dígitos")
@Size(max = 20, message = "El ISBN no puede superar los 20 caracteres")

@Min(value = 1450, message = "El año de publicación debe ser 1450 o posterior")
@Max(value = 2100, message = "El año de publicación no puede superar 2100")
```
Existen excepciones para la creación de libros inválidos según las validaciones, libros duplicados y no encontrados.

Además, hay tests creados en la capa de servicio que realizan comprobaciones como duplicados de libros ya existentes según su ISBN, o la modificación de libros no existentes.

### Parte C (Construir y probar en local)
Inicialmente se borran los artefactos generados por otras compilaciones y se genera el paquete. Posteriormente, se ejecuta el `*.jar` generado.

```bash
mvn clean package # El JAR queda en target/*.jar
java -jar target/book-library.jar
```

#### Endpoints

##### Creación de libros

A continuación, se comprueba los diferentes endpoints del programa. El primer endpoint (`POST http://localhost:8080/api/books`) se encarga de la creación de dos libros:

```bash
curl -X POST "http://localhost:8080/api/books" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "El Quijote",
    "author": "Miguel de Cervantes",
    "genre": "Novela",
    "isbn": "9788420412146",
    "publishedYear": 1605,
    "pages": 863
  }'
```
```bash
curl -X POST "http://localhost:8080/api/books" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "El Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasía",
    "isbn": "9780261102217",
    "publishedYear": 1937,
    "pages": 310
  }'
```

Devuelve el objeto creado:
```json
{
  "id": 2,
  "title": "El Hobbit",
  "author": "J.R.R. Tolkien",
  "genre": "Fantasía",
  "isbn": "9780261102217",
  "publishedYear": 1937,
  "pages": 310
}
```

##### Obtener todos los libros
El endpoint para obtener todos los libros es `GET http://localhost:8080/api/books`

```bash
curl -X GET "http://localhost:8080/api/books"
```

Devuelve una lista con todos los libros:
```json
[
  {
    "id": 1,
    "title": "El Quijote",
    "author": "Miguel de Cervantes",
    "genre": "Novela",
    "isbn": "9788420412146",
    "publishedYear": 1605,
    "pages": 863
  },
  {
    "id": 2,
    "title": "El Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasía",
    "isbn": "9780261102217",
    "publishedYear": 1937,
    "pages": 310
  }
]
```

##### Obtener un libro por su identificador
El endpoint para obtener un libro es `GET http://localhost:8080/api/books/{id}`

```bash
curl -X GET "http://localhost:8080/api/books/1"
```

Devuelve los datos del libro buscado (según el identificador):
```json
{
    "id": 1,
    "title": "El Quijote",
    "author": "Miguel de Cervantes",
    "genre": "Novela",
    "isbn": "9788420412146",
    "publishedYear": 1605,
    "pages": 863
  }
```

##### Actualizar un libro existente (por identificador)
El endpoint para modificar un libro es `PUT http://localhost:8080/api/books/{id}`

```bash
curl -X PUT "http://localhost:8080/api/books/1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "El Quijote (revisado)",
    "author": "Miguel de Cervantes",
    "genre": "Novela",
    "isbn": "9788420412146",
    "publishedYear": 1615,
    "pages": 863
  }'
```

Devuelve los datos del libro modificado:
```json
{
  "id": 1,
  "title": "El Quijote (revisado)",
  "author": "Miguel de Cervantes",
  "genre": "Novela",
  "isbn": "9788420412146",
  "publishedYear": 1615,
  "pages": 863
}
```

##### Borrar un libro existente (por identificador)
El endpoint para borrar un libro es `DELETE http://localhost:8080/api/books/{id}`

```bash
curl -X DELETE "http://localhost:8080/api/books/1"
```

No devuelve nada

#### Gestión de errores
##### Libro no encontrado
Este error se produce cuando el libro no se encuentra en la base de datos se puede producir en varios endpoints que tengan que encontrar un objeto antes de actuar con él.

```bash
curl -X GET "http://localhost:8080/api/books/1"
```

Devuelve el error `BOOK_NOT_FOUND`:
```json
{
  "error": "BOOK_NOT_FOUND",
  "message": "Libro no encontrado con ID: 1",
  "timestamp": "2026-09-22T18:32:25.967809879"
}
```

##### Error de validación
Este error se produce cuando falla algunas de las validaciones que se han indicado anteriormente.

```bash
curl -X POST "http://localhost:8080/api/books" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "El Hobbit",
    "genre": "Fantasía",
    "isbn": "9780261102217",
    "publishedYear": 1937,
    "pages": 310
  }'
```

Devuelve el error `VALIDATION_ERROR`:
```json
{
  "error": "VALIDATION_ERROR",
  "message": "Los datos de entrada contienen errores de validación",
  "fieldErrors": {
    "author": "El autor es obligatorio"
  },
  "timestamp": "2026-09-22T18:43:15.302584229"
}
```

##### Libro duplicado (según el ISBN)
Este error se produce cuando ya existe un libro con el mismo ISBN que el que se está intentando crear.

```bash
curl -X POST "http://localhost:8080/api/books" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "El Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasía",
    "isbn": "9780261102217",
    "publishedYear": 1937,
    "pages": 310
  }'
```

Devuelve el error `DUPLICATE_BOOK`:
```json
{
  "error": "DUPLICATE_BOOK",
  "message": "Ya existe un libro con el ISBN: 9780261102217",
  "timestamp": "2026-09-22T18:48:11.812561419"
}
```

### Parte D (Control de versiones con Git)
En esta parte se inicializa el repositorio y se crea el `.gitignore`, `.gitattributes` (para normalizar los finales de línea entre distintos sistemas operativos) y `.editorconfig` (para que todos los editores usen la misma indentación), y se realizan los primeros commits:

```bash
git init
printf "target/\n*.class\n.idea/\n.env\n" > .gitignore

# .gitattributes: normaliza los finales de línea entre Windows, macOS y Linux
printf "* text=auto eol=lf\n*.jar binary\n" > .gitattributes

git add .
git commit -m "chore: proyecto Maven inicial de la API de tareas"
```

`.editorconfig`

```bash
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 4

[*.{yml,yaml,json}]
indent_size = 2
```

```bash
git add .editorconfig
git commit -m "chore(editor): añade .editorconfig"
```

#### Nueva funcionalidad
Se realiza una nueva funcionalidad en el proyecto en otra rama:

```bash
git switch -c feat/busqueda-libros
```

La funcionalidad añadida es la búsqueda de libros con diferentes filtros como el autor, el género, un rango de años o por palabras clave.

##### Buscar libros
El endpoint para buscar libros con filtros es `GET "http://localhost:8080/api/books/search?keyword={keyword}&author={author}&genre={genre}&minYear={minYear}&maxYear={maxYear}"`

```bash
curl -X GET "http://localhost:8080/api/books/search?keyword=el+h"
```

Devuelve una lista con todos los libros:
```json
{
  "content": [
    {
      "id": 2,
      "title": "El Hobbit",
      "author": "J.R.R. Tolkien",
      "genre": "Fantasía",
      "isbn": "9780261102217",
      "publishedYear": 1937,
      "pages": 310
    }
  ],
  "page": 0,
  "size": 20,
  "totalElements": 1,
  "totalPages": 1,
  "first": true,
  "last": true
}
```

Se realiza el commit de esta nueva funcionalidad:
```bash
git add .
git commit -m "feat(books): añadida búsqueda de libros con filtros"
```

Se fusionan la rama de funcionalidad en main:
```bash
git switch main
git merge feat/busqueda-libros
git log --oneline --graph --all
```

### Parte E (Formateo automático en cada commit)
#### Plugin (Spotless)
Se ha añadido **Spotless** al `pom.xml` para que el proyecto tenga un único estilo:
```java
<plugin>
  <groupId>com.diffplug.spotless</groupId>
  <artifactId>spotless-maven-plugin</artifactId>
  <version>2.43.0</version>
  <configuration>
    <java>
      <googleJavaFormat/>
      <removeUnusedImports/>
      <trimTrailingWhitespace/>
      <endWithNewline/>
    </java>
  </configuration>
</plugin>
```

Se realiza el commit del plugin (como `chore`)

```bash
git add pom.xml
git commit -m "chore(build): añade Spotless para formateo automático"
```

#### Hook, comprobación y aviso
Se crea el hook (versionado, para que otros compañeros dispongan de él)

```bash
mkdir -p .githooks
cat > .githooks/pre-commit <<'EOF'
#!/bin/sh
echo "Formatting with Spotless..."
mvn -q spotless:apply || exit 1
git add -u          # re-añade los archivos que Spotless haya reformateado
EOF
chmod +x .githooks/pre-commit
```

Se indica a Git que use esa carpeta de hooks:
```bash
git config core.hooksPath .githooks
```

Se realiza el commit con el hook ya creado y configurado:
```bash
git add .githooks/pre-commit
git commit -m "chore(hooks): añade hook de pre-commit con Spotless"
```

En el propio commit se comprueba que se ejecuta y aplica el formateo pero aún así se vuelve a comprobar con un test en otro commit:
```bash
git add .
git commit -m "chore: test para comprobar el formateo"
```

Finalmente, se añade al `README.md` para que otros compañeros configuren el hook en sus dispositivos. Esta vez se utiliza `docs` porque solamente se modifica un archivo `README.md`.
```bash
git add .
git commit -m "docs: añadido al README.md el aviso del hook"
```

### Parte F (Provocar y resolver un conflicto)
Se crean las ramas y se realizan las modificaciones oportunas:
```bash
git switch -c "docs/actualizar-readme"
git add .
git commit -m "docs: explicación en búsqueda avanzada modificada"
```

```bash
git switch main
git switch -c "docs/actualizar-doc"
git add .
git commit -m "docs: explicación en búsqueda avanzada mejorada en README.md"
```

Se realizan los `merge` para provocar el conflicto:
```bash
git switch main
git merge docs/actualizar-readme
git merge docs/actualizar-doc
```

Se produce el error:
```bash
Auto-fusionando README.md
CONFLICTO (contenido): Conflicto de fusión en README.md
Fusión automática falló; arregle los conflictos y luego realice un commit con el resultado.
```

Se soluciona el error y se realiza el commit:
```bash
git add .
git commit -m "docs: actualizada explicación de búsqueda avanzada"
```