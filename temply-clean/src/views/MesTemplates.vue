<template>
  <div class="min-h-screen bg-background text-text p-6">
    <!-- 🔙 Bouton retour -->
    <button @click="goBack" class="mb-6 text-sm bg-accent px-4 py-2 text-white rounded hover:bg-primary transition">
      ← Retour
    </button>

    <!-- 🔎 Barre de recherche et tri -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 max-w-4xl mx-auto">
      <input
        v-model="searchQuery"
        type="search"
        placeholder="Rechercher un template..."
        class="flex-grow p-2 rounded bg-border text-white placeholder-white/60 focus:outline-none"
      />
     
    </div>

    <!-- ⭐ Templates favoris -->
    <section class="mb-12 max-w-5xl mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
        Templates favoris
        <span v-if="filteredFavoris.length === 0" class="text-sm text-white/60">(Aucun template)</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <template v-for="template in paginatedFavoris" :key="template.id">
          <div class="bg-border p-4 rounded shadow relative group hover:shadow-xl transition">
            <img :src="cap1" alt="" class="rounded mb-3 w-full h-40 object-cover" />
            <h3 class="text-lg font-semibold mb-2">{{ template.titre }}</h3>

            <!-- Boutons -->
            <div class="flex justify-between items-center">
              <button
                @click="openModal(template)"
                class="text-sm text-accent hover:underline"
                aria-label="Voir les détails"
              >
                Voir
              </button>

              <button
                @click="toggleFavoris(template)"
                class="text-sm px-2 py-1 rounded text-white transition"
                :class="isFavori(template) ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'"
                aria-label="Ajouter ou retirer des favoris"
              >
                {{ isFavori(template) ? 'Retirer' : 'Ajouter' }}
              </button>
            </div>

            <!-- Icone coeur pour favoris -->
            <svg
              v-if="isFavori(template)"
              xmlns="http://www.w3.org/2000/svg"
              class="absolute top-4 right-4 h-6 w-6 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18l-6.828-6.828a4 4 0 010-5.656z"
              />
            </svg>
          </div>
        </template>
      </div>

      <!-- Pagination favoris -->
      <div v-if="pageFavorisCount > 1" class="flex justify-center mt-6 space-x-3">
        <button
          v-for="p in pageFavorisCount"
          :key="p"
          @click="pageFavoris = p"
          :class="[
            'px-3 py-1 rounded',
            p === pageFavoris ? 'bg-accent text-white' : 'bg-border text-white/60 hover:bg-accent hover:text-white',
          ]"
        >
          {{ p }}
        </button>
      </div>
    </section>

    <!-- 💸 Templates achetés -->
    <section class="max-w-5xl mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-primary flex items-center gap-2">
        Templates achetés
        <span v-if="filteredAchetes.length === 0" class="text-sm text-white/60">(Aucun template)</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <template v-for="template in paginatedAchetes" :key="template.id">
          <div class="bg-border p-4 rounded shadow relative group hover:shadow-xl transition">
            <img :src="cap1" alt="" class="rounded mb-3 w-full h-40 object-cover" />
            <h3 class="text-lg font-semibold mb-2">{{ template.titre }}</h3>

            <div class="flex justify-between items-center">
              <button
                @click="downloadTemplate(template)"
                class="text-sm text-green-400 hover:underline"
                aria-label="Télécharger le template"
              >
                Consulter
              </button>

              <button
                @click="toggleFavoris(template)"
                class="text-sm px-2 py-1 rounded text-white transition"
                :class="isFavori(template) ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-600 hover:bg-gray-700'"
                aria-label="Ajouter ou retirer des favoris"
              >
                {{ isFavori(template) ? 'Retirer' : 'Ajouter' }}
              </button>
            </div>

            <!-- Icone coeur pour favoris -->
            <svg
              v-if="isFavori(template)"
              xmlns="http://www.w3.org/2000/svg"
              class="absolute top-4 right-4 h-6 w-6 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18l-6.828-6.828a4 4 0 010-5.656z"
              />
            </svg>
          </div>
        </template>
      </div>

      <!-- Pagination achetés -->
      <div v-if="pageAchetesCount > 1" class="flex justify-center mt-6 space-x-3">
        <button
          v-for="p in pageAchetesCount"
          :key="p"
          @click="pageAchetes = p"
          :class="[
            'px-3 py-1 rounded',
            p === pageAchetes ? 'bg-accent text-white' : 'bg-border text-white/60 hover:bg-accent hover:text-white',
          ]"
        >
          {{ p }}
        </button>
      </div>
    </section>

    <!-- Modal détails template -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      @click.self="closeModal"
    >
      <div class="bg-background rounded-lg p-6 max-w-xl w-full relative">
        <button
          @click="closeModal"
          class="absolute top-3 right-3 text-white text-xl font-bold hover:text-accent"
          aria-label="Fermer la fenêtre"
        >
          ×
        </button>
        <img :src="modalTemplate.image" alt="" class="rounded mb-4 w-full h-48 object-cover" />
        <h3 class="text-2xl font-semibold mb-2">{{ modalTemplate.titre }}</h3>
        <p class="text-white/70 mb-4">Description détaillée du template (à personnaliser).</p>
        <button
          @click="downloadTemplate(modalTemplate)"
          class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Consulter
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import cap1 from "../assets/cap1.png";

const router = useRouter();
const goBack = () => router.back();

// Données initiales (à remplacer par API)
const favoris = ref([
  { id: 1, titre: 'Carte de visite Pro' },
  { id: 2, titre: 'Flyer promotionnel'},
  { id: 3, titre: 'Flyer promotionnel'},
  { id: 4, titre: 'Flyer promotionnel'},
]);

const achetes = ref([
  { id: 3, titre: 'Brochure événement' },
  { id: 4, titre: 'Menu restaurant' },
  { id: 5, titre: 'Menu restaurant' },
  { id: 6, titre: 'Menu restaurant' },

]);

// États UI
const searchQuery = ref('');
const sortOrder = ref('asc');

const pageFavoris = ref(1);
const pageAchetes = ref(1);
const itemsPerPage = 3;

// Modal détails
const showModal = ref(false);
const modalTemplate = ref(null);

const openModal = (template) => {
  modalTemplate.value = template;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  modalTemplate.value = null;
};

// Favoris toggle
const favorisIds = ref(favoris.value.map((t) => t.id));

const isFavori = (template) => favorisIds.value.includes(template.id);

const toggleFavoris = (template) => {
  if (isFavori(template)) {
    favorisIds.value = favorisIds.value.filter((id) => id !== template.id);
  } else {
    favorisIds.value.push(template.id);
  }
};

// Filtrage + tri
const filteredFavoris = computed(() => {
  return favoris.value
    .filter((t) => t.titre.toLowerCase().includes(searchQuery.value.toLowerCase()))
    .sort((a, b) =>
      sortOrder.value === 'asc'
        ? a.titre.localeCompare(b.titre)
        : b.titre.localeCompare(a.titre)
    );
});

const filteredAchetes = computed(() => {
  return achetes.value
    .filter((t) => t.titre.toLowerCase().includes(searchQuery.value.toLowerCase()))
    .sort((a, b) =>
      sortOrder.value === 'asc'
        ? a.titre.localeCompare(b.titre)
        : b.titre.localeCompare(a.titre)
    );
});

// Pagination calculée
const pageFavorisCount = computed(() =>
  Math.ceil(filteredFavoris.value.length / itemsPerPage)
);
const pageAchetesCount = computed(() =>
  Math.ceil(filteredAchetes.value.length / itemsPerPage)
);

const paginatedFavoris = computed(() =>
  filteredFavoris.value.slice(
    (pageFavoris.value - 1) * itemsPerPage,
    pageFavoris.value * itemsPerPage
  )
);

const paginatedAchetes = computed(() =>
  filteredAchetes.value.slice(
    (pageAchetes.value - 1) * itemsPerPage,
    pageAchetes.value * itemsPerPage
  )
);

// Action téléchargement (factice)
const downloadTemplate = (template) => {
  alert(`Téléchargement du template: ${template.titre}`);
};
</script>
