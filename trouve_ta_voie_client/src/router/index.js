import EditGrimpeForm from "@/views/grimpe/EditGrimpeForm";
import GrimpeDetailView from "@/views/grimpe/GrimpeDetailView";
import LieuDetailView from "@/views/lieu/LieuDetailView";
import UserGrimpeLstComponent from "@/views/utilisateur/UserGrimpeLstComponent";
import ErreurView from "@/views/erreur/ErreurView";
import UserGrimpeLstVoteComponent from "@/views/utilisateur/UserGrimpeLstVoteComponent";
import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import ConnexionForm from "@/views/auth/ConnexionForm";
import InscriptionForm from "@/views/auth/InscriptionForm";
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
        meta: {requiresUnAuth: true},
    },
    {path: "/auth/connexion", name: "connexion", component: ConnexionForm, meta: {requiresUnAuth: true}},
    {path: "/lieu/ajouter", name: "lieuAjouter", component: CreeLieuForm, meta: {requiresAuth: true}},
    {
        path: "/lieu/mesLieux",
        name: "mesLieux",
        component: UserLieuLstComponent,
        meta: {requiresAuth: true},
    },
    {path: "/lieu/:id", name: "lieuDetails", component: LieuDetailView},
    {
        path: "/lieu/modifier/:id",
        name: "modifierLieu",
        component: EditLieuForm,
        meta: {requiresAuth: true},
    },
    {
        path: "/grimpe/ajouter",
        name: "grimpeAjouter",
        component: CreeGrimpeForm,
        meta: {requiresAuth: true},
    },
    {
        path: "/grimpe/mesGrimpes",
        name: "mesGrimpes",
        component: UserGrimpeLstComponent,
        meta: {requiresAuth: true},
    },
    {path: "/grimpe/:id", name: "grimpeDetails", component: GrimpeDetailView},
    {path: "/mesVotes", name: "mesVotes", component: UserGrimpeLstVoteComponent, meta: {requiresAuth: true}},
    {
        path: "/grimpe/modifier/:id",
        name: "modifierGrimpe",
        component: EditGrimpeForm,
        meta: {requiresAuth: true},
    },
    {path: "/:ErreurView(.*)", component: ErreurView, meta: {code: 404, errorText: "Not Found"}},
    {path: "/401", name: "401", component: ErreurView, meta: {code: 401, errorText: "Unauthorized"}},
    {path: "/403", name: "403", component: ErreurView, meta: {code: 403, errorText: "Forbidden"}},
    {path: "/404", name: "404", component: ErreurView, meta: {code: 404, errorText: "Not Found"}},
    {path: "/500", name: "500", component: ErreurView, meta: {code: 500, errorText: "Internal server error"}},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active",
    scrollBehavior(_, _2, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return {left: 0, top: 0};
    },
});

router.beforeEach(function (to, from, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next({name: "401"});
    } else if (to.meta.requiresUnAuth && store.getters.isAuthenticated) {
        next({name: "accueil"});
    } else {
        next();
    }
});

export default router;
