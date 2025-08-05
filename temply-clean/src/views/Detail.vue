<template>
  <div class="min-h-screen p-6 bg-background text-text">
    <div class="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold mb-4">{{ template.name }}</h1>

      <div class="mb-6">
        <button
          @click="mode = 'preview'"
          class="px-4 py-2 rounded-l bg-primary text-white hover:bg-accent"
        >
          Aperçu
        </button>
        <button
          @click="mode = 'code'"
          class="px-4 py-2 rounded-r bg-secondary text-white hover:bg-accent"
        >
          Code
        </button>
      </div>

      <!-- Aperçu -->
      <div v-if="mode === 'preview'">
        <img :src="template.image" alt="preview" class="w-full rounded" />
      </div>

      <!-- Code -->
      <div v-else class="relative bg-gray-100 p-4 rounded">
        <pre class="whitespace-pre-wrap text-sm">{{ template.code }}</pre>
        <button
          @click="copyCode"
          class="absolute top-2 right-2 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 text-xs"
        >
          📋 Copier
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const template = ref({});
const mode = ref("preview");

onMounted(() => {
  const state = history.state;
  if (state?.template) {
    template.value = state.template;
  } else {
    // fallback (optionnel)
    template.value = {
      name: "Template non trouvé",
      image: "",
      code: "// Code indisponible",
    };
  }
});

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(template.value.code);
    alert("Code copié !");
  } catch {
    alert("Erreur lors de la copie.");
  }
};
</script>
