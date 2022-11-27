import EditGrimpeForm from "@/components/EditGrimpeForm";
import UserGrimpeLstComponent from "@/components/UserGrimpeLstComponent";
import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import ConnexionForm from "@/views/ConnexionForm";
import InscriptionForm from "@/views/InscriptionForm";
// import ProfilView from "@/views/ProfilView";
import store from "@/store/index.js";
import CreeLieuForm from "@/components/CreeLieuForm";
import CreeGrimpeForm from "@/views/CreeGrimpeForm";
import UserLieuLstComponent from "@/components/UserLieuLstComponent";
import EditLieuForm from "@/components/EditLieuForm";


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
    }
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

router.beforeEach(function (to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next("/auth");
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next("/connexion");
    } else {
        next();
    }
});

export default router;
