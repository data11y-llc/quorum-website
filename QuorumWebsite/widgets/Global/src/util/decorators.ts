interface ClassMethodDecoratorContext {
  name: string | symbol;
}

// Global counter for tracking the nesting level of logged methods
let loggedMethodNestingLevel = 0;
const loggedMethodBool: boolean = false;

function getRandomColor(): string {
  let minBrightness, maxBrightness;
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Dark mode
    minBrightness = 120;
    maxBrightness = 256;
  } else {
    // Light mode
    minBrightness = 0;
    maxBrightness = 130;
  }

  const red = Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness);
  const green = Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness);
  const blue = Math.floor(Math.random() * (maxBrightness - minBrightness) + minBrightness);
  return (red << 16 | green << 8 | blue).toString(16).padStart(6, '0');
}

function getCallingFunctionName(): string {
  const error = new Error();
  if (error.stack) {
    const stack = error.stack.split('\n');
    const callerIndex = 3;
    const caller = stack[callerIndex];
    const functionNameMatch = caller.match(/at (.*?)\s/);
    return functionNameMatch ? functionNameMatch[1] : 'unknown';
  } else {
    return 'unknown';
  }
}

export function loggedMethod(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> {
  if (loggedMethodBool) {
    const originalMethod = descriptor.value;
    const methodName = String(propertyKey); // This is the name of the method

    // Generate a random bright color for light mode and a random dark color for dark mode
    const randomColor = getRandomColor();

    descriptor.value = function replacementMethod(this: any, ...args: any[]) {
      const callingFunctionName = getCallingFunctionName();
      const tabs = '  '.repeat(loggedMethodNestingLevel);  // Two spaces per nesting level
      loggedMethodNestingLevel++;  // Increment the nesting level

      console.log(
        `%c${tabs}LOG: Entering method '${methodName}' called from '${callingFunctionName}' with arguments: `,
        `color: #${randomColor};`,
        args
      );

      const result = originalMethod.apply(this, args);

      loggedMethodNestingLevel--;  // Decrement the nesting level
      console.log(`%c${tabs}LOG: Exiting method '${methodName}'.`, `color: #${randomColor}`);

      return result;
    };

    return descriptor;
  } else {
    return descriptor;
  }
}


//make a time decorator
export function timeMethod(originalMethod: any, context: ClassMethodDecoratorContext) {
  const methodName = String(context.name);

  function replacementMethod(this: any, ...args: any[]) {
    const start = performance.now();
    const result = originalMethod.call(this, ...args);
    const end = performance.now();
    console.log(`%c LOG: Method '${methodName}' took ${end - start} ms.`, 'color: #000');
    return result;
  }

  return replacementMethod;
}
