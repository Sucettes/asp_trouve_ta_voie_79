import EditGrimpeForm from "@/views/grimpe/EditGrimpeForm";
import UserGrimpeLstComponent from "@/views/utilisateur/UserGrimpeLstComponent";
// import erreur403View from "@/views/erreur/Erreur403View";
import ErreurView from "@/views/erreur/ErreurView";
import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import ConnexionForm from "@/views/auth/ConnexionForm";
import InscriptionForm from "@/views/auth/InscriptionForm";
// import ProfilView from "@/views/ProfilView";
import store from "@/store/index.js";
import CreeLieuForm from "@/views/lieu/CreeLieuForm";
import CreeGrimpeForm from "@/views/grimpe/CreeGrimpeForm";
import UserLieuLstComponent from "@/views/utilisateur/UserLieuLstComponent";
import EditLieuForm from "@/views/lieu/EditLieuForm";


const routes = [
    {path: "/", redirect: "/accueil"},
    {path: "/accueil", name: "accueil", component: HomeView},
    {
        path: "/auth/inscription",
        name: "inscription",
        component: InscriptionForm,
        meta: {requiresUnauth: true}
    },
    {path: "/auth/connexion", name: "connexion", component: ConnexionForm, meta: {requiresUnauth: true}},
    // {path: "/profil", name: "profil", component: ProfilView},
    {path: "/lieu/ajouter", name: "lieuAjouter", component: CreeLieuForm, meta: {requiresAuth: true}},
    {
        path: "/lieu/mesLieux",
        name: "mesLieux",
        component: UserLieuLstComponent,
        meta: {requiresAuth: true}
    },
    // {path: "/lieu/:id", name: "lieuDetails", component: UserLieuLstComponent},
    {
        path: "/lieu/modifier/:id",
        name: "modifierLieu",
        component: EditLieuForm,
        meta: {requiresAuth: true}
    },
    {
        path: "/grimpe/ajouter",
        name: "grimpeAjouter",
        component: CreeGrimpeForm,
        meta: {requiresAuth: true}
    },
    {
        path: "/grimpe/mesGrimpes",
        name: "mesGrimpes",
        component: UserGrimpeLstComponent,
        meta: {requiresAuth: true}
    },
    {
        path: "/grimpe/modifier/:id",
        name: "modifierGrimpe",
        component: EditGrimpeForm,
        meta: {requiresAuth: true}
    },
    {path: "/:ErreurView(.*)", component: ErreurView, meta: {code: 404, errorText: "Not Found"}},
    {path: "/401", name: "401", component: ErreurView, meta: {code: 401, errorText: "Unauthorized"}}
];

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(),
    routes,
    linkActiveClass: "active",
    scrollBehavior(_, _2, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return {left: 0, top: 0};
    }
});

router.beforeEach(function (to, from, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next({name: "401"})
        // next(false);
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next({name: "accueil"});
        // next(false);
    } else {
        next();
    }
});

export default router;
