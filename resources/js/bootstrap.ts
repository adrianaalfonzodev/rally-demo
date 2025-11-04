import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Set X-CSRF-TOKEN header from meta tag (added to resources/views/app.blade.php)
// const tokenMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
// if (tokenMeta && tokenMeta.content) {
// 	window.axios.defaults.headers.common['X-CSRF-TOKEN'] = tokenMeta.content;
// }

// Optionally send credentials (cookies) with requests if needed by backend session auth
// window.axios.defaults.withCredentials = true;
