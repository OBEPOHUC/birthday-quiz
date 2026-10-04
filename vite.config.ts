import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // <-- импорт плагина

export default defineConfig({
  plugins: [react(), tailwindcss()], // <-- добавляем плагин в массив
});
