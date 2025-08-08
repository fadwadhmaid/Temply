<template>
  <div :class="['min-h-screen', darkMode ? 'bg-gray-900 text-white' : 'bg-background text-text', 'px-6 py-12 relative']">
    <!-- Bouton retour -->
   <button
      @click="goBack"
      class="absolute top-6 left-6 bg-accent text-white px-4 py-2 rounded-lg shadow hover:bg-accent/80 transition"
    >
      <img :src="retour" alt="fleche" class="h-5 w-auto" />
    </button>

    <!-- Bouton dark mode -->
    <button
      @click="toggleDarkMode"
      class="absolute top-6 right-6 px-4 py-2 rounded-full bg-black/10 text-sm font-medium hover:bg-black/20 transition"
    >
      {{ darkMode ? '☀️ Light' : '🌙 Dark' }}
    </button>

    <!-- Contenu principal -->
    <div class="max-w-5xl mx-auto mt-16 bg-white/80 backdrop-blur p-10 rounded-3xl shadow-lg border border-gray-200 dark:bg-gray-800">
      <!-- Titre -->
      <h1 class="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
        {{ template.name }}
      </h1>

      <!-- Onglets Aperçu / Code -->
      <div class="flex justify-center gap-6 mb-8">
        <button
          @click="mode = 'preview'"
          :class="modeButtonClass('preview')"
        >
          🔍 Aperçu
        </button>
        <button
          @click="mode = 'code'"
          :class="modeButtonClass('code')"
        >
          🧑‍💻 Code
        </button>
      </div>

      <!-- Aperçu -->
      <div v-if="mode === 'preview'" class="space-y-6">
        <!-- Mode d'affichage -->
        <div class="flex justify-center gap-3">
          <button @click="setDevice('desktop')" :class="deviceClass('desktop')">
            🖥️ Desktop
          </button>
          <button @click="setDevice('tablet')" :class="deviceClass('tablet')">
            📱 Tablet
          </button>
          <button @click="setDevice('mobile')" :class="deviceClass('mobile')">
            📳 Mobile
          </button>
        </div>

        <!-- Loader -->
        <div v-if="loading" class="flex justify-center items-center h-[550px]">
          <div class="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>

        <!-- Iframe preview -->
        <div v-show="!loading" class="relative flex justify-center bg-gray-100 p-6 rounded-2xl shadow-inner dark:bg-gray-700">
          <!-- Toolbar -->
          <div class="absolute top-4 right-4 flex gap-2 z-10">
            <button @click="zoomIn" class="bg-white dark:bg-gray-600 px-2 py-1 rounded shadow">➕</button>
            <button @click="zoomOut" class="bg-white dark:bg-gray-600 px-2 py-1 rounded shadow">➖</button>
            <button @click="rotate" class="bg-white dark:bg-gray-600 px-2 py-1 rounded shadow">🔁</button>
            <button @click="screenshot" class="bg-white dark:bg-gray-600 px-2 py-1 rounded shadow">📸</button>
            <button @click="fullscreen" class="bg-white dark:bg-gray-600 px-2 py-1 rounded shadow">⛶</button>
          </div>

          <iframe
            ref="iframeRef"
            :srcdoc="template.code"
            :style="iframeStyle"
            class="rounded-xl border shadow w-full max-w-full h-[550px] transition-all duration-300"
            @load="loading = false"
          ></iframe>
        </div>
      </div>

      <!-- Code -->
      <div v-else class="relative mt-4 bg-gray-900 text-white p-6 rounded-xl">
        <pre class="text-sm whitespace-pre-wrap font-mono overflow-x-auto">{{ template.code }}</pre>
        <button
          @click="copyCode"
          class="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-medium shadow hover:bg-gray-200 transition"
        >
          📋 Copier
        </button>
        <span
          v-if="copied"
          class="absolute top-4 right-28 text-green-400 text-xs font-semibold"
        >
          ✔ Copié
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import retour from "../assets/retour.png";

const route = useRoute();
const template = ref({});
const mode = ref("preview");
const copied = ref(false);
const device = ref("desktop");
const loading = ref(true);
const darkMode = ref(false);
const iframeRef = ref(null);
let rotateDeg = 0;
let zoomScale = 1;

onMounted(() => {
  const state = history.state;
  if (state?.template) {
    template.value = state.template;
  } else {
    template.value = {
      name: "Template non trouvé",
      image: "",
      code: "<p>Code indisponible</p>",
    };
  }
  setTimeout(() => (loading.value = false), 1000);
});

const goBack = () => window.history.back();

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(template.value.code);
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
  alert("Fonction capture non implémentée (nécessite html2canvas ou plugin externe)");
};

const iframeStyle = computed(() => {
  if (device.value === "mobile") return { width: "375px" };
  if (device.value === "tablet") return { width: "768px" };
  return { width: "100%" };
});

const modeButtonClass = (val) =>
  [
    "px-5 py-2 rounded-full font-semibold shadow transition",
    mode.value === val
      ? "bg-accent text-white"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-white",
  ];

const deviceClass = (type) =>
  [
    "px-4 py-1.5 rounded-full font-medium text-sm transition",
    device.value === type
      ? "bg-accent text-white shadow"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-white",
  ];
</script>

<style>
.loader {
  border-top-color: #3498db;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
