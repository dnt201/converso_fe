import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(() => {
   // Load app-level env vars to node-level env vars.

   return {
      plugins: [react()],
      resolve: {
         // modules: [
         //    // eslint-disable-next-line no-undef
         //    path.resolve(__dirname, 'src/'),
         //    // eslint-disable-next-line no-undef
         //    path.resolve(__dirname, 'node_modules/'),
         // ],

         alias: {
            '@assets': path.resolve(__dirname, './src/assets'),
            '@icons': path.resolve(__dirname, './src/assets/icons'),
            '@components': path.resolve(__dirname, './src/components'),
            '@config': path.resolve(__dirname, './src/config'),
            '@layouts': path.resolve(__dirname, './src/layouts'),
            '@hooks': path.resolve(__dirname, './src/hooks'),
            '@interfaces': path.resolve(__dirname, './src/interfaces'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@store': path.resolve(__dirname, './src/store'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@constants': path.resolve(__dirname, './src/constants'),
         },
      },
   };
});
