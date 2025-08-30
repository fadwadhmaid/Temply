<template>
  <div class="min-h-screen bg-background text-text relative">
    <!-- Bouton Retour -->
    <header
      class="fixed top-0 left-0 w-full bg-background shadow z-50 flex justify-between items-center px-6 py-4"
    >
        <img :src="logo" alt="Logo Temply" class="h-10 w-auto" />

      <nav class="flex gap-6">
        <button
          @click="router.push('/templates')"
          class="hover:text-accent transition"
        >
          Templates
        </button>
      
        <button
          @click="router.push('/')"
          class="hover:text-accent transition"
        >
          Accueil
        </button>
      </nav>
    </header>

    <div class="pt-24 px-6">
      <h2 class="text-4xl font-bold text-center text-primary mb-8">
        Catégories
      </h2>

      <!-- Barre de recherche -->
      <div class="max-w-2xl mx-auto flex items-center gap-4 mb-6">
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

     

     <!-- Grille compacte des catégories -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div
    v-for="categorie in paginatedCategories"
    :key="categorie.id"
    class="bg-border rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 relative overflow-hidden p-3"
  >
    <!-- Badge Nouveau -->
    <span
      v-if="categorie.isNew"
      class="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-full shadow"
    >
      Nouveau
    </span>

    <!-- Favori -->
    <button
      @click="toggleFavori(categorie)"
      class="absolute top-2 right-2 z-10 text-accent hover:text-primary transition"
    >
      <span v-if="isFavori(categorie)">
        <img :src="favoris1" alt="Favori" class="h-4 w-auto" />
      </span>
      <span v-else>
        <img :src="favoris2" alt="Favori" class="h-4 w-auto" />
      </span>
    </button>

    <!-- Image -->
    <div class="overflow-hidden rounded-t-lg">
      <img
        :src="categorie.image"
        alt="Template"
        class="w-full h-28 object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>

    <!-- Contenu -->
    <div class="flex flex-col gap-1 mt-2">
      <h3 class="text-sm font-semibold text-primary">{{ categorie.name }}</h3>
      <p class="text-xs text-text/70">Catégorie : {{ categorie.slug }}</p>

      <!-- Bouton Consulter -->
      <button
        @click="openModal(categorie)"
        class="mt-1 w-full py-1 text-xs font-semibold flex items-center justify-center gap-1 text-white bg-accent rounded hover:bg-primary transition"
      >
        Consulter
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-3 w-3"
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

    </div>

   <!-- Pagination améliorée -->
<div class="flex justify-center mt-8 items-center gap-2">
  <!-- Bouton Précédent -->
  <button
    @click="currentPage > 1 && currentPage--"
    :disabled="currentPage === 1"
    class="px-3 py-1 rounded-full bg-border text-white hover:bg-accent disabled:opacity-50 transition"
  >
    &laquo;
  </button>

  <!-- Numéros de page -->
  <button
    v-for="page in totalPages"
    :key="page"
    @click="currentPage = page"
    :class="{
      'bg-accent text-white': currentPage === page,
      'bg-border text-white hover:bg-accent': currentPage !== page
    }"
    class="w-10 h-10 flex items-center justify-center rounded-full transition"
  >
    {{ page }}
  </button>

 <!-- Bouton Suivant -->
<button
  @click="currentPage < totalPages ? currentPage++ : null"
  :disabled="currentPage === totalPages"
  class="px-3 py-1 rounded-full bg-border text-white hover:bg-accent disabled:opacity-50 transition"
>
  &raquo;
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
         
          <p class="mb-4 text-text/80">
            {{ selectedTemplate.slug }}.
          </p>
          <!--<button
            class="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded transition font-semibold"
          >
            Voir
          </button>-->
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

import fleche from "../assets/fleche.png";
import fleche1 from "../assets/fleche1.png";
import retour from "../assets/retour.png";
import favoris2 from "../assets/favoris2.png";
import favoris1 from "../assets/favoris1.png";
import { useRouter } from "vue-router";
const router = useRouter();
import logo from "../assets/logo.png";

const categories = ref([]); // <-- tableau dynamique
const searchQuery = ref("");
const selectedCategory = ref(null);
const selectedTemplate = ref(null);
const favoris = ref([]);
const categoriesPerPage = 6;
const currentPage = ref(1);
const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * categoriesPerPage;
  const end = start + categoriesPerPage;
  return filteredCategories.value.slice(start, end);
});
const totalPages = computed(() => {
  return Math.ceil(filteredCategories.value.length / categoriesPerPage);
});


// Computed pour filtrer dynamiquement
const filteredCategories = computed(() => {
  return categories.value.filter((c) => {
    const matchesCategory =
      !selectedCategory.value || c.category === selectedCategory.value;
    const matchesSearch = c.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

// Fetch categories depuis le backend
const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/categories");
    categories.value = response.data.map((cat) => ({
      ...cat,
      image: `http://localhost:8000/storage/${cat.img_url}`,
      // transforme img_url en URL complète
    }));
    console.log(categories.value); // pour vérifier si les données sont correctes
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
  }
};

// Appeler la fonction au montage du composant
onMounted(() => {
  fetchCategories();
});

const goBack = () => window.history.back();
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const scrollToBottom = () =>
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
// Recherche déclenchée par le bouton
function searchTemplates() {
  // Les catégories affichées sont automatiquement filtrées par `filteredCategories`
  // donc il suffit de recalculer le computed
  // Ici on peut simplement forcer le recalcul en changeant currentPage si nécessaire
  currentPage.value = 1;
}

function openModal(template) {
  selectedTemplate.value = template;
}
function closeModal() {
  selectedTemplate.value = null;
}

function filterBy(cat) {
  selectedCategory.value = cat;
}
function clearFilter() {
  selectedCategory.value = null;
}
const uniqueCategories = computed(() => {
  return [...new Set(categories.value.map((c) => c.category))];
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
