<script setup>
import { ref, onMounted } from 'vue';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const playerRef = ref(null);  // Reference to the DotLottie component
const isPlaying = ref(false); // To track if the animation is playing

// Function to handle play/pause on click
const toggleAnimation = () => {
  if (playerRef.value) {
    const dotLottie = playerRef.value.getDotLottieInstance();

    if (isPlaying.value) {
      dotLottie.pause();  // Pause the animation
    } else {
      dotLottie.play();   // Play the animation
    }

    isPlaying.value = !isPlaying.value;  // Toggle the playing state
  }
}

onMounted(() => {
  if (playerRef.value) {
    const dotLottie = playerRef.value.getDotLottieInstance();
    // Optional: Listen to animation pause and play events
    dotLottie.addEventListener('pause', () => {
      console.log('Animation paused');
    });
    dotLottie.addEventListener('play', () => {
      console.log('Animation playing');
    });
  }
});
</script>

<template>
  <div class="about">
    <DotLottieVue
        ref="playerRef"
        autoplay
        loop
        src="./src/assets/lottiefiles/ones.lottie"
        style="height: 500px; width: 500px"
        @click="toggleAnimation"
    />
    <p>{{ isPlaying ? 'Animation is playing' : 'Animation is paused' }}</p>
  </div>

</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
