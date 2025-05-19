/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL_1: string;
  readonly VITE_API_BASE_URL_2: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
