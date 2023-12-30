import terser from '@rollup/plugin-terser';

export default function excludeFileFromMinify(fileToExclude) {
  const terserPlugin = terser();

  return {
    name: 'exclude-file-from-minify', // name of the plugin
    renderChunk(code, chunk) {
      // If the chunk includes the file to exclude, return the code as-is
      if (chunk.facadeModuleId && chunk.facadeModuleId.includes(fileToExclude)) {
        return code;
      }

      // Otherwise, use the original terser plugin to minify the code
      return terserPlugin.renderChunk(code, chunk);
    }
  };
}

