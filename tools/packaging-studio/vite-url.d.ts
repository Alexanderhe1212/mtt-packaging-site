// Vite URL imports are strings, unlike Next static image objects.
declare module "*?url" {
  const url: string;
  export default url;
}
