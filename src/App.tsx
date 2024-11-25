import "./index.css";
/* import { MyBody } from "./mycomponents/body/MyBody";
import HeaderBackoffice from "./mycomponents/header/HeaderBackoffice";
import { Toaster } from "@/components/ui/toaster";
import { SidebarComponents } from "@/mycomponents/sidebarComponents/SidebarComponents";
*/
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotificationPage } from "./mycomponents/notificationPage/NotificationPage";
import ErrorPage from "./mycomponents/errorPage/error-page";
import AcceuilPage from "./mycomponents/acceuilPage/AcceuilPage";
import {
  SidebarComponents,
  loader as rootLoader,
} from "./mycomponents/sidebarComponents/SidebarComponents";
import CommunautePage from "./mycomponents/communautePage/CommunautePage";
import GroupePage from "./mycomponents/groupePage/GroupePage";
import EvenementPage from "./mycomponents/evenementPage/EvenementPage";
import IntegrationPage from "./mycomponents/integrationPage/IntegrationPage";
import ClientGerer from "./mycomponents/clientGererPage/ClientGerer";
import MesVentesPage from "./mycomponents/mesVentesPage/MesVentesPage";
import AnalyticsPage from "./mycomponents/analyticsPage/AnalyticsPage";
import MembreGererPage from "./mycomponents/membreGererPage/MembreGererPage";
import UpdateCommunaute from "./mycomponents/communautePage/UpdateCommunaute";
import { CommunauteMain } from "./mycomponents/communautePage/CommunauteMain";
import { Toaster } from "@/components/ui/toaster";
import GroupeMain from "./mycomponents/groupePage/GroupeMain";
import UpdateGroupePage from "./mycomponents/groupePage/UpdateGroupePage";
import NewGroupePageCreate from "./mycomponents/groupePage/NewGroupePageCreate";
import EvenementMain from "./mycomponents/evenementPage/EvenementMain";
import NewEvenementPage from "./mycomponents/evenementPage/NewEvenementPage";
import UpdateEvenement from "./mycomponents/evenementPage/UpdateEvenement";
import { ClientMain } from "./mycomponents/clientGererPage/ClientMain";
import ClientCreer from "./mycomponents/clientGererPage/ClientCreer";
import ClientUpdate from "./mycomponents/clientGererPage/ClientUpdate";
import MembreMain from "./mycomponents/membreGererPage/MembreMain";
import MembreCreer from "./mycomponents/membreGererPage/MembreCreer";
import MembreUpdate from "./mycomponents/membreGererPage/MembreUpdate";
import { ChannelPageMain } from "./mycomponents/channelPage/ChannelPageMain";
import ChannelPage from "./mycomponents/channelPage/ChannelPage";
import ChannelPageCreer from "./mycomponents/channelPage/ChannelPageCreer";
import ChannelPageUpdate from "./mycomponents/channelPage/ChannelPageUpdate";
import MainRessourcesPage from "./mycomponents/ressourcesPage/MainRessourcesPage";
import RessourcesPage from "./mycomponents/ressourcesPage/RessourcesPage";
import CreerRessourcesPage from "./mycomponents/ressourcesPage/CreerRessourcesPage";
import UpdateRessourcesPage from "./mycomponents/ressourcesPage/UpdateRessourcesPage";
import MainLessonLibrary from "./mycomponents/lessonLibrary/MainLessonLibrary";
import PageLessonLibrary from "./mycomponents/lessonLibrary/PageLessonLibrary";
import CreerLessonLibrary from "./mycomponents/lessonLibrary/CreerLessonLibrary";
import UpdateLessonLibrary from "./mycomponents/lessonLibrary/UpdateLessonLibrary";
import MainAssets from "./mycomponents/assetsPage/MainAssets";
import PageAssets from "./mycomponents/assetsPage/PageAssets";
import CreerAssets from "./mycomponents/assetsPage/CreerAssets";
import UpdateAssets from "./mycomponents/assetsPage/UpdateAssets";
import { PageEmailNotification } from "./mycomponents/emailNotification/PageEmailNotification";
import PagePopupBanners from "./mycomponents/groupeSetting/popupBanners/PagePopupBanners";
import CreerPopupBanners from "./mycomponents/groupeSetting/popupBanners/CreerPopupBanners";
import UpdatePopupBanners from "./mycomponents/groupeSetting/popupBanners/UpdatePopupBanners";
import Layout from "./mycomponents/Layout/Layout";
import PageBanners from "./mycomponents/groupeSetting/bannersAds/PageBanners";
import CreerBannersAds from "./mycomponents/groupeSetting/bannersAds/CreerBannersAds";
import UpdateBannersAds from "./mycomponents/groupeSetting/bannersAds/UpdateBannersAds";
import { PageGamification } from "./mycomponents/groupeSetting/Gamification/PageGamification";
import { PagePrivacyTerms } from "./mycomponents/groupeSetting/privacyTerms/PagePrivacyTerms";
import PageOtherSetting from "./mycomponents/groupeSetting/otherSetting/PageOtherSetting";
import PageLanguageSetting from "./mycomponents/groupeSetting/languageSettings/PageLanguageSetting";
import ApprouveMembersPage from "./mycomponents/groupePage/groupeAction/ApprouveMembersPage";
import AssignRolePage from "./mycomponents/groupePage/groupeAction/AssignRolePage";
/**we configure the loder create in root sidebar component to load data */

const router = createBrowserRouter([
  {
    path: "/",
    element: <SidebarComponents />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "/NOTIFICATION",
        element: <NotificationPage />,
      },
      {
        path: "/",
        element: <AcceuilPage />,
      },
      {
        path: "/COMMUNAUTES",
        element: <CommunauteMain />,
        children: [
          {
            path: "/COMMUNAUTES",
            element: <CommunautePage />,
          },
          {
            path: "/COMMUNAUTES/update",
            element: <UpdateCommunaute />,
          },
        ],
      },
      {
        path: "/GROUPES",
        element: <GroupeMain />,
        children: [
          {
            path: "/GROUPES",
            element: <GroupePage />,
          },
          {
            path: "/GROUPES/create-new-groupe",
            element: <NewGroupePageCreate />,
          },
          {
            path: "/GROUPES/update-groupe-page/:groupeId",
            element: <UpdateGroupePage />,
          },
        ],
      },
      {
        path: "/EVENEMENTS",
        element: <EvenementMain />,
        children: [
          { path: "/EVENEMENTS", element: <EvenementPage /> },
          {
            path: "/EVENEMENTS/create-new-event",
            element: <NewEvenementPage />,
          },
          {
            path: "/EVENEMENTS/update-event-page/:eventId",
            element: <UpdateEvenement />,
          },
        ],
      },
      {
        path: "/INTEGRATIONS",
        element: <IntegrationPage />,
      },
      {
        path: "/GERER LES CLIENTS",
        element: <ClientMain />,
        children: [
          {
            path: "/GERER LES CLIENTS",
            element: <ClientGerer />,
          },
          {
            path: "/GERER LES CLIENTS/ajouter-des-clients",
            element: <ClientCreer />,
          },
          {
            path: "/GERER LES CLIENTS/update-client-page/:clientId",
            element: <ClientUpdate />,
          },
        ],
      },
      {
        path: "/MES VENTES",
        element: <MesVentesPage />,
      },
      {
        path: "/ANALYTICS",
        element: <AnalyticsPage />,
      },
      {
        path: "/GERER LES MEMBRES",
        element: <MembreMain />,
        children: [
          {
            path: "/GERER LES MEMBRES",
            element: <MembreGererPage />,
          },
          {
            path: "/GERER LES MEMBRES/ajouter-des-membres",
            element: <MembreCreer />,
          },
          {
            path: "/GERER LES MEMBRES/update-membre-page/:membreId",
            element: <MembreUpdate />,
          },
        ],
      },
      {
        path: "/GERER LES CHAINES",
        element: <ChannelPageMain />,
        children: [
          {
            path: "/GERER LES CHAINES/:groupeId",
            element: <ChannelPage />,
          },
          {
            path: "/GERER LES CHAINES/ajouter-des-chaines/:groupeId",
            element: <ChannelPageCreer />,
          },
          {
            path: "/GERER LES CHAINES/update-channel-page/:channelId",
            element: <ChannelPageUpdate />,
          },
        ],
      },
      {
        path: "/GERER LES RESSOURCES",
        element: <MainRessourcesPage />,
        children: [
          {
            path: "/GERER LES RESSOURCES",
            element: <RessourcesPage />,
          },
          {
            path: "/GERER LES RESSOURCES/ajouter-des-ressources",
            element: <CreerRessourcesPage />,
          },
          {
            path: "/GERER LES RESSOURCES/update-ressources-page/:ressourceId",
            element: <UpdateRessourcesPage />,
          },
        ],
      },
      {
        path: "/GERER LES LEÇONS",
        element: <MainLessonLibrary />,
        children: [
          {
            path: "/GERER LES LEÇONS",
            element: <PageLessonLibrary />,
          },
          {
            path: "/GERER LES LEÇONS/ajouter-des-leçons/:lessonType",
            element: <CreerLessonLibrary />,
          },
          {
            path: "/GERER LES LEÇONS/update-leçons-page/:lessonLibraryId",
            element: <UpdateLessonLibrary />,
          },
        ],
      },
      {
        path: "/GERER LES ASSETS",
        element: <MainAssets />,
        children: [
          {
            path: "/GERER LES ASSETS",
            element: <PageAssets />,
          },
          {
            path: "/GERER LES ASSETS/ajouter-des-assets",
            element: <CreerAssets />,
          },
          {
            path: "/GERER LES ASSETS/update-assets-page/:assetsId",
            element: <UpdateAssets />,
          },
        ],
      },
      {
        path: "/EMAIL NOTIFICATION",
        element: <PageEmailNotification />,
        children: [],
      },
      {
        path: "/POPUPBANNERS",
        element: <Layout />,
        children: [
          {
            path: "/POPUPBANNERS",
            element: <PagePopupBanners />,
          },
          {
            path: "/POPUPBANNERS/ajouter-des-popupbanners",
            element: <CreerPopupBanners />,
          },
          {
            path: "/POPUPBANNERS/update-popupbanners-page/:assetsId",
            element: <UpdatePopupBanners />,
          },
        ],
      },
      {
        path: "/BANNERSADS",
        element: <Layout />,
        children: [
          {
            path: "/BANNERSADS",
            element: <PageBanners />,
          },
          {
            path: "/BANNERSADS/ajouter-des-bannersads",
            element: <CreerBannersAds />,
          },
          {
            path: "/BANNERSADS/update-bannersads-page/:assetsId",
            element: <UpdateBannersAds />,
          },
        ],
      },
      {
        path: "/GAMIFICATION",
        element: <PageGamification />,
        children: [],
      },
      {
        path: "/PRIVACYTERMS",
        element: <PagePrivacyTerms />,
        children: [],
      },
      {
        path: "/OTHERSETTINGS",
        element: <PageOtherSetting />,
        children: [],
      },
      {
        path: "/LANGUAGESETTING",
        element: <PageLanguageSetting />,
        children: [],
      },
      {
        path: "/APPROUVEMEMBERS",
        element: <ApprouveMembersPage />,
        children: [],
      },
      {
        path: "/ASSIGNROLES",
        element: <AssignRolePage />,
        children: [],
      },
    ],
  },
  /* POPUPBANNERS/update-popupbanners-page
    path: "/notification",
    element: <NotificationPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/acceuil",
    element: <AcceuilPage />,
  }, */
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
