<template>
  <div class="min-h-screen bg-background text-text">
    <!-- Navbar -->
    <nav
      class="bg-gradient-to-r from-border via-primary to-0F172A animate-gradient relative fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 shadow-md"
    >
<h1 class="text-3xl font-bold text-white-800 transition-transform duration-300 hover:scale-110">
  Temply
</h1>      <button
        @click="isMenuOpen = !isMenuOpen"
        class="lg:hidden text-text focus:outline-none"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path v-if="!isMenuOpen" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Liens Desktop -->
      <ul class="hidden lg:flex gap-8 mx-auto">
        <li><a href="#" class="hover:text-accent transition">Accueil</a></li>
        <li>
          <router-link to="/categories" class="hover:text-accent transition"
            >Categories</router-link
          >
        </li>
        <li>
          <router-link to="/templates" class="hover:text-accent transition"
            >Templates</router-link
          >
        </li>
        <li>
          <a href="#contact" class="hover:text-accent transition">Contact</a>
        </li>
        <li>
          <a href="#about" class="hover:text-accent transition">A propos</a>
        </li>
        <li>
          <a href="#figma" class="hover:text-accent transition"
            >Convertisseur Figma(beta)</a
          >
        </li>
      </ul>

     <button
  @click="isModalOpen = true; isLogin = true"
  class="hidden lg:block ml-auto bg-accent text-background px-4 py-2 rounded hover:bg-primary transition cursor-not-allowed"
  disabled
>
  Connexion
</button>

      <!-- Menu Mobile -->
      <transition name="fade">
        <div
          v-if="isMenuOpen"
          class="absolute top-full left-0 w-full bg-background text-text border-t border-border flex flex-col items-center gap-4 py-4 lg:hidden"
        >
          <a href="#" class="hover:text-accent transition">Accueil</a>
          <router-link to="/categories" class="hover:text-accent transition"
            >Categories</router-link
          >
          <router-link to="/templates" class="hover:text-accent transition"
            >Templates</router-link
          >
          <a href="#contact" class="hover:text-accent transition">Contact</a>
          <a href="#about" class="hover:text-accent transition">A propos</a>
          <button
            @click="
              isModalOpen = true;
              isLogin = true;
            "
            class="block bg-accent text-background px-4 py-2 rounded hover:bg-primary transition"
          >
            Connexion
          </button>
        </div>
      </transition>
    </nav>

    <!-- Hero Section Améliorée -->
    <header
      class="relative flex flex-col justify-center items-center min-h-screen text-center px-6 mb-16 sm:mb-20 md:mb-24 overflow-hidden"
    >
      <!-- Fond animé -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-border via-primary to-0F172A animate-gradient"
      ></div>
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <!-- Contenu -->
      <div class="relative z-10 mt-16 md:mt-24">
        <h1
          class="text-6xl font-extrabold mb-4 text-white drop-shadow-lg animate-float"
        >
          Temply
        </h1>

        <!-- Texte animé -->
        <p
          class="text-xl text-white/90 max-w-2xl mb-6 mx-auto font-light typewriter"
        >
          Bibliothèque moderne de composants front-end pour créer vite et bien
        </p>

        <!-- Avantages clés -->
        <div class="flex flex-col md:flex-row gap-6 mb-8 justify-center">
          <div
            class="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg hover:scale-105 transition w-full md:w-60"
          >
            <h3 class="font-semibold text-white text-lg">Gain de temps</h3>
            <p class="text-sm text-white/70">
              Des composants prêts à l’emploi pour vos projets.
            </p>
          </div>
          <div
            class="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg hover:scale-105 transition w-full md:w-60"
          >
            <h3 class="font-semibold text-white text-lg">100% Responsive</h3>
            <p class="text-sm text-white/70">
              Adaptés à mobile, tablette et desktop.
            </p>
          </div>
          <div
            class="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg hover:scale-105 transition w-full md:w-60"
          >
            <h3 class="font-semibold text-white text-lg">Design moderne</h3>
            <p class="text-sm text-white/70">
              Des composants stylés et cohérents pour vos interfaces.
            </p>
          </div>
        </div>

        <!-- CTA -->
        <RouterLink
          to="/templates"
          class="inline-block px-8 py-3 bg-accent hover:bg-primary transition rounded-full text-white font-semibold shadow-lg transform hover:scale-110 hover:rotate-1 btn-cta"
        >
          Commencer maintenant
        </RouterLink>
      </div>
    </header>

    <!-- Section Preview des Composants -->
    <section class="py-20 px-6 bg-background">
      <h2 class="text-4xl font-bold text-primary text-center mb-12">
        Découvrez quelques composants
      </h2>

      <!-- Album -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        <!-- Exemple de carte image -->
        <div
          v-for="(component, index) in components"
          :key="index"
          class="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
        >
          <!-- Image -->
          <img
            :src="component.image"
            :alt="component.name"
            class="w-full h-64 object-contain bg-black transform group-hover:scale-105 transition duration-500"
          />

          <!-- Overlay -->
          <div
            class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition duration-300"
          >
            <p class="text-white text-lg font-semibold">{{ component.name }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- Section A propos -->
    <section
      id="about"
      class="flex flex-col md:flex-row items-center justify-center gap-8 py-20 px-6"
    >
      <!-- Texte avec animation -->
      <div
        class="max-w-xl text-center md:text-left"
        data-aos="fade-right"
        data-aos-duration="1000"
      >
        <h3 class="text-4xl font-bold text-primary mb-4">
          Notre solution Temply
        </h3>
        <p class="text-lg text-text/80">
          Temply vous propose une collection moderne de composants frontend
          réutilisables et adaptables pour accélérer le développement de vos
          interfaces web. Gagnez du temps, restez cohérent et inspirez-vous !
        </p>
      </div>

      <!-- Image avec animation -->
      <img
        :src="logo"
        alt="Illustration Temply"
        class="w-full max-w-md rounded-lg shadow-lg"
        data-aos="zoom-in-left"
        data-aos-delay="300"
        data-aos-duration="1000"
      />
    </section>
    <section id="figma" class="py-20 bg-gray-50">
      <div class="max-w-5xl mx-auto text-center px-6">
        <!-- Badge Beta -->
        <span
          class="inline-block px-4 py-1 text-sm font-medium text-purple-700 bg-purple-100 rounded-full mb-4"
        >
          🚀 Nouveau · Fonctionnalité BETA
        </span>

        <!-- Titre -->
        <h2 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
          Convertissez vos maquettes Figma en
          <span class="text-purple-600">HTML/CSS</span> instantanément
        </h2>

        <!-- Description -->
        <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Importez votre maquette <span class="font-semibold">Figma</span> et
          obtenez un
          <span class="text-indigo-600 font-semibold"
            >code HTML/CSS propre et structuré</span
          >
          pour démarrer plus vite vos projets.
          <br />
          ⚠️ Ce n’est pas un convertisseur magique : il génère seulement une
          base solide pour accélérer votre développement.
        </p>
        <!-- Bouton -->
        <button
          @click="loginWithFigma"
          class="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-medium rounded-xl shadow-lg transition duration-300"
        >
          🔗 Se connecter avec Figma
        </button>

        <!-- Illustration / Image -->
        <div class="mt-12">
          <img
            :src="capturechat"
            alt="Conversion Figma vers Code"
            class="mx-auto rounded-2xl shadow-xl w-full md:w-3/4"
          />
        </div>
      </div>
    </section>

    <!-- Section Contact -->
    <section
      id="contact"
      class="bg-background py-20 px-6 text-text"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div class="max-w-4xl mx-auto text-center">
        <h3 class="text-4xl font-bold text-primary mb-4">Contactez-nous</h3>
        <p class="text-text/80 mb-10">
          Une question ? Une suggestion ? N'hésitez pas à nous écrire via le
          formulaire ci-dessous.
        </p>

        <form @submit.prevent class="grid gap-6 md:grid-cols-2">
          <!-- Nom -->
          <div class="flex flex-col text-left">
            <label class="mb-1 text-sm font-semibold">Nom</label>
            <input
              type="text"
              placeholder="Votre nom"
              class="px-4 py-2 rounded bg-border text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <!-- Email -->
          <div class="flex flex-col text-left">
            <label class="mb-1 text-sm font-semibold">Email</label>
            <input
              type="email"
              placeholder="Votre email"
              class="px-4 py-2 rounded bg-border text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <!-- Sujet -->
          <div class="md:col-span-2 flex flex-col text-left">
            <label class="mb-1 text-sm font-semibold">Sujet</label>
            <input
              type="text"
              placeholder="Sujet du message"
              class="px-4 py-2 rounded bg-border text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <!-- Message -->
          <div class="md:col-span-2 flex flex-col text-left">
            <label class="mb-1 text-sm font-semibold">Message</label>
            <textarea
              rows="5"
              placeholder="Votre message..."
              class="px-4 py-2 rounded bg-border text-white focus:outline-none focus:ring-2 focus:ring-accent resize-none"
            ></textarea>
          </div>

          <!-- Bouton -->
          <div class="md:col-span-2 text-center">
            <button
              type="submit"
              class="bg-accent hover:bg-primary text-background px-6 py-2 rounded-full transition"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </section>
    <router-view />
    <!-- Section Témoignages -->
    <section class="py-20 px-6 bg-gray-50">
      <h2 class="text-4xl font-bold text-primary text-center mb-12">
        Ce que disent nos utilisateurs
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center"
        >
          <img
            :src="testimonial.image"
            alt="Photo utilisateur"
            class="w-16 h-16 rounded-full mb-4"
          />
          <h3 class="font-semibold text-gray-600">{{ testimonial.name }}</h3>
          <p class="text-gray-600 mt-2">"{{ testimonial.comment }}"</p>
        </div>
      </div>
    </section>

    <!-- Section FAQ -->
    <section class="py-20 px-6 bg-background">
      <h2 class="text-4xl font-bold text-primary text-center mb-12">
        Questions fréquentes
      </h2>
      <div class="max-w-3xl mx-auto space-y-6">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="border border-gray-300 rounded-lg p-4 shadow-sm"
        >
          <h3 class="font-semibold text-lg text-primary">
            {{ faq.question }}
          </h3>
          <p class="text-gray-600 mt-2">{{ faq.answer }}</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer
      class="bg-border text-text py-10 px-6 mt-20"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div
        class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
      >
        <!-- Logo + description -->
        <div>
          <img
            :src="logo"
            alt="Temply Logo"
            class="h-10 mb-4 mx-auto md:mx-0"
          />
          <p class="text-text/70">
            Temply est votre bibliothèque moderne de templates front-end pour
            créer rapidement des interfaces élégantes.
          </p>
        </div>

        <!-- Liens rapides -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-primary">Liens</h4>
          <ul class="space-y-2">
            <li>
              <a href="#about" class="hover:text-accent transition">À propos</a>
            </li>
            <li>
              <a href="#contact" class="hover:text-accent transition"
                >Contact</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-accent transition">Templates</a>
            </li>
          </ul>
        </div>

        <!-- Réseaux sociaux -->
        <div>
          <h4 class="text-lg font-semibold mb-4 text-primary">Suivez-nous</h4>
          <div class="flex justify-center md:justify-start gap-4">
            <a href="#" class="hover:text-accent transition">Facebook</a>
            <a href="https://www.instagram.com/temply_ui/" class="hover:text-accent transition">Instagram</a>
            <a href="https://github.com/fadwadhmaid/Temply" class="hover:text-accent transition">GitHub</a>
          </div>
        </div>
      </div>

      <!-- Ligne de séparation -->
      <div
        class="border-t border-text/20 mt-8 pt-4 text-center text-sm text-text/60"
      >
        © 2025 Temply. Tous droits réservés.
      </div>
    </footer>

    <transition name="fade">
      <div
        v-if="showErrorModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-[200]"
      >
        <div
          class="bg-red-100 border border-red-400 text-red-700 rounded-lg p-6 w-full max-w-sm shadow-lg relative"
        >
          <button
            class="absolute top-2 right-2 text-red-700 hover:text-red-900"
            @click="showErrorModal = false"
          >
            ✕
          </button>

          <h3 class="text-lg font-bold mb-4 text-red-700">Erreur</h3>
          <ul class="list-disc list-inside space-y-1">
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
      >
        <div class="relative w-[400px]">
          <button
            class="absolute top-3 right-3 text-text hover:text-accent z-10"
            @click="isModalOpen = false"
          >
            ✕
          </button>

          <transition name="modal-slide" mode="out-in">
            <div
              v-if="isLogin"
              key="login"
              class="bg-background p-8 rounded-xl shadow-lg relative"
            >
              <h2 class="text-2xl font-bold mb-4 text-primary text-center">
                Connexion
              </h2>
              <form @submit.prevent="loginUser" class="space-y-4">
                <div>
                  <label class="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    class="w-full px-4 py-2 rounded bg-border text-white focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Votre email"
                    v-model="loginForm.email"
                  />
                </div>
                <div>
                  <label class="block mb-1 font-medium">Mot de passe</label>
                  <input
                    type="password"
                    class="w-full px-4 py-2 rounded bg-border text-white focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Mot de passe"
                    v-model="loginForm.password"
                  />
                </div>

                <button
                  type="submit"
                  class="w-full bg-accent hover:bg-primary transition text-background px-4 py-2 rounded"
                >
                  Se connecter
                </button>
              </form>

              <p class="mt-4 text-sm text-center text-text">
                Pas de compte ?
                <span
                  class="text-accent cursor-pointer"
                  @click="isLogin = false"
                >
                  S’inscrire
                </span>
              </p>
            </div>

            <div
              v-else
              key="register"
              class="bg-background p-8 rounded-xl shadow-lg relative w-full max-w-3xl overflow-y-auto"
            >
              <h2 class="text-xl font-bold mb-6 text-primary text-center">
                Inscription
              </h2>

              <form
                v-if="!isRegistered"
                @submit.prevent="registerUser"
                class="grid grid-cols-2 gap-4"
                enctype="multipart/form-data"
              >
                <div class="col-span-1">
                  <label class="block mb-1 font-medium text-sm">Nom</label>
                  <input
                    type="text"
                    v-model="form.name"
                    class="w-full px-4 py-2 rounded bg-border text-white focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    placeholder="Votre nom"
                  />
                </div>
                <div class="col-span-1">
                  <label class="block mb-1 font-medium text-sm">Email</label>
                  <input
                    type="email"
                    v-model="form.email"
                    class="w-full px-4 py-2 rounded bg-border text-white focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    placeholder="Votre email"
                  />
                </div>

                <div class="col-span-2">
                  <label class="block mb-1 font-medium text-sm"
                    >Mot de passe</label
                  >
                  <input
                    type="password"
                    v-model="form.password"
                    class="w-full px-4 py-2 rounded bg-border text-white focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    placeholder="Mot de passe"
                  />
                </div>

                <div class="col-span-2">
                  <label class="block mb-1 font-medium text-sm">
                    Confirmer Mot de passe
                  </label>
                  <input
                    type="password"
                    v-model="form.password_confirmation"
                    class="w-full px-4 py-2 rounded bg-border text-white focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    placeholder="Mot de passe"
                  />
                </div>

                <div class="col-span-2">
                  <label class="block mb-1 font-medium text-sm"
                    >Téléphone</label
                  >
                  <input
                    type="text"
                    v-model="form.telephone"
                    class="w-full px-4 py-2 rounded bg-border text-white focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                    placeholder="Votre téléphone"
                  />
                </div>
                <div class="col-span-2">
                  <label class="block mb-1 font-medium text-sm"
                    >Photo de profil</label
                  >

                  <input
                    id="file-upload"
                    type="file"
                    class="hidden"
                    @change="handleFileUpload"
                  />

                  <label
                    for="file-upload"
                    class="cursor-pointer text-accent hover:underline text-sm"
                  >
                    Insérer image
                  </label>
                </div>

                <div class="col-span-2">
                  <button
                    type="submit"
                    class="w-full bg-accent hover:bg-primary transition text-background px-4 py-2 rounded text-sm"
                  >
                    S'inscrire
                  </button>
                </div>
              </form>

              <div v-else class="flex flex-col items-center justify-center">
                <img :src="success" alt="Succès" class="w-24 h-24 mb-4" />
                <p class="text-green-500 font-semibold text-base">
                  Inscription réussie !
                </p>
                <button
                  @click="
                    isLogin = true;
                    isRegistered = false;
                  "
                  class="mt-4 bg-accent hover:bg-primary text-background px-4 py-2 rounded text-sm"
                >
                  Se connecter
                </button>
              </div>

              <p
                class="mt-4 text-xs text-center text-text"
                v-if="!isRegistered"
              >
                Déjà un compte ?
                <span
                  class="text-accent cursor-pointer"
                  @click="isLogin = true"
                >
                  Se connecter
                </span>
              </p>
            </div>
          </transition>
        </div>
      </div>
    </transition>

    <!-- Flèche retour en haut -->
    <button
      v-show="showBackToTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 bg-accent text-background p-3 rounded-full shadow-lg hover:bg-primary transition z-50 animate-bounce"
      data-aos="zoom-in"
    >
      <img :src="fleche" alt="fleche" class="h-7 w-auto" />
    </button>
  </div>
</template>

<script setup>
import AOS from "aos";
import { onMounted } from "vue";
import logo1 from "../assets/logo1.png";
import logo from "../assets/logo.png";
import newLogo from "../assets/newLogo.png";

import cap1 from "../assets/cap1.png";
import fadwa from "../assets/fadwa.jpg";
import comp1 from "../assets/comp1.png";
import comp2 from "../assets/comp2.jpg";
import comp3 from "../assets/comp3.png";
import comp4 from "../assets/comp4.png";
import user1 from "../assets/user1.jpg";
import user2 from "../assets/user2.jpg";
import user3 from "../assets/user3.jpg";
import capturechat from "../assets/capturechat.png";

import fleche from "../assets/fleche.png";
import success from "../assets/success.png";
import { useRouter } from "vue-router";

import axios from "axios";
import { ref, onUnmounted } from "vue";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
SwiperCore.use([Navigation, Pagination, Autoplay]);
// Pour afficher/cacher le dropdown
const showDropdown = ref(false);
const isMenuOpen = ref(false);
const isModalOpen = ref(false); // pour afficher le modal
const isLogin = ref(true); // pour savoir si c’est Connexion ou Inscription
const router = useRouter(); // hook pour la navigation
function loginWithFigma() {
  window.location.href = "http://localhost:8000/auth/figma";
}
function switchToRegister() {
  isLoginModalOpen.value = false;
  setTimeout(() => {
    isRegisterModalOpen.value = true;
  }, 300); // Laisse le temps à l'animation de se fermer
}

const components = [
  { name: "Navbar moderne", image: comp3 },
  { name: "Card produit", image: comp2 },
  { name: "Formulaire login", image: comp1 },
  { name: "Hero section", image: comp4 },
];

const copyCode = (code) => {
  navigator.clipboard.writeText(code).then(() => {
    alert("Code copié dans le presse-papier !");
  });
};
// Exemple de liste catégories
const categories = [
  "Navbar",
  "Header",
  "Cards",
  "Table",
  "Footer",
  "Landing page",
  "Alert",
];

const showBackToTop = ref(false);

const handleScroll = () => {
  const scrollY = window.scrollY;

  // Cacher le navbar si on a scrollé jusqu'à la section contact
  const contactSection = document.getElementById("contact");
  if (contactSection) {
    const offsetTop = contactSection.offsetTop;
    const offsetBottom = offsetTop + contactSection.offsetHeight;
  }

  // Afficher la flèche retour en haut après 500px
  showBackToTop.value = scrollY > 500;
};
const scrollToTop = () => {
  document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
};
/**** inscription ****/

const errors = ref([]);
const showErrorModal = ref(false); // Pour afficher le popup d'alerte
const isRegistered = ref(false);
const photoProfile = ref(null);

// Déclaration du formulaire
const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  telephone: "",
});

const handleFileUpload = (event) => {
  photoProfile.value = event.target.files[0];
};

const registerUser = async () => {
  errors.value = []; // Réinitialiser les erreurs

  // Vérification des champs vides
  if (!form.value.name) errors.value.push("Le nom est requis.");
  if (!form.value.email) errors.value.push("L'email est requis.");
  if (!form.value.password) errors.value.push("Le mot de passe est requis.");
  if (!form.value.password_confirmation)
    errors.value.push("La confirmation du mot de passe est requise.");
  if (!form.value.telephone) errors.value.push("Le téléphone est requis.");
  if (form.value.password !== form.value.password_confirmation)
    errors.value.push("Les mots de passe ne correspondent pas.");

  if (errors.value.length) {
    showErrorModal.value = true; // Afficher le modal d'erreurs
    return; // Arrêter si erreurs
  }

  try {
    const formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("email", form.value.email);
    formData.append("password", form.value.password);
    formData.append("password_confirmation", form.value.password_confirmation);
    formData.append("telephone", form.value.telephone);
    if (photoProfile.value)
      formData.append("photo_profile", photoProfile.value);

    const response = await axios.post(
      "http://localhost:8000/api/register",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("Inscription réussie :", response.data);
    isRegistered.value = true;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.email) {
      errors.value = ["Cet email est déjà utilisé."];
    } else {
      errors.value = ["Erreur lors de l'inscription."];
    }
    showErrorModal.value = true; // Afficher le modal d'erreurs
    console.error(error.response?.data || error);
  }
};
/**** end inscription ****/

/***login  */
// Variables pour le formulaire de connexion
const loginForm = ref({
  email: "",
  password: "",
});
const loginUser = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/login",
      loginForm.value,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("Connexion réussie :", response.data);

    // Rediriger vers le profil
    router.push("/profile");
  } catch (error) {
    if (error.response) {
      if (error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        console.error("Erreurs de validation :", validationErrors);
      } else {
        console.error("Erreur de connexion :", error.response.data);
      }
    } else if (error.request) {
      console.error("Pas de réponse du serveur :", error.request);
    } else {
      console.error("Erreur Axios :", error.message);
    }
  }
};

/**end login */
onMounted(() => {
  AOS.init();
  setTimeout(() => AOS.refresh(), 500); // ← ajoute ça
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const testimonials = [
  {
    name: "Ali B.",
    comment: "Temply m’a fait gagner énormément de temps, super pratique !",
    image: user1,
  },
  {
    name: "Sara K.",
    comment: "Une bibliothèque claire et bien organisée, j’adore le design.",
    image: user2,
  },
  {
    name: "Mouhamed L.",
    comment:
      "Même sans être experte, j’ai pu intégrer des composants facilement.",
    image: user3,
  },
];

const faqs = [
  {
    question: "Comment installer Temply ?",
    answer:
      "Un simple npm install suffit, puis importez les composants que vous voulez.",
  },
  {
    question: "Quels frameworks sont supportés ?",
    answer:
      "Temply est basé sur Vue.js et Tailwind, d’autres viendront bientôt.",
  },
  {
    question: "Puis-je utiliser Temply dans un projet pro ?",
    answer: "Oui, Temply est conçu pour un usage personnel et professionnel.",
  },
];
</script>
<style>
/* Animation fade pour le dropdown */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
/* Transition latérale entre modals */
.modal-slide-enter-active,
.modal-slide-leave-active {
  transition: all 0.5s ease;
  position: absolute;
  width: 100%;
}
.modal-slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.modal-slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
/* Agrandir le slide actif et réduire les autres */
.swiper-slide-active {
  transform: scale(1) !important;
  opacity: 1 !important;
}
.swiper-slide {
  width: 300px; /* Ajuster la largeur du slide */
  transition: transform 0.5s, opacity 0.5s;
}
.swiper-button-next,
.swiper-button-prev {
  color: white; /* couleur */
  top: 50%;
  transform: translateY(-50%);
}

.swiper-button-prev {
  left: -40px; /* sort de la card */
}

.swiper-button-next {
  right: -40px; /* sort de la card */
}

@keyframes gradient {
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
  animation: gradient 8s ease infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}
.typewriter {
  overflow: hidden;
  border-right: 0.15em solid #fff;
  margin: 0 auto;
  letter-spacing: 0.05em;
  animation: typing 3s steps(40, end), blink-caret 0.8s step-end infinite;
}

/* Animation reste la même */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: white;
  }
}
</style>
