<template>
  <div class="min-h-screen bg-background text-text relative">
    <button
      @click="goBack"
      class="absolute top-6 left-6 bg-accent text-white px-4 py-2 rounded-lg shadow hover:bg-accent/80 transition"
    >
      <img :src="retour" alt="fleche" class="h-5 w-auto" />
    </button>

    <!-- Section principale -->
    <div class="pt-24 px-6">
      <h2 class="text-4xl font-bold text-center text-primary mb-8">
        Templates
      </h2>
      <!-- Barre de recherche -->
      <div class="max-w-2xl mx-auto mb-8 flex items-center gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un template..."
          class="flex-1 px-4 py-2 rounded-lg bg-border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          @click="searchTemplates"
          class="bg-accent hover:bg-primary transition text-background px-4 py-2 rounded-lg"
        >
          Rechercher
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="template in templates"
          :key="template.id"
          class="bg-background rounded-xl shadow-lg p-4 transform transition-transform duration-300 hover:scale-105"
        >
          <img :src="template.image" alt="Template" class="rounded mb-4" />
          <h3 class="text-xl font-semibold mb-2">{{ template.name }}</h3>
          <p class="text-sm text-text/70">
            {{ template.category }} | {{ template.language }}
          </p>
          <span
            class="inline-block mt-2 px-3 py-1 text-xs rounded-full"
            :class="
              template.type === 'Free'
                ? 'bg-green-500/20 text-green-700'
                : 'bg-red-500/20 text-red-700'
            "
          >
            {{ template.type }}
          </span>

          <button
            @click="openModal(template)"
            class="mt-4 w-full py-1.5 text-accent text-sm font-semibold flex items-center justify-center gap-1 hover:text-primary transition"
          >
            Consulter
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center mt-12 space-x-2">
      <button
        v-for="page in 10"
        :key="page"
        class="w-10 h-10 flex items-center justify-center rounded-full bg-border hover:bg-accent text-white transition"
      >
        {{ page }}
      </button>
    </div>

    <!-- Flèche retour en haut -->
    <button
      @click="scrollToTop"
      class="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg animate-bounce hover:scale-110 transition"
    >
      <img :src="fleche" alt="fleche" class="h-5 w-auto" />
    </button>

    <!-- Flèche retour en bas -->
    <button
      @click="scrollToBottom"
      class="fixed top-20 right-8 bg-primary text-white p-3 rounded-full shadow-lg animate-bounce hover:scale-110 transition"
    >
      <img :src="fleche1" alt="fleche" class="h-5 w-auto" />
    </button>

    <!-- Modal -->
    <transition name="modal-fade">
      <div
        v-if="selectedTemplate"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div
          class="bg-background p-6 rounded-lg max-w-md w-full relative shadow-lg"
        >
          <!-- Bouton fermer -->
          <button
            @click="closeModal"
            class="absolute top-3 right-3 text-text hover:text-accent text-xl font-bold"
            aria-label="Fermer"
          >
            &times;
          </button>

          <img
            :src="selectedTemplate.image"
            alt="Template"
            class="rounded mb-4 w-full object-cover max-h-48"
          />
          <h3 class="text-2xl font-bold mb-2">{{ selectedTemplate.name }}</h3>
          <p class="mb-1 text-text/70">
            Langage : {{ selectedTemplate.language }}
          </p>
          <p class="mb-2 text-text/70">Catégorie : {{ selectedTemplate.category }}</p>
          <p class="mb-4 text-text/80">
            Description détaillée du template (à personnaliser).
          </p>

          <span
            class="inline-block mb-6 px-3 py-1 text-xs rounded-full"
            :class="selectedTemplate.type === 'Free' ? 'bg-green-500/20 text-green-700' : 'bg-red-500/20 text-red-700'"
          >
            {{ selectedTemplate.type }}
          </span>

          <button
            v-if="selectedTemplate.type === 'Free'"
            @click="useTemplate(selectedTemplate)"
            class="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded transition font-semibold"
          >
            Utiliser
          </button>
          <button
            v-else
            @click="payTemplate(selectedTemplate)"
            class="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded transition font-semibold"
          >
            Payer
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import fleche from "../assets/fleche.png";
import fleche1 from "../assets/fleche1.png";
import retour from "../assets/retour.png";
import image1 from "../assets/cap1.png";
import { useRouter } from "vue-router"; // 👈
const router = useRouter(); // 👈

const templates = [
  {
    id: 1,
    name: "Template Portfolio",
    category: "Portfolio",
    language: "HTML/CSS",
    type: "Free",
    image: image1,
        code: `<html>\n  <head><title>Portfolio</title></head>\n  <body>Mon portfolio</body>\n</html>`,

  },
  {
    id: 2,
    name: "Template Admin",
    category: "Dashboard",
    language: "Vue.js",
    type: "Payed",
    image: image1,
        code: `<html>\n  <head><title>Portfolio</title></head>\n  <body>Mon portfolio</body>\n</html>`,

  },
  {
    id: 3,
    name: "Template Blog",
    category: "Blog",
    language: "React",
    type: "Payed",
    image: image1,
        code: `<html>\n  <head><title>Portfolio</title></head>\n  <body>Mon portfolio</body>\n</html>`,

  },
  {
    id: 4,
    name: "Template E-commerce",
    category: "Shop",
    language: "Nuxt.js",
    type: "Payed",
    image: image1,
        code: `<html>\n  <head><title>Portfolio</title></head>\n  <body>Mon portfolio</body>\n</html>`,

  },
  {
    id: 5,
    name: "Template Portfolio 2",
    category: "Portfolio",
    language: "HTML/CSS",
    type: "Free",
    image: image1,
        code: `<html>\n  <head><title>Portfolio</title></head>\n  <body>Mon portfolio</body>\n</html>`,

  },
];

const searchQuery = ref("");
const selectedTemplate = ref(null);

const goBack = () => window.history.back();
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const scrollToBottom = () =>
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

function openModal(template) {
  selectedTemplate.value = template;
}

function closeModal() {
  selectedTemplate.value = null;
}

// 🚀 Redirection vers Detail.vue
function useTemplate(template) {
  closeModal();
  router.push({
    name: "detail",
    params: { id: template.id },
    state: { template },
  });
}

function payTemplate(template) {
  alert(`Payer pour le template : ${template.name}`);
  closeModal();
}

function searchTemplates() {
  // Tu peux ajouter ta logique de recherche ici si besoin
  alert(`Recherche : ${searchQuery.value}`);
}
</script>

<style>
/* Animation modal fade */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}
</style>
