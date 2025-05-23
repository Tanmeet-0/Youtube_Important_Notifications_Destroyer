# Youtube Important Notifications Destroyer

A chrome browser extension that deletes the useless important notifications section in youtube notifications, then displays the important notifications with the other notifications in newest to oldest order.


If you still want to know what Youtube considers to be important notifications, choose to highlight
the important notification so they stand out more than other notifications.

Made using Typescript for the actual program, Webpack for the bundler and Node for Managing everything. 

Currently figuring out hoe to publish an extension on the chrome web store.

## Supported Browsers

Chrome: Version 136.0.7103.93 and above

## Development Requirements

Node.js: Version 22.4.1 and above 

## To Develop Locally

1. Install Node.js.

2. Clone this repository.

3. In the repository folder, run this in the command line to install all the dependencies.
```shell
npm install
```

4. Extensions can only made using javascript files so, run this in the command line to generate the javascript files from the typescript files for the extension.
```shell
npm run build
```

5. Enable developer mode in chrome and load the unpacked extension.