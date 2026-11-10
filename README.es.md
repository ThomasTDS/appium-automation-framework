# Appium Automation Framework

[🇧🇷 Português](README.md) | [🇺🇸 English](README.en.md) | **🇪🇸 Español**

![CI](https://github.com/ThomasTDS/appium-automation-framework/actions/workflows/ci.yml/badge.svg)
![Licencia](https://img.shields.io/badge/licencia-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D18.20.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)

Framework de automatización de pruebas end-to-end para aplicaciones Android, construido con **Appium**, **WebdriverIO** y **TypeScript**, siguiendo los patrones **BDD** (Behavior Driven Development, con Cucumber) y **Page Object Model**.

Este es un proyecto de portafolio, desarrollado para demostrar, en la práctica, conocimientos de automatización de pruebas móviles: definición de escenarios en lenguaje de negocio, organización de código mantenible, ejecución en emulador Android e integración continua.

![Demostración de la suite ejecutando el flujo de compra en el emulador Android](docs/demo.gif)

<sub>Grabación real del escenario de checkout (`npm test`) ejecutándose contra el emulador Android: login, adición al carrito, llenado de dirección y pago, hasta la confirmación del pedido.</sub>

## Índice

- [Sobre el proyecto](#sobre-el-proyecto)
- [Tecnologías y herramientas](#tecnologías-y-herramientas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Aplicación bajo prueba](#aplicación-bajo-prueba)
- [Requisitos previos](#requisitos-previos)
- [Configuración del entorno](#configuración-del-entorno)
- [Instalación](#instalación)
- [Ejecutando las pruebas](#ejecutando-las-pruebas)
- [Reporte de pruebas (Allure)](#reporte-de-pruebas-allure)
- [Solución de problemas](#solución-de-problemas)
- [Estándares de calidad de código](#estándares-de-calidad-de-código)
- [Integración continua](#integración-continua)
- [Escenarios de prueba implementados](#escenarios-de-prueba-implementados)
- [Bugs encontrados](#bugs-encontrados)
- [Reportando problemas](#reportando-problemas)
- [Changelog](#changelog)
- [Licencia](#licencia)
- [Autor](#autor)

## Sobre el proyecto

El objetivo de este repositorio es simular, de la forma más cercana posible a la realidad, un proyecto de automatización de pruebas móviles mantenido por un equipo de calidad (QA). Para ello, las pruebas se escriben en formato **Gherkin** (dado/cuando/entonces), organizadas mediante Page Objects reutilizables, y se ejecutan automáticamente con cada cambio de código a través de un pipeline de integración continua en GitHub Actions.

La aplicación utilizada como objetivo de las pruebas es [My Demo App](https://github.com/saucelabs/my-demo-app-android), una aplicación Android de e-commerce ficticia mantenida por Sauce Labs específicamente para fines de capacitación y demostración de automatización de pruebas.

## Tecnologías y herramientas

| Categoría                          | Herramienta                                                        |
| ---------------------------------- | ------------------------------------------------------------------ |
| Lenguaje                           | TypeScript                                                         |
| Framework de automatización        | [WebdriverIO](https://webdriver.io/)                               |
| Driver de automatización móvil     | [Appium](https://appium.io/) (driver UiAutomator2)                 |
| Estilo de escritura de las pruebas | BDD con [Cucumber](https://cucumber.io/) (escenarios en portugués) |
| Patrón de organización             | Page Object Model                                                  |
| Reporte de ejecución               | [Allure Report](https://allurereport.org/)                         |
| Calidad de código                  | ESLint y Prettier                                                  |
| Integración continua               | GitHub Actions                                                     |
| Plataforma probada                 | Android (emulador vía Android Studio)                              |

## Estructura del proyecto

```
.
├── .github/workflows/       # Pipeline de integración continua
├── apps/                    # Ubicación donde se debe colocar el APK de la app bajo prueba
├── docs/                    # Imágenes/GIFs usados en este README
├── test/
│   ├── features/            # Escenarios de prueba en Gherkin (.feature)
│   ├── pageobjects/         # Page Objects (clase base + pantallas de la app)
│   └── step-definitions/    # Conexión entre los pasos Gherkin y los Page Objects
├── wdio.conf.ts             # Configuración de WebdriverIO/Appium
├── tsconfig.json            # Configuración de TypeScript
├── eslint.config.mjs        # Configuración de ESLint
└── .env.example             # Plantilla de variables de entorno
```

## Aplicación bajo prueba

Las pruebas se ejecutan contra **My Demo App Android**, de Sauce Labs: una aplicación de e-commerce ficticia con login, catálogo de productos, carrito de compras y diversas otras funcionalidades de demostración (código QR, geolocalización, biometría, entre otras).

- Repositorio oficial: [saucelabs/my-demo-app-android](https://github.com/saucelabs/my-demo-app-android)
- Paquete Android: `com.saucelabs.mydemoapp.android`
- Credencial de demostración utilizada en las pruebas: usuario `bod@example.com`, contraseña `10203040`

El archivo `.apk` **no está versionado** en este repositorio (ver la sección [Instalación](#instalación) para instrucciones de descarga).

## Requisitos previos

Antes de ejecutar las pruebas localmente, es necesario tener instalado:

- [Node.js](https://nodejs.org/) 18.20 o superior
- [JDK (Java Development Kit)](https://adoptium.net/) 17 o superior
- [Android Studio](https://developer.android.com/studio), con:
  - Android SDK (Platform-Tools, Build-Tools, Platform y Emulator)
  - Un dispositivo virtual (AVD) ya creado y funcional

Las siguientes variables de entorno también deben estar configuradas en el sistema operativo:

| Variable                              | Descripción                         |
| ------------------------------------- | ----------------------------------- |
| `JAVA_HOME`                           | Ruta de instalación del JDK         |
| `ANDROID_HOME` (o `ANDROID_SDK_ROOT`) | Ruta de instalación del Android SDK |

El `PATH` del sistema debe incluir las carpetas `platform-tools` y `emulator` del Android SDK, para que los comandos `adb` y `emulator` funcionen directamente en la terminal.

## Configuración del entorno

1. Copia el archivo de variables de entorno de ejemplo:

   ```bash
   cp .env.example .env
   ```

2. Ajusta, si es necesario, los valores en `.env`:

   | Variable              | Por defecto                   | Descripción                                    |
   | --------------------- | ----------------------------- | ---------------------------------------------- |
   | `ANDROID_APP_PATH`    | `./apps/android-demo-app.apk` | Ruta del APK de la aplicación bajo prueba      |
   | `ANDROID_DEVICE_NAME` | `medium_phone`                | Nombre del dispositivo usado por Appium        |
   | `ANDROID_AVD_NAME`    | `medium_phone`                | Nombre del dispositivo virtual (AVD) a iniciar |

   El nombre del AVD debe corresponder a un dispositivo virtual ya creado en tu Android Studio (**Device Manager**). Si utilizas un nombre distinto de `medium_phone`, actualiza estas variables en consecuencia.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone git@github.com:ThomasTDS/appium-automation-framework.git
   cd appium-automation-framework
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Descarga el APK de la aplicación bajo prueba y colócalo en la carpeta `apps/`:

   ```bash
   curl -L -o ./apps/android-demo-app.apk \
     https://github.com/saucelabs/my-demo-app-android/releases/download/2.2.0/mda-2.2.0-25.apk
   ```

   > El comando anterior apunta a la versión `2.2.0` (la más reciente al momento de escribir este proyecto). Si ya se ha publicado una versión más nueva, verifica el nombre exacto del archivo `.apk` en los [releases de my-demo-app-android](https://github.com/saucelabs/my-demo-app-android/releases) y ajusta la URL del comando en consecuencia.

4. Inicia el emulador Android configurado en Android Studio (o deja que Appium lo inicie automáticamente en la primera ejecución de las pruebas, mediante la variable `ANDROID_AVD_NAME`).

## Ejecutando las pruebas

Con el entorno configurado, basta con ejecutar:

```bash
npm test
```

Este comando inicia el servidor de Appium automáticamente (vía `@wdio/appium-service`), se conecta al emulador Android y ejecuta todos los escenarios definidos en `test/features/`.

## Reporte de pruebas (Allure)

En cada ejecución, los resultados se registran en la carpeta `allure-results/`. Para visualizarlos como un reporte HTML navegable:

```bash
# Genera el reporte HTML a partir de los resultados de la última ejecución
npm run report:generate

# Abre el reporte generado en el navegador
npm run report:open
```

El reporte incluye los pasos de cada escenario, el tiempo de ejecución y capturas de pantalla en caso de fallo.

El reporte de la ejecución más reciente en la rama `main` también se publica automáticamente, sin necesidad de generar nada localmente: **[ver reporte Allure en vivo](https://thomastds.github.io/appium-automation-framework/)**.

## Solución de problemas

**La ventana del emulador se abre, pero se queda negra/congelada, aunque las pruebas pasan normalmente.**

Esto suele ser un problema de renderizado por GPU del host (común en portátiles con tarjeta gráfica híbrida, p. ej.: NVIDIA + Intel integrada), no un problema de la aplicación ni de las pruebas — como Appium interactúa con la app a través del árbol de accesibilidad de Android, y no a través de los píxeles de la pantalla, la suite sigue funcionando normalmente incluso con la pantalla negra. Para forzar al emulador a renderizar por software (más lento, pero más compatible) y confirmar el diagnóstico, inícialo manualmente con:

```bash
emulator -avd medium_phone -gpu swiftshader_indirect
```

Si la pantalla pasa a mostrar Android normalmente, el problema es el driver/configuración de GPU del host. Vale la pena intentar actualizar el driver de la tarjeta gráfica dedicada y/o desactivar "Hardware-accelerated GPU scheduling" en la configuración de gráficos de Windows antes de recurrir permanentemente al renderizado por software.

## Estándares de calidad de código

```bash
# Verifica problemas de lint
npm run lint

# Corrige automáticamente lo que sea posible
npm run lint:fix

# Verifica el formato del código
npm run format:check

# Formatea el código automáticamente
npm run format

# Verifica errores de tipo de TypeScript
npm run typecheck
```

Estas tres verificaciones (lint, formato y tipos) se ejecutan automáticamente en un job dedicado del CI en cada `push` o _pull request_, de forma independiente y en paralelo a la ejecución de las pruebas end-to-end.

Lint, formato (solo en los archivos modificados, vía [lint-staged](https://github.com/lint-staged/lint-staged)) y verificación de tipos también se ejecutan localmente antes de cada commit, mediante un hook de pre-commit configurado con [Husky](https://typicode.github.io/husky/). El hook se instala automáticamente al ejecutar `npm install`.

## Integración continua

En cada `push` o _pull request_ a la rama `main`, el workflow definido en [`.github/workflows/ci.yml`](.github/workflows/ci.yml) ejecuta automáticamente toda la suite de pruebas en un emulador Android alojado en GitHub Actions, y publica el reporte Allure como artefacto del workflow, disponible para descarga en la pestaña **Actions** del repositorio. Además, en cada `push` directo a `main`, el reporte se publica automáticamente en GitHub Pages: [thomastds.github.io/appium-automation-framework](https://thomastds.github.io/appium-automation-framework/).

## Escenarios de prueba implementados

| Funcionalidad   | Escenario                                                   | Archivo                                                                  |
| --------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| Login           | Login con credenciales válidas                              | [`test/features/login.feature`](test/features/login.feature)             |
| Login           | Login con usuario bloqueado                                 | [`test/features/login.feature`](test/features/login.feature)             |
| Login           | Login con campos obligatorios sin completar (3 ejemplos)    | [`test/features/login.feature`](test/features/login.feature)             |
| Carrito         | Agregar producto al carrito                                 | [`test/features/carrinho.feature`](test/features/carrinho.feature)       |
| Carrito         | Finalizar compra sin haber iniciado sesión                  | [`test/features/carrinho.feature`](test/features/carrinho.feature)       |
| Carrito         | Eliminar producto del carrito                               | [`test/features/carrinho.feature`](test/features/carrinho.feature)       |
| Carrito         | Ajustar la cantidad antes de agregar al carrito             | [`test/features/carrinho.feature`](test/features/carrinho.feature)       |
| Carrito         | Agregar el mismo producto dos veces suma la cantidad        | [`test/features/carrinho.feature`](test/features/carrinho.feature)       |
| Checkout        | Finalizar compra con éxito                                  | [`test/features/checkout.feature`](test/features/checkout.feature)       |
| Código QR       | Abrir el lector de código QR                                | [`test/features/qrcode.feature`](test/features/qrcode.feature)           |
| Dibujo          | Dibujar en el lienzo y guardar                              | [`test/features/drawing.feature`](test/features/drawing.feature)         |
| Geolocalización | Definir la ubicación se refleja en la pantalla              | [`test/features/geolocation.feature`](test/features/geolocation.feature) |
| Biometría       | La pantalla indica que no está disponible en el dispositivo | [`test/features/fingerprint.feature`](test/features/fingerprint.feature) |

Esta lista se actualiza a medida que se agregan nuevos escenarios al proyecto.

## Bugs encontrados

Defectos reales de la aplicación bajo prueba, descubiertos durante el desarrollo de los escenarios y registrados como Issues de GitHub con pasos de reproducción, evidencia y análisis de causa.

| Issue                                                                     | Resumen                                                                                                               | Severidad |
| ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------- |
| [#22](https://github.com/ThomasTDS/appium-automation-framework/issues/22) | El login acepta cualquier usuario/contraseña, excepto los e-mails de la lista de bloqueo — la contraseña no se valida | Critical  |

## Reportando problemas

Los bugs encontrados en la aplicación bajo prueba, en el pipeline de CI o en la propia automatización se registran como [Issues de GitHub](../../issues/new/choose), usando una plantilla estandarizada que cubre entorno, severidad, prioridad, pasos de reproducción y causa raíz.

## Changelog

El historial de cambios notables de este proyecto se mantiene en [`CHANGELOG.md`](CHANGELOG.md).

## Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## Autor

Desarrollado por [Thomas Teixeira](https://github.com/ThomasTDS) como proyecto de estudio y portafolio en automatización de pruebas móviles.
