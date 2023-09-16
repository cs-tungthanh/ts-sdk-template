# Library - Typescript Template

The template to build a library in typescript.

On this project using:

-   rollup v3.29.2
-   typescript v5.2.2

---

# System Requirements

-   Node 16.x
-   pnpm 8.x

# What's inside

**Environment File**

-   `./env` directory contain the environment file for develop mode or production mode

**External Library/Interface**

-   `./ext` directory contain the external library or external interface using in this project

**Source Code**

-   `./src` directory to build and develop the project. This is where the original source files are located.

**Distribution Directory**

-   `./dist` directory contain the compiled code/library

**Tarball File**

-   `./artifacts` using tgz file to install as a dependency to other project or add js library inside the script tag

---

# Init project

To get started install package globally on your computer:

-   [**pnpm**](https://pnpm.io/) is a JavaScript dependency management tool that supports monorepos through workspaces.


---

# Build project

```sh
        pnpm install
        pnpm build
```

After build this project, **rollup** generate output file to **dist** and **artifacts**.

---

# Start project

```sh
    pnpm start
```

When starting, Webpack will then automatically recompile source code when it detects any change.

---

# Deployment

**Build project with specific environment**

```sh
        pnpm build:dev
        pnpm build:prod
```

# Clean

-   Clean up project and node modules: `pnpm clean:all`
-   Clean up project: `pnpm clean`

---

# Dependency Management

-   Add a new package module to dependencies:

```sh
        pnpm add <module>
        # <module>: install one or more packages
        # ex: pnpm add axios
```

-   Add a new package module to devDependencies:

```sh
        pnpm add -D <module>
        # <module>: install one or more packages
        # -D: install in devDependencies
        # ex: pnpm add -D axios
```

-   Remove package:

```sh
        pnpm remove <module>
        # <module>: remove one or more packages
        # ex: pnpm remove axios
```

---

# Note
**Install SDK as a symlink**

```sh
        pnpm add link:sdks/rhp-sdk
```

**Install SDK as a dependency**

```sh
        pnpm add ./artifacts/sdk-name-<version>.tgz
        # <version>: current version of sdk
        # ex: pnpm add ./artifacts/sdk-v1.0.4.tgz
```

**Install SDK as a js library**

```sh
        # In the HTML Header section, paste the sdk url inside the script tag
        <script src="https://cdn.com/sdks/sdk/tool-sdk@latest/esm/tool-sdk.development.js"></script>
```

**Install SDK from package cloud**

-   Config package cloud: set private key to access to private package cloud repository.
-   Add  SDK to project:

```sh
        pnpm add packageName@version
```
