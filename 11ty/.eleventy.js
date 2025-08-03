const fs = require("fs");
const path = require("path");

module.exports = function(eleventyConfig) {
  // Add navigation collection
  eleventyConfig.addCollection("nav", function(collectionApi) {
    return collectionApi.getFilteredByTag("nav").sort((a, b) =>
      (a.data.nav_order || 0) - (b.data.nav_order || 0)
    );
  });

  // Add the ability to split in njk files
  eleventyConfig.addFilter("split", function(str, delimiter) {
    if (!str) return [];
    return str.split(delimiter);
  });

  // Add the ability to truncate in njk files
  eleventyConfig.addFilter("truncate", function(str, length = 256) {
    if (!str || typeof str !== "string") return "";
    if (str.length <= length) return str;
    return str.slice(0, length).trim() + "…";
  });

  // Add the ability to slug to title for
  eleventyConfig.addFilter("slugToTitle", function(slug) {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
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
      // If the filename ends with .scss, change to .css for dev server URL
      if (filename.endsWith('.css')) {
        filename = filename.replace('.css', '.scss');
      }
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
