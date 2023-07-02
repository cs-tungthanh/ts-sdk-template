# SDK - Typescript Template

The template to build SDK in typescript.

On this project using:

-   webpack v5.38.1
-   typescript v4.1.3

---

# System Requirements

-   Node 12.x
-   Yarn

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

-   **Yarn** is a JavaScript dependency management tool that supports monorepos through workspaces.

```sh

        https://classic.yarnpkg.com/en/docs/install
```

-   **webpack-cli** provides a flexible set of commands for developers to increase speed when setting up a custom webpack project

```sh

        yarn global add webpack-cli
```

-   **Rimraf** is a tool for deep deletion (like rm -rf) module that provides asynchronous deep- deletion of files and directories.

```sh

        yarn global add rimraf
```

---

# Build project

```sh

    yarn build
```

After build this project, **webpack-cli** generate output file to **dist** and **artifacts**.

---

# Start project

```sh

    yarn start
```

When starting, Webpack will then automatically recompile source code when it detects any change.

---

# Deployment

**Build project with specific environment**

```sh

        yarn build:dev
        yarn build:prod
```

# Clean

-   Clean up project and node modules: `yarn clean:all`

-   Clean up project: `yarn clean`

---

# Dependency Management

-   Add a new package module to dependencies:

```sh

        yarn add <module>
        # <module>: install one or more packages
        # ex: yarn add axios
```

-   Add a new package module to devDependencies:

```sh

        yarn add -D <module>
        # <module>: install one or more packages
        # -D: install in devDependencies
        # ex: yarn add -D axios
```

-   Remove package:

```sh

        yarn remove <module>
        # <module>: remove one or more packages
        # ex: yarn remove axios
```

---

# Note

**Install SDK as a symlink**

```sh

        yarn add link:sdks/rhp-sdk
```

**Install SDK as a dependency**

```sh
        yarn add ./artifacts/sdk-name-<version>.tgz
        # <version>: current version of sdk
        # ex: yarn add ./artifacts/sdk-v1.0.4.tgz
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
        yarn add packageName@version
```
