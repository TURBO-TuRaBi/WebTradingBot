<!-- pages/dashboard.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-r from-purple-900 to-blue-900 text-white p-6">
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

    <header class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <button
        @click="signOut"
        class="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
      >
        Sign Out
      </button>
    </header>

    <main>
      <h2 class="text-3xl font-bold mb-4">Welcome to Your Dashboard!</h2>
      <p class="text-lg">
        Here you can manage your trades, view analytics, and more.
      </p>
    </main>
  </div>
</template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import { auth } from '~/utils/firebase';
  import { signOut as firebaseSignOut } from 'firebase/auth';


  definePageMeta({
  middleware: 'auth'
});
  
  const router = useRouter();

  // رفرنس برای خطوط چارت
const line1 = ref(null);
const line2 = ref(null);
const glowLine = ref(null);

onMounted(() => {
  setTimeout(() => {
    if (!line1.value || !line2.value || !glowLine.value) {
      console.error('SVG lines not found!');
      return;
    }

    // انیمیشن از چپ به راست
    const animateLines = () => {
      let offset = 0;
      const basePoints1 = "0,300 200,200 400,350 600,150 800,300 1000,100 1200,250".split(' ');
      const basePoints2 = "0,350 200,250 400,400 600,200 800,350 1000,150 1200,300".split(' ');

      const animate = () => {
        offset += 2; // سرعت حرکت افقی
        const newPoints1 = basePoints1.map((point, index) => {
          const [x, y] = point.split(',');
          const newX = (parseFloat(x) - offset) % 1200; // حرکت افقی
          const newY = parseFloat(y) + Math.sin((index + offset * 0.01) * 0.5) * 10; // موج عمودی
          return `${newX < 0 ? newX + 1200 : newX},${newY}`;
        }).join(' ');

        const newPoints2 = basePoints2.map((point, index) => {
          const [x, y] = point.split(',');
          const newX = (parseFloat(x) - offset) % 1200; // حرکت افقی
          const newY = parseFloat(y) + Math.cos((index + offset * 0.01) * 0.5) * 10; // موج عمودی
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
  
  // تابع خروج
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      router.push('/'); // هدایت به صفحه اصلی بعد از خروج
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };
  </script>
  
  <style scoped>

/* انیمیشن هایلایت رنگی */
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

  /* استایل‌های اضافی اگه نیاز داری */
  </style>