<template>
    <div class="min-h-screen bg-gradient-to-r from-purple-900 to-blue-900 text-white flex flex-col">
      <!-- هدر -->
      <header class="flex justify-between items-center p-4 md:p-6">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-accent-green rounded flex items-center justify-center">
            <span class="text-dark-bg font-bold">Q</span>
          </div>
          <h1 class="text-lg font-semibold">MrM3hran</h1>
        </div>
        
      </header>
  
      <!-- بخش مرکزی -->
      <main class="flex-1 flex flex-col items-center justify-center text-center px-4 py-8 md:py-16">
        <div class="relative z-10">
          <button class="mb-6 px-4 py-2 bg-accent-green/20 text-accent-green rounded-full text-sm md:text-base flex items-center gap-2 mx-auto">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Trading Bots
          </button>
          <h2 class="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
            The Fastest and Secure<br class="hidden md:block" /> AI Trading Assistant.
          </h2>
          <p class="text-gray-400 text-sm md:text-lg mb-6 md:mb-8 max-w-md mx-auto">
            Trade faster and smarter with our secure AI bots. Maximize your investments with real-time insights and automation.
          </p>
          <!-- دکمه Try Free Trial با افکت شیشه‌ای -->
          <div class="relative inline-block">
            <div class="absolute inset-0 bg-gradient-to-r from-green-400 to-cyan-400 opacity-40 rounded-full backdrop-filter backdrop-blur-md"></div>
            <button @click="goToLogin" class="relative px-6 py-3 bg-accent-green text-dark-bg font-semibold rounded-full hover:bg-green-400 transition shadow-lg hover:shadow-xl cursor-pointer">
              Try Free Trial →
            </button>
          </div>
        </div>
        <!-- چارت پس‌زمینه با انیمیشن از چپ به راست -->
        <div class="absolute inset-0 opacity-20">
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
      </main>
  
      <!-- منوی پایین -->
      <footer class="flex justify-center gap-4 md:gap-8 p-4 md:p-6 bg-black/50">
        <div class="relative inline-block">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-40 rounded-full backdrop-filter backdrop-blur-md"></div>
          <button @click="handleClick('Q')" class="relative w-12 h-12 bg-accent-green rounded-full flex items-center justify-center shadow-lg hover:shadow-xl cursor-pointer hover:bg-orange-400">
            <span class="text-dark-bg font-bold">Q</span>
          </button>
        </div>
        <div class="relative inline-block">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-40 rounded-full backdrop-filter backdrop-blur-md"></div>
          <button @click="handleClick('Bots')" class="relative text-gray-300 hover:text-orange-300 text-sm md:text-base px-4 py-2 rounded-full transition shadow-lg hover:shadow-xl cursor-pointer">
            Bots
          </button>
        </div>
        <div class="relative inline-block">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-40 rounded-full backdrop-filter backdrop-blur-md"></div>
          <button @click="handleClick('Markets')" class="relative text-gray-300 hover:text-orange-300 text-sm md:text-base px-4 py-2 rounded-full transition shadow-lg hover:shadow-xl cursor-pointer">
            Markets
          </button>
        </div>
        <div class="relative inline-block">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-40 rounded-full backdrop-filter backdrop-blur-md"></div>
          <button @click="handleClick('Trade')" class="relative text-gray-300 hover:text-orange-300 text-sm md:text-base px-4 py-2 rounded-full transition shadow-lg hover:shadow-xl cursor-pointer">
            Trade
          </button>
        </div>
        <div class="relative inline-block">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-40 rounded-full backdrop-filter backdrop-blur-md"></div>
          <button @click="handleClick('Token')" class="relative text-gray-300 hover:text-orange-300 text-sm md:text-base px-4 py-2 rounded-full transition shadow-lg hover:shadow-xl cursor-pointer">
            Token
          </button>
        </div>
        <div class="relative inline-block">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-40 rounded-full backdrop-filter backdrop-blur-md"></div>
          <button @click="handleClick('AI Assistant')" class="relative text-gray-300 hover:text-orange-300 text-sm md:text-base px-4 py-2 rounded-full transition shadow-lg hover:shadow-xl cursor-pointer">
            AI Assistant
          </button>
        </div>
        <div class="relative inline-block">
          <div class="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-40 rounded-full backdrop-filter backdrop-blur-md"></div>
          <button @click="handleClick('Next')" class="relative w-12 h-12 bg-accent-green rounded-full flex items-center justify-center shadow-lg hover:shadow-xl cursor-pointer hover:bg-orange-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  // رفرنس برای خطوط چارت
  const line1 = ref(null);
  const line2 = ref(null);
  const glowLine = ref(null);

  const router = useRouter();


const goToLogin = () => {
  if (auth.currentUser) {
    router.push('/dashboard');
  } else {
    router.push('/login');
  }
};
  


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
  
  // تابع برای مدیریت کلیک‌ها
  const handleClick = (item) => {
    console.log(`${item} clicked!`);
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
  </style>