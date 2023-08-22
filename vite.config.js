import path from 'path';
export default {
    build: {
        lib: {
          entry: path.resolve(__dirname, 'src/index.js'),  // or wherever your main entry is
          name: 'MyBadges'
        },
      rollupOptions: {
        // This will ensure there's no 'input' property conflicting with our 'entry' point
      }
    }
  }
  