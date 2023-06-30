export const scrollToResults = () => {
  setTimeout(function () {
    let production = document.querySelector("#results") ?? undefined;

    if (production) production.scrollIntoView();
  }, 1000);
};
