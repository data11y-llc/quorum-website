export interface IDE_OPTIONS {
  theme: 'light' | 'dark' | 'high-contrast';
  fontSize: '12' | '14' | '16' | '18' | '20';
  wrap: boolean;
  indent: '2' | '3' | '4';
  desktopMode: boolean;
}


// Define a function to set a cookie with a name, a value, and an encoder function
export function setCookie<T>(name: string, value: T, encoder: (value: T) => string) {
  const date = new Date();
  const encodedValue = encoder(value); // Encode the value using the encoder function
  // Set the cookie to expire in 7 days
  date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
  // Set the cookie 
  document.cookie = `${name}=${encodedValue}; expires=${date.toUTCString()}; path=/`;
}

// Define a function to get a cookie with a name and a decoder function
export function getCookie<T>(name: string, decoder: (value: string) => T): T | undefined {
  // Use a regular expression to match the cookie name and value
  const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
  // Return the decoded value or undefined
  return match ? decoder(match[1]) : undefined;
}

