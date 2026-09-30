# Youtube Important Notifications Destroyer

A browser extension that deletes the useless important notifications section in youtube notifications,  
then displays the important notifications with the other notifications in newest to oldest order.  
The important notifications can still be highlighted among other notifications.  
The highlight colour for important notifications can be modified.

Built using Typescript for the restructuring logic, Webpack for the bundler and npm for managing everything.

## Available On

- Chrome Web Store: [https://chromewebstore.google.com/detail/youtube-important-notific/bjobiiodonihbengfmfdnfhncifcjidc](https://chromewebstore.google.com/detail/youtube-important-notific/bjobiiodonihbengfmfdnfhncifcjidc)

## To Develop Locally

1. Install Node.js and npm.

2. Clone this repository.

3. In the repository folder, run this in the command line to install all the dependencies.

```shell
npm install
```

4. Extensions can only made using javascript files, run this in the command line to generate the javascript files from the typescript files for the extension.

```shell
npm run build
```

5.

- To run the extension in Chrome:  
    Enable developer mode in chrome and load the unpacked extension. See [https://developer.chrome.com/docs/extensions](https://developer.chrome.com/docs/extensions) for more info.
- For other browsers, see the browser specific documentation for extensions.

6. After making any changes, make sure to run the build command and then reload the extension to see your changes reflected in the browser.

## TODO

- publish on mozilla, edge and other browsers
- add internationalization
