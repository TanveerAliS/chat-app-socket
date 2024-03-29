import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const cherryPickedKeys = [
  "REACT_APP_SOCKET_ENDPOINT",
]

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const processEnv = {}
  cherryPickedKeys.forEach(key => processEnv[key] = env[key])

  return {
    define: {
      'process.env': processEnv
    },
    plugins: [react()],
    build: {
      outDir: "dist",
      rollupOptions: {
        external: ["react", "react-router", "react-router-dom", "react-redux", 'react-scroll-to-bottom'],
        output: {
          globals: {
            react: "React",
          },
        },
      },
    },

  }
})