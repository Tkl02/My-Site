declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";

interface ImportMetaEnv {
  readonly VITE_VERCEL_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}