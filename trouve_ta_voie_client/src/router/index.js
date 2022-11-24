import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ConnexionForm from "@/views/ConnexionForm";
import InscriptionForm from "@/views/InscriptionForm";

const routes = [
    {path: '/', redirect: '/accueil'},
    {path: '/accueil', name: 'accueil', component: HomeView},
    {path: '/auth/inscription', name: 'inscription', component: InscriptionForm},
    {path: '/auth/connexion', name: 'connexion', component: ConnexionForm}
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
