<template>
  <div class="min-h-screen bg-background text-text relative pb-20">
    <!-- Bouton retour -->
    <header
      class="fixed top-0 left-0 w-full bg-background shadow z-50 flex justify-between items-center px-6 py-4"
    >
    <img :src="logo" alt="Logo Temply" class="h-10 w-auto" />

      <nav class="flex gap-6">
        <button
          @click="router.push('/categories')"
          class="hover:text-accent transition"
        >
          Categories
        </button>

        <button @click="router.push('/')" class="hover:text-accent transition">
          Accueil
        </button>
      </nav>
    </header>

    <!-- Section principale -->
    <div class="pt-24 px-6">
      <h2 class="text-4xl font-bold text-center text-primary mb-2">
        Découvrez nos Templates
      </h2>
      <p class="text-center text-text/70 mb-8">
        Inspirez-vous et créez vos projets rapidement avec des templates prêts à
        l’emploi
      </p>

      <!-- Barre de recherche + filtres -->
      <div class="max-w-4xl mx-auto mb-8">
        <!-- Barre de recherche sur une ligne -->
      <div class="mb-4">
      <input
        v-model="searchQuery"
        @input="fetchTemplates"
        type="text"
        placeholder="Rechercher un template..."
        class="w-full px-4 py-2 rounded-lg bg-border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
      />
    </div>

        <!-- Boutons de filtres centrés -->
<div class="flex flex-wrap justify-center gap-3">
  <button
    @click="filterBy('Portfolio Responsive')"
    :class="selectedCategory === 'Portfolio Responsive' ? 'bg-primary' : 'bg-accent'"
    class="px-4 py-1 rounded-full text-white hover:bg-primary transition"
  >
    Portfolio Responsive
  </button>

  <button
    @click="filterBy('Landing Page')"
    :class="selectedCategory === 'Landing Page' ? 'bg-primary' : 'bg-red-500'"
    class="px-4 py-1 rounded-full text-white hover:bg-red-600 transition"
  >
    Landing Page
  </button>

  <button
    @click="filterBy('Single Page Site')"
    :class="selectedCategory === 'Single Page Site' ? 'bg-primary' : 'bg-blue-500'"
    class="px-4 py-1 rounded-full text-white hover:bg-blue-600 transition"
  >
    Single Page Site
  </button>

  <!-- Bouton pour réinitialiser le filtre -->
  <button
    @click="clearFilter"
    class="px-4 py-1 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition"
  >
    Tout afficher
  </button>
</div>

      </div>

      <!-- Grid Templates -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
       <div
        v-for="template in paginatedTemplates"
        :key="template.id"
        class="p-4 bg-gray-800 rounded-lg shadow"
      >
          <!-- Badge Nouveau -->
          <span
            v-if="isNewTemplate(template.created_at)"
            class="absolute top-2 right-2 z-10 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full shadow"
          >
            Nouveau
          </span>

          <!-- Image + overlay -->
          <div class="relative z-0">
            <img
              :src="template.image"
              alt="Template"
              class="rounded mb-4 w-full object-cover max-h-40"
            />
            <div
              class="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center p-4 transition"
            >
              <p class="text-sm">{{ template.description }}</p>
            </div>
          </div>

          <!-- Titre + Icône sur la même ligne -->
          <div class="flex items-center justify-between mb-2">
            <h3 class="text-xl font-semibold">{{ template.title }}</h3>

            <!-- Icône Consulter -->
            <div
              @click="openModal(template)"
              class="w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center hover:bg-primary cursor-pointer transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>

          <p class="text-sm text-text/70">
            {{ template.langage }}
          </p>
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
          'bg-border text-white hover:bg-accent': currentPage !== page,
        }"
        class="w-10 h-10 flex items-center justify-center rounded-full transition"
      >
        {{ page }}
      </button>

      <!-- Bouton Suivant -->
      <button
        @click="currentPage < totalPages && currentPage++"
        :disabled="currentPage === totalPages"
        class="px-3 py-1 rounded-full bg-border text-white hover:bg-accent disabled:opacity-50 transition"
      >
        &raquo;
      </button>
    </div>

    <!-- Flèches retour -->
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
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
      >
        <div
          class="bg-background p-4 rounded-xl max-w-md w-full relative shadow-xl border border-border transform transition-all duration-300"
        >
          <!-- Image réelle -->
          <div class="relative mb-4 rounded-lg overflow-hidden">
            <img
              :src="selectedTemplate.image"
              alt="Template"
              class="w-full h-40 object-contain"
            />
            <!-- Bouton Fermer au-dessus de l'image -->
            <button
              @click="closeModal"
              class="absolute top-2 right-2 text-text hover:text-accent text-2xl font-bold transition z-50"
              aria-label="Fermer"
            >
              &times;
            </button>
          </div>

          <!-- Contenu en deux colonnes -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <!-- Colonne gauche : titre + description -->
            <div class="flex flex-col gap-2">
              <h3 class="text-xl font-extrabold text-primary">
                {{ selectedTemplate.title }}
              </h3>
              <p class="text-text/80 text-sm leading-relaxed">
                {{ selectedTemplate.description }}
              </p>
            </div>

            <!-- Colonne droite : infos + badge -->
            <div class="flex flex-col gap-2">
              <div class="flex flex-col gap-1 text-xs text-text/70">
                <span
                  ><strong>Catégorie :</strong>
                  {{ selectedTemplate.category || "Aucune" }}</span
                >
                <span
                  ><strong>Langage :</strong>
                  {{ selectedTemplate.langage }}</span
                >
                <span
                  ><strong>Prix :</strong> {{ selectedTemplate.price }}</span
                >
              </div>

              <!-- Badge type template -->
              <span
                class="inline-block px-2 py-1 text-xs font-semibold rounded-full w-max"
                :class="
                  selectedTemplate.type === 'free'
                    ? 'bg-green-500/20 text-green-700'
                    : 'bg-red-500/20 text-red-700'
                "
              >
                {{ selectedTemplate.type === "free" ? "Gratuit" : "Payant" }}
              </span>
            </div>
          </div>

          <!-- Boutons Utiliser / Payer -->
          <div class="flex gap-2">
            <button
              v-if="selectedTemplate.type === 'free'"
              @click="useTemplate(selectedTemplate)"
              class="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow transition transform hover:scale-105 text-sm"
            >
              Utiliser
            </button>

            <button
              v-else
              @click="payTemplate(selectedTemplate)"
              class="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow transition transform hover:scale-105 text-sm"
            >
              Payer
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import fleche from "../assets/fleche.png";
import fleche1 from "../assets/fleche1.png";
import retour from "../assets/retour.png";
import image1 from "../assets/cap1.png";
import { useRouter } from "vue-router";
import axios from "axios";
import logo from "../assets/logo.png";

const router = useRouter();
const templates = ref([]);
const searchQuery = ref("");
const filterType = ref("");
const filterLanguage = ref("");
const selectedTemplate = ref(null);
const templatesPerPage = 9; // nombre de templates par page
const currentPage = ref(1);
const totalPages = computed(() => {
  return Math.ceil(filteredTemplates.value.length / templatesPerPage);
});
// Templates à afficher pour la page courante
const paginatedTemplates = computed(() => {
  const start = (currentPage.value - 1) * templatesPerPage;
  const end = start + templatesPerPage;
  return filteredTemplates.value.slice(start, end);
});
const fetchTemplates = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/templateslist");
    templates.value = response.data.data.map((t) => ({
      ...t,
      name: t.title,
      image: `http://localhost:8000/${t.img_url}`,
      category: t.category?.name || "",
      langage: t.langage,
      isNew: Math.random() < 0.3, // 30% des templates sont "nouveaux" pour le visuel
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des templates :", error);
  }
};
const selectedCategory = ref(""); // catégorie sélectionnée

function filterBy(category) {
  selectedCategory.value = category;
  currentPage.value = 1; // reset pagination si besoin
}

function clearFilter() {
  selectedCategory.value = "";
}

// filteredTemplates inclut maintenant le filtre par catégorie
const filteredTemplates = computed(() => {
  return templates.value.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value ? t.category === selectedCategory.value : true;
    return matchesSearch && matchesCategory;
  });
});


function isNewTemplate(createdAt) {
  if (!createdAt) return false;

  const createdDate = new Date(createdAt);
  const today = new Date();

  // différence en millisecondes
  const diffTime = today - createdDate;

  // convertir en jours
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  return diffDays <= 20; // ✅ affiche le badge seulement si <= 20 jours
}
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

const useTemplate = (template) => {
  router.push({
    name: "details",
    query: { id: template.id },
    state: { template },
  });
};

function payTemplate(template) {
  alert(`Payer pour le template : ${template.name}`);
  closeModal();
}

onMounted(() => {
  fetchTemplates();
});
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