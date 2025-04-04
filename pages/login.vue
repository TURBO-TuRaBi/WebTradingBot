<!-- pages/login.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-r from-purple-900 to-blue-900 text-white flex items-center justify-center px-4">
    <!-- چارت پس‌زمینه با انیمیشن از چپ به راست -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <svg class="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
        <!-- هایلایت رنگی پس‌زمینه -->
        <polyline
          ref="glowLine"
          points="0,300 200,200 400,350 600,150 800,300 1000,100 1200,250"
          fill="none"
          stroke="#00C4B4"
          stroke-width="10"
          class="animate-glow"
          style="filter: blur(10px); opacity: 0.3;"
        />
        <!-- خط اصلی -->
        <polyline
          ref="line1"
          points="0,300 200,200 400,350 600,150 800,300 1000,100 1200,250"
          fill="none"
          stroke="#00C4B4"
          stroke-width="2"
        />
        <!-- خط دوم -->
        <polyline
          ref="line2"
          points="0,350 200,250 400,400 600,200 800,350 1000,150 1200,300"
          fill="none"
          stroke="#00C4B4"
          stroke-width="2"
          stroke-dasharray="5,5"
        />
      </svg>
    </div>
    <div class="bg-black/50 p-6 md:p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-2xl md:text-3xl font-bold text-center mb-6">Login to Your Account</h2>
      <!-- دکمه ورود با گوگل -->
      <button
        @click="signInWithGoogle"
        class="w-full flex items-center justify-center gap-2 px-4 py-3 mb-4 bg-white text-black rounded-full hover:bg-gray-200 transition shadow-lg"
      >
        <svg class="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12.48 10.92v3.28h3.28c-.13 1.77-1.33 3.28-3.28 3.28-1.98 0-3.58-1.6-3.58-3.58s1.6-3.58 3.58-3.58c.89 0 1.72.32 2.36.86l2.36-2.36C15.68 7.32 14.02 6.5 12.48 6.5c-3.31 0-6 2.69-6 6s2.69 6 6 6c3.07 0 5.58-2.29 5.98-5.28h-5.98z"
          />
        </svg>
        Sign in with Google
      </button>
      <!-- نمایش خطاها -->
      <p v-if="error" class="text-red-500 text-sm mt-4 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '~/utils/firebase';
import { signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';

// متغیرها
const error = ref('');
const router = useRouter();

// رفرنس برای خطوط چارت
const line1 = ref(null);
const line2 = ref(null);
const glowLine = ref(null);

// ورود با گوگل
const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    // تنظیم Persistence قبل از لاگین
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);
    console.log('User signed in:', result.user);
    router.push('/dashboard');
  } catch (err) {
    error.value = err.message;
    console.error('Login error:', err);
  }
};

// انیمیشن‌ها
onMounted(() => {
  setTimeout(() => {
    if (!line1.value || !line2.value || !glowLine.value) {
      console.error('SVG lines not found!');
      return;
    }

    const animateLines = () => {
      let offset = 0;
      const basePoints1 = "0,300 200,200 400,350 600,150 800,300 1000,100 1200,250".split(' ');
      const basePoints2 = "0,350 200,250 400,400 600,200 800,350 1000,150 1200,300".split(' ');

      const animate = () => {
        offset += 2;
        const newPoints1 = basePoints1.map((point, index) => {
          const [x, y] = point.split(',');
          const newX = (parseFloat(x) - offset) % 1200;
          const newY = parseFloat(y) + Math.sin((index + offset * 0.01) * 0.5) * 10;
          return `${newX < 0 ? newX + 1200 : newX},${newY}`;
        }).join(' ');

        const newPoints2 = basePoints2.map((point, index) => {
          const [x, y] = point.split(',');
          const newX = (parseFloat(x) - offset) % 1200;
          const newY = parseFloat(y) + Math.cos((index + offset * 0.01) * 0.5) * 10;
          return `${newX < 0 ? newX + 1200 : newX},${newY}`;
        }).join(' ');

        line1.value.setAttribute('points', newPoints1);
        line2.value.setAttribute('points', newPoints2);
        glowLine.value.setAttribute('points', newPoints1);

        requestAnimationFrame(animate);
      };
      animate();
    };

    animateLines();
  }, 100);
});
</script>

<style scoped>
.animate-glow {
  animation: glow 3s infinite ease-in-out;
}

@keyframes glow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}
</style>