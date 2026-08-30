const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // Pass-through copies
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/_redirects");

  // Collection: all work/projects, newest first
  eleventyConfig.addCollection("projects", (collectionApi) => {
    return collectionApi.getFilteredByGlob("src/content/projects/*.md").sort((a, b) => {
      return (b.data.date || 0) - (a.data.date || 0);
    });
  });

  // Filter: projects matching a given category tag
  eleventyConfig.addFilter("withCategory", (projects, category) => {
    if (!category || category === "All") return projects;
    return projects.filter((p) => (p.data.categories || []).includes(category));
  });

  // Filter: formatted date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(new Date(dateObj), { zone: "utc" }).toFormat("LLL yyyy");
  });

  // Shortcode: fake timecode generator for editorial styling (deterministic per index)
  eleventyConfig.addFilter("timecode", (index) => {
    const i = Number(index) || 0;
    const hh = String(Math.floor(i / 3600) % 24).padStart(2, "0");
    const mm = String(Math.floor(i / 60) % 60).padStart(2, "0");
    const ss = String(i % 60).padStart(2, "0");
    const ff = String((i * 7) % 24).padStart(2, "0");
    return `${hh}:${mm}:${ss}:${ff}`;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
