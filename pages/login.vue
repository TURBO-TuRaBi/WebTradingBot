<!-- pages/login.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-r from-purple-900 to-blue-900 text-white flex items-center justify-center px-4">
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

      <!-- ورود با شماره موبایل -->
      <div class="mb-4">
        <label for="phone" class="block text-sm font-medium mb-2">Phone Number</label>
        <input
          v-model="phoneNumber"
          type="tel"
          id="phone"
          placeholder="+989123456789"
          class="w-full px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-accent-green"
        />
      </div>

      <!-- نمایش reCAPTCHA -->
      <div id="recaptcha-container" class="mb-4"></div>

      <!-- دکمه ارسال کد تأیید -->
      <button
        @click="sendVerificationCode"
        :disabled="!phoneNumber"
        class="w-full px-4 py-3 mb-4 bg-accent-green text-dark-bg rounded-full hover:bg-accent-green/80 transition shadow-lg disabled:opacity-50"
      >
        Send Verification Code
      </button>

      <!-- ورودی کد تأیید -->
      <div v-if="showCodeInput" class="mb-4">
        <label for="code" class="block text-sm font-medium mb-2">Verification Code</label>
        <input
          v-model="verificationCode"
          type="text"
          id="code"
          placeholder="Enter the code"
          class="w-full px-4 py-2 bg-gray-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-accent-green"
        />
      </div>

      <!-- دکمه تأیید کد -->
      <button
        v-if="showCodeInput"
        @click="verifyCode"
        :disabled="!verificationCode"
        class="w-full px-4 py-3 bg-accent-green text-dark-bg rounded-full hover:bg-accent-green/80 transition shadow-lg disabled:opacity-50"
      >
        Verify Code
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
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from 'firebase/auth';

// متغیرها
const phoneNumber = ref('');
const verificationCode = ref('');
const showCodeInput = ref(false);
const error = ref('');
const router = useRouter();
let confirmationResult = null;
let recaptchaVerifier = null;

// لود اسکریپت reCAPTCHA
const loadRecaptchaScript = () => {
  return new Promise((resolve, reject) => {
    if (process.client) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'));
      document.head.appendChild(script);
    } else {
      reject(new Error('reCAPTCHA script can only be loaded in the browser'));
    }
  });
};

// تنظیم reCAPTCHA فقط توی کلاینت
const setupRecaptcha = async () => {
  if (!process.client) {
    error.value = 'reCAPTCHA is only available in the browser.';
    return;
  }

  try {
    // لود اسکریپت reCAPTCHA
    await loadRecaptchaScript();

    // اطمینان از وجود window.grecaptcha
    if (!window.grecaptcha) {
      throw new Error('reCAPTCHA not available. Please try again later.');
    }

    recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'normal',
        callback: () => {
          error.value = ''; // خطا رو پاک کن
        },
        'expired-callback': () => {
          error.value = 'reCAPTCHA expired. Please try again.';
          recaptchaVerifier = null; // ریست کردن
        }
      },
      auth
    );

    await recaptchaVerifier.render().catch((err) => {
      throw new Error('Failed to render reCAPTCHA: ' + err.message);
    });
  } catch (err) {
    error.value = 'Failed to initialize reCAPTCHA: ' + err.message;
  }
};

// فقط توی کلاینت اجرا بشه
onMounted(() => {
  setupRecaptcha();
});

// ارسال کد تأیید به شماره موبایل
const sendVerificationCode = async () => {
  try {
    if (!process.client) {
      error.value = 'This feature is only available in the browser.';
      return;
    }
    if (!recaptchaVerifier) {
      error.value = 'reCAPTCHA not initialized. Please try again.';
      await setupRecaptcha(); // دوباره تلاش کن
      return;
    }
    const result = await signInWithPhoneNumber(auth, phoneNumber.value, recaptchaVerifier);
    confirmationResult = result;
    showCodeInput.value = true;
    error.value = '';
  } catch (err) {
    error.value = err.message;
  }
};

// تأیید کد
const verifyCode = async () => {
  try {
    const result = await confirmationResult.confirm(verificationCode.value);
    console.log('User signed in:', result.user);
    router.push('/'); // هدایت به صفحه اصلی بعد از ورود
  } catch (err) {
    error.value = err.message;
  }
};

// ورود با گوگل
const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log('User signed in:', result.user);
    router.push('/'); // هدایت به صفحه اصلی بعد از ورود
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>
/* استایل‌های اضافی */
</style>