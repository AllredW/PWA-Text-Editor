import { Workbox } from "workbox-window";
import { Editor } from "./editor";
import { setupDeleteButton } from "./delete";
import "./database";
import "../css/style.css";

const main = document.querySelector("#main");
main.innerHTML = "";

const loadSpinner = () => {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

// Instantiate the editor
const editor = new Editor().editor;

// Setup the delete button with the editor instance
setupDeleteButton(editor);

if (typeof editor === "undefined") {
  loadSpinner();
}

// Checks if service workers are supported
if ("serviceWorker" in navigator) {
  // Registers workbox service worker
  const workboxSW = new Workbox("/src-sw.js");
  workboxSW.register();
} else {
  console.error("Service workers are not supported in this browser.");
}