# build instructions

- create a vite config vite.config.<name here>.js in this directory
- copy one of the other configs or make your own replace the name of the input file such as "AccessCharts.html" to "FlippyDo.html"
- add the config name after vite.config.<name here>.js to the ./build-widgets.js
- in the ../../Global/ file run ```npm run prod```


### prod

```npm run prod```
prod contains the quorumlanguage.com url

### dev

```npm run dev```
dev contains the 127.0.0.1 url

### moving files over

```npm run moveFiles```

this runs the python file in the top level directory ../../moveFile.py

this moves files from build over to the ../../../html/script/widgets/ directory
