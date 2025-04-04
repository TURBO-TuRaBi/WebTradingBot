// middleware/auth.js
import { auth } from '~/utils/firebase';

export default defineNuxtRouteMiddleware((to, from) => {
  return new Promise((resolve) => {
    // صبر کردن تا وضعیت احراز هویت لود بشه
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe(); // بعد از اولین بار، اشتراک رو لغو کن

      if (!user && to.path === '/dashboard') {
        // اگه کاربر لاگین نکرده و می‌خواد به داشبورد بره
        resolve(navigateTo('/login'));
      } else {
        // اگه لاگین کرده یا مسیر دیگه‌ایه، ادامه بده
        resolve();
      }
    });
  });
});