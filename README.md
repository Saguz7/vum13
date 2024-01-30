# Project Name
​
Frontend para el proyecto de VUM
​
## Contents Table 

- [Project Overview](#project-overview)
- [Summary](#summary)
- [Requirements](#requeriments)
- [Build/Installation/Configuration](#installation)
- [Usage](#usage)
- [Apendix](#apendix)
- [Notes](#notes)
- [Contact](#contact)
​
## Project Overview
​
El proyecto tiene como objetivo crear las vistas necesarias para ser consumidas por SAS, esto proyecto consiste en pantallas individuales que seran activadas mediante procesos de SAS.


El proyecto utiliza como herramientas principales:
* NodeJS
* Angular

## Summary 

* Consumo de servicios API
* Pantallas 
​
## Requirements

* NodeJS: https://nodejs.org/es​
* Angular: https://angular.io/ 
* Angular CLI: https://angular.io/cli

Recomendado:
* Visual Studio Code: https://code.visualstudio.com/

## Build / Installation / Configuration
​
Para poder correr correctamente el proyecto, se necesitan seguir los siguientes pasos.

```bash
# Clonación
$ git clone  https://git-codecommit.us-east-1.amazonaws.com/v1/repos/VUM-frontend
$ cd stallum-back
$ git checkout develop || feature/X

# Instalación
$ npm install
```

## Usage
​
Para​ poder iniciar el servidor de desarrollo se solo requiere tener instalador NodeJs y Angular CLI
```bash
# Iniciar servidor
$ ng serve

# Tests
$ ng test
```

## Apendix
​
El Frontend se encargara de consumir los servicios del backend oara interacturar entre la BBDD y el usuario final.
 

Para mantener un estandar, se recomiendan las siguientes practicas.

Commits: 
Se utilizara el siguiente estandar para el manejo de commits.

* Tipo:
    * ✨ Feat: Nueva característica
    * 🐛 Fix: Solución de errores
    * 📚 Docs: Documentación
    * 🛠️ Chore: Tareas de mantenimiento
    * 🎨 Style: Cambios de estilo
    * 🧹 Refactor: Refactorizar código
    * 🧪 Test: Relacionado con pruebas
    * 🚀 Deploy: Publicación de una versión
    * 📦 Build: Cambios para build

El mensaje debe de tener el siguiente formato:
```
<tipo>(<área>): <descripción>
```

Ejemplo:
```bash
🐛 Fix(API): Se soluciona problema generico.
```

Files & folders: El proyecto tiene que tener la siguiente estructuras de carpetas y archivos.

```
Project/
├── public/
│   ├── components/
│   │   │   ├── entidad/
├── src/
│   ├── services/
│   │   │   ├── entidad/
│   │   │	│   ├── entidad.services.ts
│   │   ├── app/
│   │   │   ├── assets/
│   │   │	├── pages/
│   │   │	│   ├── page.js
│   │   │	│   ├── style.css
├── environments/ 
│   ├── .env 


```

Se empezara con este template y se ira ajustando segun las necesidades.

<!-- ### Bug Reports
​
If you encounter any issues with the project, please [submit a bug report](https://github.com/your-username/your-project/issues/new) with detailed information. -->

## Contact
​
 