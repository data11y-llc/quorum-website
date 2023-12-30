## how to use the widgets with the class names

### IDE
```html
<div id="data11y-loader" data-chart="true" data-code="true" data-file="true" data-svg="false" aria-hidden="true"></div>
<div id="code1" class="data11y-code" data-title="Fancy Box" data-content="file1.txt, file2.txt" data-subtitle="Lesson 2 App 2"></div>
```

### Access Charts
```html
<div id="AC1" class="data11y-access-chart"></div>
```

### Pixel widgets
```html
<div id="PW1" class="data11y-pixel-widget"></div>
```

### Cipher
```html
<div id="data11y-loader" data-chart="true" data-code="true" data-svg="true" data-js="true" aria-hidden="true"></div>
<div id="cipherLoader"></div>
```

### Flippy Do

#### normal version
```html
<div id="f1" class="data11y-flippydo"></div>
```

#### pro version
```html 
<div id="f2" class="data11y-flippydo" data-pro="true"></div>
```

### Visualize RGB
```html
<div id="VS1" class="data11y-visualize-rgb-space"></div>
```

### Color Average

```html
<div id="CA1" class="data11y-color-average"></div>
```

## Main workspaces

### root
root directory or the location this README.md is in
this is where we change the ts files

run `npm install`: this installs packages

to get the files to put an canvas or build site:
    `npm run dev` builds js files into the dist/src folder and rebuilds when the ts files are changed from src
### src folder
the src folder holds all of the workable typescript files. This is where we will do our coding. `npm run dev` it will build from this folder.

### dist folder

we use this when building apps, with a terminal inside this directory run 
`npm install` to install vite, then `npm run dev` and a vite server will run

a seperate terminal should be running `npm run dev` from the outside folder 'Global'

#### only files to change around
html, css are to able to be changed, 
dont change js files as they are built from ts

## Resources to help with ts
typescript is to help with debugging and help knowing intent when writing and reading code. 

`var firstName: string = 'Tim' `

`firstName = 30; //this would show an error in your ide`

this is helpful for knowing what is returned from functions 
and what arguments to pass in as well

if you are having a lot of trouble with errors take a look at the links below.
if typescript is holding you back, you can use `//@ts-ignore` above a line of code to have the ide ignore the error. Use sparingly.

some useful links to help learn:

- [typescript fundamentals](https://www.typescript-training.com/course/fundamentals-v3)

- [intermediate typescript](https://www.typescript-training.com/course/intermediate-v1)

- [quizzes](https://www.typescript-training.com/course/making-typescript-stick)


