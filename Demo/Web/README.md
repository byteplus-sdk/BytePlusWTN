# WTN Demo
WebRTC Transmission Network Demo


## Demo operation steps 
### 1. Install dependencies.
```Shell
yarn
```
### 2. Fill in the publish and subscribe stream url.
Open `./src/config.ts` in the project root directory, find `URL_CONFIGS`, fill in `PUBLISH_URL` and `SUBSCRIBE_URL`.

At the same time, please note that your subscription address needs to meet certain formats, please refer to the comments in `./src/config.ts` for details.

### 3. Running the project.
```Shell
yarn dev
```

## Project structure

```shell
|-- Project
  |-- assets Image, font, etc. resources
  |-- src Source code
    |-- app Request encapsulation
    |-- components Components reused in the Demo
    |-- lib WebRTC encapsulation
	|-- locales Multilingual
    |-- pages Pages
    |-- store Business data model (redux)
	|-- utils Common functions
    |-- config.ts Static constants
```

## Relative information
For more information about WTN Demo, you can refer to https://docs.byteplus.com/en/docs/byteplus-rtc/706159