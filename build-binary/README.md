# Auto Dispatch Task

Simple CLI for Auto Dispatch Task

# Usage

## Config

File path: src/config.js

```js
{
    sdk: object, // get from RHP Credentials page
    app: {
        checkTaskStatusAfterSecond: 60, // time to check dispatch task status
        dispatchRequestAfterSecond: 60, // time to send next dispatch request after previous task complete
        dispatchRequestAlias: '[247]' // alias to show on Tracking Page
    },
    facility: {
        id: 'xxx' // id of facility you want test
    },
    device: {
        ignored: ['xxx'], // list device you want ignore in list
        floor: {
            one: 'xxx', // if setting use this to get 1F floor
            five: 'xxx' // if setting use this to get 5F floor
        }
    }
}
```

## Usage
```sh

    ./adt [options]

    # [options]
    # -i, --init: tell the tool init flow from number of input
    # -r, --reset: tell the tool reset flow before starting (to cancel all dispatch requests and localize all robots)
    # -h, --help: show usage information
```


# For development

## Install dependencies

```sh
yarn install
```

## Build

```sh
yarn build
```

## Start

```sh
yarn start

# Start and reset flow (cancel all dispatch request, localize all robot)
yarn start --reset
```

## Package to single application (package project into an executable that can be run even on devices without Node.js installed)

Output the binary file to bin dir.

```sh
yarn pkg
```

note: run `npm i -g @vercel/ncc` first

## Clean

```sh
yarn clean
```
