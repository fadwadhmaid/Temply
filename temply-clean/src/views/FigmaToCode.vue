<template>
  <section
    class="bg-[#0F172A] min-h-screen flex items-center justify-center px-6 text-center"
  >
    <div class="max-w-4xl mx-auto mt-6">
      <!-- Titre -->
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        🚀 Convertisseur Figma → HTML/CSS (Beta)
      </h2>
      <p class="text-gray-300 mb-10 max-w-2xl mx-auto">
        Générez rapidement du code HTML/CSS propre à partir de vos designs
        Figma. ⚡ Ce n’est pas un convertisseur magique, mais un accélérateur
        pour poser les bases de vos projets.
      </p>

      <!-- Carte -->
      <div
        class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10"
      >
        <!-- Input URL -->
        <div class="mb-6 text-left">
          <label class="block mb-2 text-gray-200">URL du fichier Figma</label>
          <div class="relative">
            <input
              v-model="fileUrl"
              type="text"
              placeholder="https://www.figma.com/file/FILE_KEY/MonFichier"
              class="w-full px-4 py-3 rounded-xl bg-[#1E293B] text-white border border-gray-600 focus:border-violet-500 focus:ring focus:ring-violet-500/30 transition"
            />
            <span v-if="fileUrl" class="absolute right-3 top-3 text-green-400"
              >✔</span
            >
          </div>
        </div>

        <button
          @click="loadFrames"
          :disabled="loading"
          class="w-full py-3 px-6 rounded-xl font-semibold text-white bg-violet-600 hover:bg-violet-500 transition disabled:opacity-50"
        >
          <span v-if="loading" class="loader"></span>
          {{ loading ? "Chargement…" : "Lister les frames" }}
        </button>

        <!-- Sélection Frames -->
        <div v-if="frames.length" class="mt-8 text-left">
          <label class="block mb-2 text-gray-200">Choisir une frame</label>
          <select
            v-model="selectedNodeId"
            class="w-full px-4 py-3 rounded-xl bg-[#1E293B] text-white border border-gray-600 focus:border-violet-500 focus:ring focus:ring-violet-500/30 transition"
          >
            <option disabled value="">-- sélectionnez --</option>
            <option v-for="f in frames" :key="f.id" :value="f.id">
              {{ f.name }}
            </option>
          </select>

          <button
            @click="convert"
            :disabled="!selectedNodeId || converting"
            class="w-full mt-4 py-3 px-6 rounded-xl font-semibold text-white bg-violet-600 hover:bg-violet-500 transition disabled:opacity-50"
          >
            <span v-if="converting" class="loader"></span>
            {{ converting ? "Conversion…" : "Convertir en HTML/CSS" }}
          </button>
        </div>

        <!-- Résultat -->
        <div v-if="result.html" class="mt-10 text-left">
          <h3 class="text-xl font-semibold text-white mb-2">HTML généré</h3>
          <div ref="htmlEditor" class="h-64 rounded-xl overflow-hidden"></div>

          <h3 class="text-xl font-semibold text-white mb-2 mt-6">CSS généré</h3>
          <div ref="cssEditor" class="h-64 rounded-xl overflow-hidden"></div>

          <h3 class="text-xl font-semibold text-white mb-2">
            Prévisualisation
          </h3>
          <div
            class="w-full min-h-[300px] rounded-xl overflow-hidden border border-gray-600"
          >
            <iframe
              class="w-full min-h-[300px] bg-white rounded-xl"
              :srcdoc="`<html><head><style>${result.css}</style></head><body>${result.html}</body></html>`"
            ></iframe>
          </div>
        </div>

        <p v-if="error" class="text-red-400 mt-4">{{ error }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref,watch, nextTick  } from "vue";
import newLogo from "../assets/newLogo.png";
import * as monaco from "monaco-editor";

import prettier from "prettier/standalone";
import parserHtml from "prettier/parser-html";
import parserCss from "prettier/parser-postcss";

const fileUrl = ref("");
const frames = ref([]);
const selectedNodeId = ref("");
const result = ref({ html: "", css: "" });
const loading = ref(false);
const converting = ref(false);
const error = ref("");
const isDark = ref(false);
const htmlEditor = ref(null);
const cssEditor = ref(null);
let htmlMonaco = null;
let cssMonaco = null;

watch(result, async (val) => {
  // attendre que les div soient rendues
  await nextTick();

// Formater HTML
  const formattedHtml = val.html
    ? prettier.format(val.html, { parser: "html", plugins: [parserHtml] })
    : "";

  // Formater CSS
  const formattedCss = val.css
    ? prettier.format(val.css, { parser: "css", plugins: [parserCss] })
    : "";
    
  // Éditeur HTML
  if (val.html && htmlEditor.value) {
    if (!htmlMonaco) {
      htmlMonaco = monaco.editor.create(htmlEditor.value, {
        value: val.html,
        language: "html",
        theme: "vs-dark",
        automaticLayout: true,
      });
    } else {
      htmlMonaco.setValue(val.html);
    }
  }

  // Éditeur CSS
  if (val.css && cssEditor.value) {
    if (!cssMonaco) {
      cssMonaco = monaco.editor.create(cssEditor.value, {
        value: val.css,
        language: "css",
        theme: "vs-dark",
        automaticLayout: true,
      });
    } else {
      cssMonaco.setValue(val.css);
    }
  }
});
function toggleDarkMode() {
  isDark.value = !isDark.value;
  const html = document.documentElement;
  if (isDark.value) {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

function extractFileKey(url) {
  const m = url.match(/\/(?:file|design)\/([a-zA-Z0-9]+)\//);
  return m ? m[1] : null;
}

async function loadFrames() {
  error.value = "";
  const fileKey = extractFileKey(fileUrl.value);
  if (!fileKey) {
    error.value = "URL Figma invalide (FILE_KEY introuvable).";
    return;
  }
  loading.value = true;
  try {
    const res = await fetch(`http://localhost:8000/figma/frames/${fileKey}`);
    if (!res.ok) throw new Error(await res.text());
    frames.value = await res.json();
    if (!frames.value.length)
      error.value = "Aucune frame trouvée dans ce fichier.";
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

async function convert() {
  error.value = "";
  if (!selectedNodeId.value) {
    error.value = "Choisissez une frame.";
    return;
  }
  converting.value = true;
  try {
    const fileKey = extractFileKey(fileUrl.value);
    const url = new URL("http://localhost:8000/figma/convert");
    url.searchParams.set("fileKey", fileKey);
    url.searchParams.set("nodeId", selectedNodeId.value);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(await res.text());

    result.value = await res.json();

    // injecter css pour preview
    let styleTag = document.getElementById("figma-css");
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = "figma-css";
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = result.value.css;
  } catch (e) {
    error.value = e.message;
  } finally {
    converting.value = false;
  }
}
</script>
<style scoped>
.loader {
  border: 3px solid white;
  border-top: 3px solid transparent;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: inline-block;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>