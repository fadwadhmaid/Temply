<template>
  <div class="min-h-screen bg-background text-text px-6 pt-20 relative">

    <!-- 🧭 Onglets -->
    <div class="max-w-5xl mx-auto mb-8">
      <nav class="flex gap-4 justify-center text-sm font-medium text-white">
        <button @click="currentTab = 'profil'" :class="tabClass('profil')">Profil</button>
        <button @click="currentTab = 'paiements'" :class="tabClass('paiements')">Paiements</button>
        <button @click="currentTab = 'notifications'" :class="tabClass('notifications')" class="relative">
          <span>Notifications</span>
          <span v-if="notifications.length > 0"
                class="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            {{ notifications.length }}
          </span>
        </button>
        <button @click="currentTab = 'parametres'" :class="tabClass('parametres')">Paramètres</button>
      </nav>
    </div>

    <!-- 🤖 Chatbot -->
    <div class="fixed bottom-6 right-6 z-50">
      <button @click="toggleBot" class="bg-accent p-3 rounded-full shadow hover:scale-110 transition">🤖</button>
      <div v-if="showBot" class="mt-2 bg-border text-white p-4 rounded-lg shadow-lg w-72">
        <p class="text-sm font-medium">Salut {{ user.name }}, une question ?</p>
        <input v-model="chatMessage" type="text" class="w-full mt-2 p-2 rounded bg-background text-white placeholder-gray-400" placeholder="Écris ici..." />
      </div>
    </div>

    <!-- 👤 Profil -->
    <div v-if="currentTab === 'profil'">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-primary mb-2" data-aos="fade-down">Bienvenue, {{ user.name }} 👋</h1>
        <p class="text-text/70 text-lg" data-aos="fade-down" data-aos-delay="150">Voici ton tableau de bord personnel</p>

        <button @click="logout" class="absolute top-4 right-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition z-50">Se déconnecter</button>
      </div>

      <div class="max-w-4xl mx-auto bg-border rounded-xl p-6 shadow-lg grid md:grid-cols-2 gap-6 items-center relative" data-aos="zoom-in-up">
        <div class="relative w-40 h-40 mx-auto">
          <img :src="avatar" alt="avatar" class="w-full h-full rounded-full object-cover border-4 border-accent cursor-pointer" @click="triggerFileInput" />
          <input ref="fileInput" type="file" accept="image/*" @change="uploadAvatar" class="hidden" />
          <span class="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-xs text-white bg-black/60 px-2 py-1 rounded">Changer</span>
        </div>

        <div>
          <h2 class="text-2xl font-semibold mb-2">{{ user.name }}</h2>
          <p class="text-sm text-text/60">Email : {{ user.email }}</p>
          <p class="text-sm text-text/60 mt-1">Inscrit depuis : {{ user.createdAt }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-5xl mx-auto">
        <div class="bg-border p-6 rounded-xl shadow hover:shadow-xl transition" data-aos="flip-left">
          <h3 class="text-xl font-bold text-accent">12</h3>
          <p class="text-sm text-text/60 mt-1">Templates favoris</p>
        </div>
        <div class="bg-border p-6 rounded-xl shadow hover:shadow-xl transition" data-aos="flip-left" data-aos-delay="100">
          <h3 class="text-xl font-bold text-accent">5</h3>
          <p class="text-sm text-text/60 mt-1">Commentaires postés</p>
        </div>
        <div class="bg-border p-6 rounded-xl shadow hover:shadow-xl transition" data-aos="flip-left" data-aos-delay="200">
          <h3 class="text-xl font-bold text-accent">3</h3>
          <p class="text-sm text-text/60 mt-1">Templates achetés</p>
        </div>
      </div>
    </div>

    <!-- 💳 Paiements -->
    <div v-if="currentTab === 'paiements'" class="max-w-4xl mx-auto mt-12 bg-border p-6 rounded-xl shadow-lg" data-aos="fade-up">
      <h3 class="text-xl font-bold mb-4 text-primary">Évolution de tes paiements</h3>
      <canvas ref="chartRef" height="100"></canvas>
      <table class="w-full mt-6 text-sm text-white/80">
        <thead>
          <tr class="text-left border-b border-white/10">
            <th class="py-2">Date</th>
            <th class="py-2">Montant</th>
            <th class="py-2">Méthode</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in paymentHistory" :key="i" class="border-b border-white/5 hover:bg-white/5 transition">
            <td class="py-2">{{ item.date }}</td>
            <td class="py-2">{{ item.amount }} TND</td>
            <td class="py-2">{{ item.method }}</td>
          </tr>
        </tbody>
      </table>
      <!-- 🧾 Factures -->
<div class="mt-10">
  <h3 class="text-xl font-bold mb-4 text-primary">Factures</h3>
  <div class="space-y-4">
    <div
      v-for="(facture, index) in factures"
      :key="index"
      class="bg-background border border-white/10 rounded p-4 flex justify-between items-center"
    >
      <div>
        <p class="text-white/80 text-sm mb-1">Facture #{{ facture.id }}</p>
        <p class="text-white/60 text-xs">Date : {{ facture.date }} | Montant : {{ facture.montant }} TND</p>
      </div>
      <button
        @click="telechargerFacture(facture)"
        class="text-sm bg-accent text-white px-4 py-1 rounded hover:bg-primary transition"
      >
        Télécharger
      </button>
    </div>
  </div>
</div>

    </div>

    <!-- 🔔 Notifications -->
    <div v-if="currentTab === 'notifications'" class="max-w-3xl mx-auto mt-12 bg-border p-6 rounded-xl shadow-lg" data-aos="fade-up">
      <h3 class="text-xl font-bold text-primary mb-4">Notifications récentes</h3>
      <ul class="space-y-3">
        <li v-for="(note, i) in notifications" :key="i" class="bg-background border-l-4 border-accent px-4 py-3 rounded">
          <p class="text-sm">{{ note }}</p>
        </li>
      </ul>
    </div>

    <!-- ⚙️ Paramètres -->
    <div v-if="currentTab === 'parametres'" class="max-w-2xl mx-auto mt-12 bg-border p-6 rounded-xl shadow-lg" data-aos="fade-up">
      <h3 class="text-xl font-bold text-primary mb-4">Modifier le profil</h3>
      <input v-model="user.email" type="email" class="w-full bg-background text-white p-2 rounded mb-3" placeholder="Modifier l'email" />
      <input type="password" class="w-full bg-background text-white p-2 rounded mb-3" placeholder="Nouveau mot de passe" />
      <button @click="saveProfile" class="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">Enregistrer les modifications</button>
    </div>

    <!-- 🚀 Actions -->
    <div class="text-center mt-12 space-x-4">
      <button @click="goToTemplates" class="bg-accent text-white px-5 py-2 rounded hover:bg-primary transition"><RouterLink to="/mestemplates" class=" transition"
            >Voir mes templates</RouterLink></button>
     
    </div>

    <!-- 🧱 Marge bas de page -->
    <div class="py-16"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";
import Chart from "chart.js/auto";
import { useRouter } from "vue-router";
import avatar from "../assets/avatar.jpg";

const router = useRouter();
const fileInput = ref(null);

const user = ref({
  name: "Fadwa",
  email: "fadwa@example.com",
  createdAt: "01/07/2024",
});

const currentTab = ref("profil");
const chartRef = ref(null);
const chartInstance = ref(null);
const showBot = ref(false);
const chatMessage = ref("");
const notifications = ref([
  "Vous avez reçu un nouveau template !",
  "Votre paiement a été traité avec succès.",
  "Nouvelle fonctionnalité disponible sur votre tableau de bord.",
]);

const paymentHistory = ref([
  { date: "01/07/2024", amount: 20, method: "Carte bancaire" },
  { date: "15/07/2024", amount: 35, method: "PayPal" },
  { date: "01/08/2024", amount: 60, method: "Carte bancaire" },
]);

const toggleBot = () => showBot.value = !showBot.value;
const tabClass = (tab) =>
  `px-4 py-2 rounded transition ${currentTab.value === tab ? 'bg-primary text-white' : 'bg-border text-white/60 hover:text-white'}`;

const saveProfile = () => {
  alert("Modifications sauvegardées !");
};

const goToTemplates = () => router.push({ name: "home" });
const logout = () => router.push({ name: "login" });

const uploadAvatar = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      user.value.avatar = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const triggerFileInput = () => {
  fileInput.value?.click();
};

const historique = ref([
  { id: 1, titre: 'Carte Pro', date: '01/08/2025' },
  { id: 2, titre: 'Menu Restaurant', date: '03/08/2025' },
]);

const renderChart = () => {
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  const ctx = chartRef.value?.getContext("2d");
  if (!ctx) return;

  chartInstance.value = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Jan", "Fév", "Mars", "Avr", "Mai", "Juin"],
      datasets: [
        {
          label: "Paiements (TND)",
          data: [20, 35, 15, 40, 25, 60],
          borderColor: "#14b8a6",
          fill: true,
          backgroundColor: "rgba(20, 184, 166, 0.1)",
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "#fff" } },
      },
      scales: {
        x: { ticks: { color: "#fff" } },
        y: { ticks: { color: "#fff" } },
      },
    },
  });
};
// Simuler des factures
const factures = ref([
  { id: 101, date: "01/08/2024", montant: 20 },
  { id: 102, date: "15/08/2024", montant: 35 },
  { id: 103, date: "01/09/2024", montant: 60 },
]);

const telechargerFacture = (facture) => {
  // Simulation du téléchargement : créer un Blob texte
  const content = `
    Facture #${facture.id}
    -----------------------
    Date: ${facture.date}
    Montant: ${facture.montant} TND
    Merci pour votre achat.
  `;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  // Créer un lien pour forcer le téléchargement
  const link = document.createElement('a');
  link.href = url;
  link.download = `facture-${facture.id}.txt`; // ou .pdf si tu génères un PDF
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // Alerte ou notification
  alert(`📄 Facture #${facture.id} téléchargée !`);
};

watch(currentTab, async (newTab) => {
  if (newTab === "paiements") {
    await nextTick();
    renderChart();
  }
});

onMounted(() => {
  AOS.init({ duration: 800 });
});
</script>

<style>
canvas {
  background-color: transparent;
}
</style>
