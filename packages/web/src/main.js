import { createApp } from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import App from './App.vue'

const app = createApp(App)

// Configure reCAPTCHA v3
// Get your site key from: https://www.google.com/recaptcha/admin
app.use(VueReCaptcha, {
  siteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY || 'YOUR_RECAPTCHA_SITE_KEY',
  loaderOptions: {
    autoHideBadge: true, // Hide the badge (you must add attribution text per Google's terms)
    useRecaptchaNet: false
  }
})

app.mount('#app')
