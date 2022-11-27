import EditGrimpeForm from "@/components/EditGrimpeForm";
import UserGrimpeLstComponent from "@/components/UserGrimpeLstComponent";
import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import ConnexionForm from "@/views/ConnexionForm";
import InscriptionForm from "@/views/InscriptionForm";
// import ProfilView from "@/views/ProfilView";
import CreeLieuForm from "@/components/CreeLieuForm";
import CreeGrimpeForm from "@/views/CreeGrimpeForm";
import UserLieuLstComponent from "@/components/UserLieuLstComponent";
import EditLieuForm from "@/components/EditLieuForm";


const routes = [
    {path: "/", redirect: "/accueil"},
    {path: "/accueil", name: "accueil", component: HomeView},
    {path: "/auth/inscription", name: "inscription", component: InscriptionForm},
    {path: "/auth/connexion", name: "connexion", component: ConnexionForm},
    // {path: "/profil", name: "profil", component: ProfilView},
    {path: "/lieu/ajouter", name: "lieuAjouter", component: CreeLieuForm},
    {path: "/lieu/mesLieux", name: "mesLieux", component: UserLieuLstComponent},
    // {path: "/lieu/:id", name: "lieuDetails", component: UserLieuLstComponent},
    {path: "/lieu/modifier/:id", name: "modifierLieu", component: EditLieuForm},
    {path: "/grimpe/ajouter", name: "grimpeAjouter", component: CreeGrimpeForm},
    {path: "/grimpe/mesGrimpes", name: "mesGrimpes", component: UserGrimpeLstComponent},
    {path: "/grimpe/modifier/:id", name: "modifierGrimpe", component: EditGrimpeForm}
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: "active",
    scrollBehavior(_, _2, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return {left: 0, top: 0};
    }
});

export default router;
