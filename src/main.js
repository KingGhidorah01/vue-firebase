import { createApp } from 'vue'
import App from './App.vue'
import router from './router'; // Importa el router

// Importación de bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

// Importaciónd e firebase
import { firestorePlugin } from 'vuefire';
//import firebaseApp from './firebase'; // Importa la configuración de Firebase


const app = createApp(App);

// Usa el plugin de Firestore
app.use(firestorePlugin);
app.use(router); // Usa el router en la aplicación

app.mount('#app');