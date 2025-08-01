<template>
  <div class="min-h-screen bg-background text-text">
    <nav
      class="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-background shadow-md"
    >
      <!-- Logo -->
      <img :src="logo" alt="Logo Temply" class="h-10 w-auto" />

      <!-- Icône menu burger sur mobile -->
      <button
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

      <!-- Liens de navigation (desktop) -->
      <ul class="hidden lg:flex gap-8 mx-auto">
        <li><a href="#" class="hover:text-accent transition">Accueil</a></li>
        <li
          class="relative"
          @mouseenter="showDropdown = true"
          @mouseleave="showDropdown = false"
        >
          <a href="#" class="hover:text-accent transition cursor-pointer"
            >Catégories</a
          >
          <transition name="fade">
            <div
              v-if="showDropdown"
              class="absolute top-full left-0 mt-2 w-48 bg-background rounded shadow-lg border border-border text-text z-50"
            >
              <ul>
                <li
                  v-for="(cat, index) in categories"
                  :key="index"
                  class="px-4 py-2 hover:bg-accent hover:text-white cursor-pointer"
                >
                  {{ cat }}
                </li>
              </ul>
            </div>
          </transition>
        </li>
        <li><a href="#" class="hover:text-accent transition">Templates</a></li>
        <li>
          <a href="#contact" class="hover:text-accent transition">Contact</a>
        </li>
        <li>
          <a href="#about" class="hover:text-accent transition">A propos</a>
        </li>
      </ul>

      <!-- Bouton Connexion -->
      <button
        @click="isLoginModalOpen = true"
        class="hidden lg:block ml-auto bg-accent text-background px-4 py-2 rounded hover:bg-primary transition"
      >
        Connexion
      </button>

      <!-- Menu mobile déroulant -->
      <transition name="fade">
        <div
          v-if="isMenuOpen"
          class="absolute top-full left-0 w-full bg-background text-text border-t border-border flex flex-col items-center gap-4 py-4 lg:hidden"
        >
          <a href="#" class="hover:text-accent transition">Accueil</a>
          <a href="#" class="hover:text-accent transition">Catégories</a>
          <a href="#" class="hover:text-accent transition">Templates</a>
          <a href="#contact" class="hover:text-accent transition">Contact</a>
          <a href="#about" class="hover:text-accent transition">A propos</a>
          <button
            @click="isLoginModalOpen = true"
            class="hidden lg:block ml-auto bg-accent text-background px-4 py-2 rounded hover:bg-primary transition"
          >
            Connexion
          </button>
        </div>
      </transition>
    </nav>

    <header
      class="flex flex-col justify-center items-center h-[90vh] text-center"
    >
      <h2 class="text-5xl font-extrabold mb-4 text-primary animate-float">
        Temply <br />
        Bibliothèque moderne de templates front-end
      </h2>

      <p class="text-lg text-text/80 max-w-xl">Explore. Copy . Build</p>

      <button
        class="mt-6 px-6 py-2 bg-primary hover:bg-accent transition rounded-full text-white shadow-md animate-bounceSlow"
      >
        Commencer
      </button>
    </header>
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
            <a href="#" class="hover:text-accent transition">Instagram</a>
            <a href="#" class="hover:text-accent transition">GitHub</a>
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
    v-if="isLoginModalOpen"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
  >
    <div
      class="bg-background p-8 rounded-xl shadow-lg w-full max-w-md relative"
    >
      <!-- Bouton de fermeture -->
      <button
        @click="isLoginModalOpen = false"
        class="absolute top-3 right-3 text-xl font-bold text-text hover:text-accent"
      >
        &times;
      </button>

      <!-- Titre -->
      <h2 class="text-2xl font-bold mb-6 text-primary text-center">
        Connexion
      </h2>

      <!-- Formulaire -->
      <form @submit.prevent class="space-y-4">
        <div>
          <label class="block mb-1 font-medium">Email</label>
          <input
            type="email"
            class="w-full px-4 py-2 rounded bg-border text-white focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Votre email"
          />
        </div>
        <div>
          <label class="block mb-1 font-medium">Mot de passe</label>
          <input
            type="password"
            class="w-full px-4 py-2 rounded bg-border text-white focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Mot de passe"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-accent hover:bg-primary transition text-background px-4 py-2 rounded"
        >
          Se connecter
        </button>
        <p>Vous n'avez pas un compte ? <a href="">s'inscrire</a></p>
      </form>
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
      <img :src="fleche" alt="fleche" class="h-10 w-auto" />
    </button>
  </div>
</template>

<script setup>
import AOS from "aos";
import { onMounted } from "vue";
import logo from "./assets/logo.png";
import fleche from "./assets/fleche.png";

import { ref, onUnmounted } from "vue";
// Pour afficher/cacher le dropdown
const showDropdown = ref(false);
const isMenuOpen = ref(false);
const isLoginModalOpen = ref(false);

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

onMounted(() => {
  AOS.init();
  setTimeout(() => AOS.refresh(), 500); // ← ajoute ça
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
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
</style>
