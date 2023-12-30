// vite-plugin-hello.js
export default function helloPlugin() {
  return {
    name: 'hello', // required, will show up in warnings and errors
    apply: 'build', // optional, either 'build' or 'serve'
    buildStart(options) {
      // called at the start of the build
      console.log(`

        $$$$$$$ Hello World $$$$$$$$$


        `)
    }
  }
}

