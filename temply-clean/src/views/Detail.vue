<template>
  <div
    :class="[
      'min-h-screen transition-all duration-700 px-6 py-12 relative',
      darkMode
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white'
        : 'bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900'
    ]"
  >
    <!-- Header -->
    <header
      class="fixed top-0 left-0 w-full shadow-lg z-50 flex justify-between items-center px-6 py-4 transition-colors duration-500 backdrop-blur-md"
      :class="darkMode ? 'bg-gray-900/80 text-white' : 'bg-white/80 text-gray-900'"
    >
      <img :src="logo" alt="Logo Temply" class="h-10 w-auto" />

      <div class="flex items-center gap-6">
        <nav class="flex gap-4">
          <button
            @click="router.push('/templates')"
            class="font-medium transition-transform duration-300 hover:scale-105 hover:text-accent"
            :class="darkMode ? 'text-gray-200 hover:text-white' : 'text-gray-700'"
          >
            Templates
          </button>
          <button
            @click="router.push('/')"
            class="font-medium transition-transform duration-300 hover:scale-105 hover:text-accent"
            :class="darkMode ? 'text-gray-200 hover:text-white' : 'text-gray-700'"
          >
            Accueil
          </button>
        </nav>

        <!-- Dark Mode -->
        <button
          @click="toggleDarkMode"
          class="px-4 py-2 rounded-full text-sm font-semibold backdrop-blur transition-colors duration-300 hover:scale-105"
          :class="darkMode ? 'bg-black/20 hover:bg-black/40 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'"
        >
          {{ darkMode ? "☀️ Light" : "🌙 Dark" }}
        </button>
      </div>
    </header>

    <!-- Contenu principal -->
    <div
      class=" mt-20 "
    >
      <!-- Hero + titre -->
      <div class="text-center mb-10">
        <span
          class="px-4 py-1 rounded-full text-xs font-semibold animate-pulse"
          :class="badgeColor(template.langage)"
        >
           {{ template.langage || "Inconnu" }}
        </span>
        <h1
          class="text-5xl font-extrabold mt-4 mb-2 tracking-tight bg-gradient-to-r from-accent via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient"
        >
          {{ template.title }}
        </h1>
        <p :class="darkMode ? 'text-gray-400 animate-fadeIn' : 'text-gray-600 animate-fadeIn'">
          Visualisez et explorez votre template facilement ✨
        </p>
      </div>

      <!-- Onglets Aperçu / Code -->
      <div class="flex justify-center gap-6 mb-8">
        <button @click="mode = 'preview'" :class="modeButtonClass('preview')">
           Aperçu
        </button>
        <button @click="mode = 'code'" :class="modeButtonClass('code')">
           Code
        </button>
      </div>

      <!-- Aperçu -->
      <div v-if="mode === 'preview'" class="space-y-6">
        <!-- Mode d'affichage -->
       <div class="flex justify-center gap-3">
  <button
    @click="setDevice('desktop')"
    :class="deviceClass('desktop')"
  >
    <div class="flex items-center gap-2">
      <img :src="pc" class="h-6 w-auto" />
      <span>Desktop</span>
    </div>
  </button>

  <button
    @click="setDevice('tablet')"
    :class="deviceClass('tablet')"
  >
    <div class="flex items-center gap-2">
      <img :src="tablette" class="h-6 w-auto" />
      <span>Tablet</span>
    </div>
  </button>

  <button
    @click="setDevice('mobile')"
    :class="deviceClass('mobile')"
  >
    <div class="flex items-center gap-2">
      <img :src="phone" class="h-6 w-auto" />
      <span>Mobile</span>
    </div>
  </button>
</div>


        <!-- Loader -->
        <div v-if="loading" class="flex justify-center items-center h-[550px]">
          <div class="loader ease-linear rounded-full border-4 border-t-4 border-accent h-14 w-14 shadow-lg"></div>
        </div>

       <!-- Iframe preview -->
<div
  class="relative flex justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-3xl shadow-2xl dark:from-gray-800 dark:to-gray-700 transition-all"
>
  <!-- Loader overlay -->
  <div
    v-if="loading"
    class="absolute inset-0 flex justify-center items-center bg-white/70 dark:bg-gray-900/70 rounded-3xl z-20 transition-opacity duration-500"
  >
    <div class="loader ease-linear rounded-full border-4 border-t-4 border-accent h-14 w-14 shadow-lg"></div>
  </div>

  <!-- Toolbar -->
  <div
    class="absolute top-4 right-4 flex gap-3 z-30 bg-white/20 dark:bg-black/30 backdrop-blur-lg px-4 py-2 rounded-full shadow-lg"
  >
    <button @click="zoomIn" class="p-2 rounded-full bg-white/70 dark:bg-gray-600 hover:scale-110 transition"><img :src="plus" alt="plus" class="h-5 w-auto" /></button>
    <button @click="zoomOut" class="p-2 rounded-full bg-white/70 dark:bg-gray-600 hover:scale-110 transition"><img :src="moin" alt="moin" class="h-5 w-auto" /></button>
    <button @click="rotate" class="p-2 rounded-full bg-white/70 dark:bg-gray-600 hover:scale-110 transition"><img :src="rotates" alt="rotate" class="h-5 w-auto" /></button>
    <button @click="screenshot" class="p-2 rounded-full bg-white/70 dark:bg-gray-600 hover:scale-110 transition"><img :src="capture" alt="capture " class="h-5 w-auto" /></button>
    <button @click="fullscreen" class="p-2 rounded-full bg-white/70 dark:bg-gray-600 hover:scale-110 transition"><img :src="zoom" alt="zoom Temply" class="h-5 w-auto" /></button>
  </div>

  <!-- Iframe -->
  <iframe
    ref="iframeRef"
    :srcdoc="iframeContent"
    :style="iframeStyle"
    class="rounded-2xl border shadow-xl w-full max-w-full h-[550px] transition-transform duration-500 hover:scale-105"
    @load="handleIframeLoad"
  />
</div>

      </div>

      <!-- Code -->
      <div v-else class="relative mt-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 rounded-2xl shadow-2xl">
        <div class="flex gap-4 mb-4">
          <button
            v-for="tab in codeTabs"
            :key="tab"
            @click="activeCodeTab = tab"
            :class="[
              'px-3 py-1 rounded-lg text-sm font-medium transition hover:scale-105',
              activeCodeTab === tab
                ? 'bg-accent text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            ]"
          >
            {{ tab }}
          </button>
        </div>
        <pre class="text-sm whitespace-pre-wrap font-mono overflow-x-auto">
          {{ activeCodeTab === 'HTML' ? template.html_code
             : activeCodeTab === 'CSS' ? template.css_code
             : template.js_code }}
        </pre>
        <button
          @click="copyCode(activeCodeTab)"
          class="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium shadow hover:scale-110 transition"
        >
          📋 Copier
        </button>
        <span v-if="copied" class="absolute top-4 right-28 bg-green-500 text-white px-2 py-1 rounded shadow text-xs animate-fadeIn">✔ Copié</span>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import retour from "../assets/retour.png";
import axios from "axios";
import { useRouter } from "vue-router";
import logo from "../assets/logo.png";
import plus from "../assets/plus.png";
import moin from "../assets/moin.png";
import rotates from "../assets/rotate.png";
import capture from "../assets/capture.png";
import zoom from "../assets/zoom.png";
import pc from "../assets/pc.png";
import tablette from "../assets/tablette.png";
import phone from "../assets/phone.png";


const router = useRouter();
const codeTabs = ["HTML", "CSS", "JS"];
const activeCodeTab = ref("HTML");
const route = useRoute();
const template = ref({});
const mode = ref("preview");
const copied = ref(false);
const device = ref("desktop");
const loading = ref(true);
const iframeRef = ref(null);
let rotateDeg = 0;
let zoomScale = 1;
const darkMode = ref(true);
const badgeColor = (lang) => {
  if (!lang) return "bg-gray-200 text-gray-800";
  if (lang.toLowerCase() === "html") return "bg-orange-200 text-orange-700";
  if (lang.toLowerCase() === "css") return "bg-blue-200 text-blue-700";
  if (lang.toLowerCase() === "js") return "bg-yellow-200 text-yellow-800";
  return "bg-accent/20 text-accent";
};
const handleIframeLoad = () => {
  // Animation de fade out du loader
  setTimeout(() => {
    loading.value = false;
  }, 300); // petite delay pour smooth
};
onMounted(async () => {
  setTimeout(() => {
    loading.value = false;
  }, 8000); // 8 secondes max

  const state = history.state;
  if (state?.template) {
    template.value = state.template;
  } else if (route.query.id) {
    // Requête API pour récupérer le template par ID
    try {
      const response = await axios.get(
        `http://localhost:8000/api/templates/${route.query.id}`
      );
      template.value = response.data;
    } catch (error) {
      template.value = {
        name: "Template non trouvé",
        image: "",
        code: "<p>Code indisponible</p>",
      };
      console.error(error);
    }
  } else {
    template.value = {
      name: "Template non trouvé",
      image: "",
      code: "<p>Code indisponible</p>",
    };
  }
});

const iframeContent = computed(() => {
  if (!template.value.html_code) return "<p>Template vide</p>";

  // Détection des dépendances selon template.langage
  let libs = "";
  if (template.value.langage?.toLowerCase().includes("bootstrap")) {
    libs +=
      `
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <scr` +
      `ipt src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></scr` +
      `ipt>
    `;
  }

  if (template.value.langage?.toLowerCase().includes("vue")) {
    libs +=
      `<scr` +
      `ipt src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></scr` +
      `ipt>`;
  }

  if (template.value.langage?.toLowerCase().includes("react")) {
    libs +=
      `
      <scr` +
      `ipt src="https://unpkg.com/react@18/umd/react.development.js"></scr` +
      `ipt>
      <scr` +
      `ipt src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></scr` +
      `ipt>
    `;
  }

  return (
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${libs}
      <style>
        ${template.value.css_code || ""}
      </style>
    </head>
    <body>
      ${template.value.html_code || ""}
      <scr` +
    `ipt>
        ${template.value.js_code || ""}
      </scr` +
    `ipt>
    </body>
    </html>
  `
  );
});

const goBack = () => window.history.back();

const copyCode = async (tab) => {
  try {
    const codeToCopy =
      tab === "HTML"
        ? template.value.html_code
        : tab === "CSS"
        ? template.value.css_code
        : template.value.js_code;

    await navigator.clipboard.writeText(codeToCopy);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch {
    alert("Erreur lors de la copie.");
  }
};

const setDevice = (type) => {
  device.value = type;
};

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  // Optionnel : appliquer la classe dark au <html> pour Tailwind
  if (darkMode.value) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};
const fullscreen = () => {
  const iframe = iframeRef.value;
  if (iframe.requestFullscreen) iframe.requestFullscreen();
};

const rotate = () => {
  rotateDeg = (rotateDeg + 90) % 360;
  iframeRef.value.style.transform = `rotate(${rotateDeg}deg) scale(${zoomScale})`;
};

const zoomIn = () => {
  zoomScale += 0.1;
  iframeRef.value.style.transform = `rotate(${rotateDeg}deg) scale(${zoomScale})`;
};

const zoomOut = () => {
  zoomScale = Math.max(0.5, zoomScale - 0.1);
  iframeRef.value.style.transform = `rotate(${rotateDeg}deg) scale(${zoomScale})`;
};

const screenshot = () => {
  alert(
    "Fonction capture non implémentée (nécessite html2canvas ou plugin externe)"
  );
};

const iframeStyle = computed(() => {
  if (device.value === "mobile") return { width: "375px" };
  if (device.value === "tablet") return { width: "768px" };
  return { width: "100%" };
});

const modeButtonClass = (val) => [
  "px-5 py-2 rounded-full font-semibold shadow transition-transform duration-300 hover:scale-105",
  mode.value === val
    ? "bg-accent text-white"
    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-white",
];

const deviceClass = (type) => [
  "px-4 py-1.5 rounded-full font-medium text-sm transition",
  device.value === type
    ? "bg-accent text-white shadow"
    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-white",
];
</script>
<style>
/* Loader */
.loader {
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeIn {
  animation: fadeIn 0.8s ease forwards;
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.animate-gradient {
  background-size: 200% 200%;
  animation: gradientMove 2s ease infinite;
}
</style>
