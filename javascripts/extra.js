document$.subscribe(() => {
  // Fix trailing white sapces in code annotations
  const tags = document.querySelectorAll("code .se");
  for (let tag of tags) {
    if (tag.innerText.startsWith("\\")) {
      tag.innerText = "\\";
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Get all links in the document
  const links = document.getElementsByTagName("a");

  // Loop through each link
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    const href = link.getAttribute("href");

    // Check if the link is external (starts with http:// or https://)
    if (href && (href.startsWith("http://") || href.startsWith("https://"))) {
      // Check if it's not pointing to your own domain
      if (!href.includes(window.location.hostname)) {
        // Add target="_blank" and rel="noopener noreferrer" for security
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }
    }
  }
});
