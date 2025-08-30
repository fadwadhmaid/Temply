<template>
  <button @click="loginWithFigma">Se connecter avec Figma</button>
</template>

<script>
export default {
  methods: {
    loginWithFigma() {
window.location.href = "http://localhost:8000/auth/figma";
    }
  }
  
}

</script>
