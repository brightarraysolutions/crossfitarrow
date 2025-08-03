const fs = require("fs");
const path = require("path");

module.exports = function(eleventyConfig) {
  // Add navigation collection
  eleventyConfig.addCollection("nav", function(collectionApi) {
    return collectionApi.getFilteredByTag("nav").sort((a, b) =>
      (a.data.nav_order || 0) - (b.data.nav_order || 0)
    );
  });

  // Passthrough copy for images with explicit dest folder
  eleventyConfig.addPassthroughCopy({
    "src/assets/images": "assets/images"
  });

  // Determine dev vs prod
  const isDev = process.env.NODE_ENV === "development";

  // Load Vite manifest in production
  const manifestPath = path.join(__dirname, "dist/assets/manifest.json");
  let manifest = {};

  eleventyConfig.on("beforeBuild", () => {
    if (!isDev && fs.existsSync(manifestPath)) {
      manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
    }
  });

  // Asset shortcode
  eleventyConfig.addShortcode("asset", function(filename) {
    if (isDev) {
      // In dev, serve from Vite dev server
      return `http://localhost:5173/${filename}`;
    }

    // In production, serve hashed file from manifest
    if (manifest[filename]) {
      return `/assets/${manifest[filename].file}`;
    } 

    // fallback
    return `/assets/${filename}`;
  });

  return {
    dir: {
      input: "src/pages",
      includes: "../templates",
      data: "../_data",
      output: "../dist"
    }
  };
};
