const welcomeMessage = `
    ███████╗ ██████╗██╗  ██╗███████╗███╗   ███╗██╗██╗   ██╗███████╗
    ██╔════╝██╔════╝██║  ██║██╔════╝████╗ ████║██║██║   ██║██╔════╝
    ███████╗██║     ███████║█████╗  ██╔████╔██║██║██║   ██║███████╗
    ╚════██║██║     ██╔══██║██╔══╝  ██║╚██╔╝██║██║██║   ██║╚════██║
    ███████║╚██████╗██║  ██║███████╗██║ ╚═╝ ██║██║╚██████╔╝███████║
    ╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝ ╚═════╝ ╚══════╝

      Welcome to Schemius!
        Press [Ctrl + H]        to show this welcome message
        Press [Ctrl + K]        to show essential keymap
        (environment-bindings)  -> Show bindings in current env
        (fact 2000)             -> If you'd like to see a big number :)

      Go through the code at https://github.com/cowuake/schemius
`;

const keymap = `
      Keymap:
        [arrow keys]            -> Move cursor | Navigate history
        [Shift + Enter]         -> Enter multiline insert mode
        [Ctrl + H]              -> Show help message
        [Ctrl + K]              -> Show keymap
        [Ctrl + Shift + F]      -> Switch font
`;

const fonts = [
  "Source Code Pro",
  "Cascadia Code",
  "Fira Code",
  "JetBrains Mono",
  "Consolas",
  "monospace",
];
const localFont = localStorage.getItem("font");
const defaultFont = localFont ?? fonts[0];

function getFont() {
  return document.documentElement.style.getPropertyValue("--font");
}

function setFont(font) {
  document.documentElement.style.setProperty("--font", font);
  localStorage.setItem("font", font);
}

async function switchFont() {
  let currentFont = getFont();
  let keepSearching = true;
  let nVisited = 0;

  do {
    currentFont = fonts[(fonts.indexOf(currentFont) + 1) % fonts.length];
    let fontFaces = await document.fonts.load(`12pt ${currentFont}`);
    keepSearching = fontFaces.length === 0 && currentFont !== "monospace";
  } while (keepSearching && nVisited++ < fonts.length);

  console.log("Setting font to", currentFont);
  setFont(currentFont);
}

const themes = [
  {
    // gruvbox dark
    color: "#ebdbb2",
    background: "#3c3836",
    linkColor: "#b8bb26",
  },
  {
    // gruvbox light
    color: "#504945",
    background: "#f2e5bc",
    linkColor: "#689d6a",
  },
];
const localTheme = JSON.parse(localStorage.getItem("theme"));
const defaultTheme = localTheme ?? themes[0];

function getTheme() {
  const color = document.documentElement.style.getPropertyValue("--color");
  const background =
    document.documentElement.style.getPropertyValue("--background");
  const linkColor =
    document.documentElement.style.getPropertyValue("--link-color");

  return {
    color: color,
    background: background,
    linkColor: linkColor,
  };
}

function setTheme(theme) {
  document.documentElement.style.setProperty("--color", theme.color);
  document.documentElement.style.setProperty("--background", theme.background);
  document.documentElement.style.setProperty("--link-color", theme.linkColor);
  localStorage.setItem("theme", JSON.stringify(theme));
}

function switchTheme() {
  let currentTheme = getTheme();
  console.log("Previous theme", currentTheme);
  let index = themes.indexOf(
    themes.filter(
      (theme) => JSON.stringify(theme) == JSON.stringify(currentTheme)
    )[0]
  );
  index = ++index % themes.length;
  currentTheme = themes[index];
  console.log("Setting theme to", currentTheme);
  setTheme(currentTheme);
}
