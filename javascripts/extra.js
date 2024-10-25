document$.subscribe(() => {
  // Fix trailing white sapces in code annotations
  const tags = document.querySelectorAll("code .se");
  for (let tag of tags) {
    if (tag.innerText.startsWith("\\")) {
      tag.innerText = "\\";
    }
  }
});
