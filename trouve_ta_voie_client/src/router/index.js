import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ConnexionForm from "@/views/ConnexionForm";
import InscriptionForm from "@/views/InscriptionForm";
import ProfilView from "@/views/ProfilView";
import CreeLieuForm from "@/views/CreeLieuForm";
import CreeGrimpeForm from "@/views/CreeGrimpeForm";

const routes = [
    {path: '/', redirect: '/accueil'},
    {path: '/accueil', name: 'accueil', component: HomeView},
    {path: '/auth/inscription', name: 'inscription', component: InscriptionForm},
    {path: '/auth/connexion', name: 'connexion', component: ConnexionForm},
    {path: '/profil', name: 'profil', component: ProfilView},
    {path: '/lieu/ajouter', name: 'lieuAjouter', component: CreeLieuForm},
    {path: '/grimpe/ajouter', name: 'grimpeAjouter', component: CreeGrimpeForm}
    // {
    //     path: '/lieu', name: 'lieu', props: true, component: CreeModifLieuForm,
    //     children: [
    //         {path: '/', redirect: '/accueil'},
    //     ]
    // }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: 'active',
    scrollBehavior(_, _2, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return {left: 0, top: 0};
    }
});

//
// router.beforeEach(async (to, from, next) => {
//     // oui : profil, lieuAjouter, grimpeAjouter
//     // non : inscription, connexion
//
//     // next({name:, params: {}})
//
//     // console.log(to);
//     // console.log(from);
//     //
//     // if (to.name === 'connexion' || to.name === 'inscription' && this.$store.getters.isAuthenticated) {
//     //     this.$store.getters.isAuthenticated;
//     // }
//     // if (
//     //     // make sure the user is authenticated
//     //     !isAuthenticated &&
//     //     // ❗️ Avoid an infinite redirect
//     //     to.name !== 'Login'
//     // ) {
//     //     // redirect the user to the login page
//     //     return { name: 'Login' }
//     // }
// });

export default router;
