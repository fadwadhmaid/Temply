<template>
  <div class="min-h-screen bg-background text-text relative">
    
    <!-- Bouton Retour -->
    <button
      @click="goBack"
      class="absolute top-6 left-6 bg-accent text-white px-4 py-2 rounded-lg shadow hover:bg-accent/80 transition"
    >
      <img :src="retour" alt="fleche" class="h-5 w-auto" />
    </button>

    <div class="pt-24 px-6">
      <h2 class="text-4xl font-bold text-center text-primary mb-8">
        Catégories
      </h2>

      <div class="max-w-2xl mx-auto mb-6 flex items-center gap-4">
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

      <div class="flex gap-3 flex-wrap justify-center mb-8">
        <button
          v-for="cat in uniqueCategories"
          :key="cat"
          @click="filterBy(cat)"
          class="px-4 py-1 text-sm rounded-full"
          :class="
            selectedCategory === cat
              ? 'bg-accent text-white'
              : 'bg-border text-text hover:bg-accent hover:text-white transition'
          "
        >
          {{ cat }}
        </button>
        <button
          @click="clearFilter"
          class="px-4 py-1 text-sm bg-border text-text rounded-full hover:bg-accent hover:text-white transition"
        >
          Tous
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="categorie in filteredCategories"
          :key="categorie.id"
          class="bg-border rounded-xl shadow-md p-4 relative transform transition-transform duration-300 hover:scale-105"
        >
          <!-- Favori -->
          <button
            @click="toggleFavori(categorie)"
            class="absolute top-4 right-4 text-accent hover:text-primary text-xl"
          >
            <span v-if="isFavori(categorie)"><img :src="favoris1" alt="Logo favoris" class="h-5 w-auto" />
</span>
            <span v-else
              ><img :src="favoris2" alt="Logo favoris" class="h-5 w-auto" />
            </span>
          </button>

          <img
            :src="categorie.image"
            alt="Template"
            class="rounded-md mb-3 h-32 w-full object-cover"
          />
          <h3 class="text-lg font-semibold mb-1">{{ categorie.name }}</h3>
          <p class="text-xs text-text/70">
            Catégorie : {{ categorie.category }}
          </p>
          <button
            @click="openModal(categorie)"
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

    <!-- Flèches haut/bas -->
    <button
      @click="scrollToTop"
      class="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg animate-bounce hover:scale-110 transition"
    >
      <img :src="fleche" alt="fleche" class="h-5 w-auto" />
    </button>
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
          <button
            @click="closeModal"
            class="absolute top-3 right-3 text-text hover:text-accent text-xl font-bold"
          >
            &times;
          </button>
          <img
            :src="selectedTemplate.image"
            alt="Template"
            class="rounded mb-4 w-full object-cover max-h-48"
          />
          <h3 class="text-2xl font-bold mb-2">{{ selectedTemplate.name }}</h3>
          <p class="mb-2 text-text/70">
            Catégorie : {{ selectedTemplate.category }}
          </p>
          <p class="mb-4 text-text/80">
            Description détaillée du template (à personnaliser).
          </p>
          <button
            class="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded transition font-semibold"
          >
            Voir
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import fleche from "../assets/fleche.png";
import fleche1 from "../assets/fleche1.png";
import retour from "../assets/retour.png";
import image1 from "../assets/cap1.png";
import favoris2 from "../assets/favoris2.png";
import favoris1 from "../assets/favoris1.png";

import { useRouter } from "vue-router";
const router = useRouter();

const categories = [
  { id: 1, name: "Template Portfolio", category: "Portfolio", image: image1 },
  { id: 2, name: "Template Admin", category: "Dashboard", image: image1 },
  { id: 3, name: "Template Blog", category: "Blog", image: image1 },
];

const searchQuery = ref("");
const selectedCategory = ref(null);
const selectedTemplate = ref(null);
const favoris = ref([]);

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
function searchTemplates() {
  alert(`Recherche : ${searchQuery.value}`);
}

function filterBy(cat) {
  selectedCategory.value = cat;
}
function clearFilter() {
  selectedCategory.value = null;
}

const uniqueCategories = [...new Set(categories.map((c) => c.category))];

const filteredCategories = computed(() => {
  return categories.filter((c) => {
    const matchesCategory =
      !selectedCategory.value || c.category === selectedCategory.value;
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

function toggleFavori(categorie) {
  const exists = favoris.value.find((f) => f.id === categorie.id);
  if (exists) {
    favoris.value = favoris.value.filter((f) => f.id !== categorie.id);
  } else {
    favoris.value.push(categorie);
  }
}
function isFavori(categorie) {
  return favoris.value.some((f) => f.id === categorie.id);
}
</script>

<style>
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
