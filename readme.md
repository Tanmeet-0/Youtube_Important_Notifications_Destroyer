# Youtube Important Notifications Destroyer

A browser extension that deletes the useless important notifications section in youtube notifications,  
then displays the important notifications with the other notifications in newest to oldest order.  
The important notifications can still be highlighted among other notifications.  
The highlight colour for important notifications can be modified.

Made using Typescript for the actual program, Webpack for the bundler and npm for managing everything.

## Supported Browsers

- Chrome: Version 150.0.7871.125 and above

## Development Requirements

- Node.js: Version 22.21.1
- npm: Version 11.18.0

## To Develop Locally

1. Install Node.js and npm.

2. Clone this repository.

3. In the repository folder, run this in the command line to install all the dependencies.

```shell
npm install
```

4. Extensions can only made using javascript files so, run this in the command line to generate the javascript files from the typescript files for the extension.

```shell
npm run build
```

5. Enable developer mode in chrome and load the unpacked extension. See [https://developer.chrome.com/docs/extensions](https://developer.chrome.com/docs/extensions) for more info.
