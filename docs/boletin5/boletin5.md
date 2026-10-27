# Boletin 5

## Resumen de commits

| # | Mensaje del commit | Qué se hizo | Autor | Enlace |
|---|--------------------|-------------|-------|--------|
| 1 | `docs: script y workflow para crear un github pages para la documentación` | Creación de script y workflow para publicar una página | Javier García Cutillas | [f7fffae]([url](https://github.com/jgarciacutillas/practicas-continuas-26-27/commit/f7fffaeaa6cda3a2ca29c948a72d0ddddefa9134)) |

## Detalle por commit

### 1. `docs: script y workflow para crear un github pages para la documentación`
- **Qué se hizo:** Creación de script y workflow para publicar una página en la que se pueden observar todos los boletines realizados durante este periodo. Se puede observar a través de esta [url](https://jgarciacutillas.github.io/practicas-continuas-26-27/).
- **Autor:** Javier García Cutillas
- **Relación con el boletín:** Parte D - GitHub Pages de la documentación
- **Uso de IA:** Claude

#### Prompt
```bash
generame el script: Como dice el [Boletín 0](https://practicas-continuas-umu.github.io/apuntes/practicas/boletin0-guia-del-curso.html), has ido guardando la memoria de cada sesión (`boletinX.md`) en un repositorio/carpeta aparte. Toca traerla al repositorio de la API y publicarla como una web navegable.

* Copia (o mueve) tus `boletinX.md` desde el repositorio donde los tenías a una carpeta `docs/` en la raíz del repositorio de la API, uno por sesión entregada hasta ahora (`docs/boletin1.md` … `docs/boletin5.md`).
* Dentro de `docs/`, escribe un script (node o python) que lea todos los `.md` de `docs/` y genere, para cada uno, un `.html` equivalente más un `index.html` que enlace a todos. Deben guardarse en `docs/site/`. Recomiendo usar la IA para esto.
* Prueba el script en local y revisa el resultado abriendo el HTML en el navegador.
```

```bash
cada boletin es una carpeta con fotos y el .md dentro
```

```bash
* Automatízalo con un workflow `.github/workflows/pages.yml` que, en cada push a `main`, ejecute el script y publique `docs/site/` en GitHub Pages con las acciones oficiales.
```

```bash
moidifca el build-site.mjs que sea bonito y minimalista
```

## Descripción narrativa de lo hecho en la sesión y relación con los commits

### Parte A - Pipeline de publicación

Creamos el workflow correspondiente que se ejecutara al fusionar una rama a `main` o cuando publiquemos una nueva version
```yml
name: Release

on:
  push:
    branches: [ main ]
    tags: [ "v*.*.*" ]

permissions:
  contents: read
  packages: write

jobs:
  publish:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@v4

      - name: Login en GHCR
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Metadatos (tags)
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }}
          tags: |
            type=sha,prefix=sha-
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=semver,pattern={{major}}
            type=raw,value=latest,enable={{is_default_branch}}

      - name: Construir y publicar
        uses: docker/build-push-action@v6
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
``` 


### Parte B - Publicar una versión de verdad


### Parte C - Verificar la imagen publicada


### Parte D - GitHub Pages de la documentación
Se ha creado un script y un workflow con Claude para crear y actualizar de manera dinámica, cada vez que se realiza un merge a main.

![](./boletin5-parted.png)
