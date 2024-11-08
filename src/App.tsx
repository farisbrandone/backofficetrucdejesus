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
        path: "/GERER LES CLIENS",
        element: <ClientMain />,
        children: [
          {
            path: "/GERER LES CLIENS",
            element: <ClientGerer />,
          },
          {
            path: "/GERER LES CLIENS/ajouter-des-clients",
            element: <ClientCreer />,
          },
          {
            path: "/GERER LES CLIENS/update-client-page/:clientId",
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
    ],
  },
  /* GERER LES CHAINES  updateCommunaute  MembreGererPage  ANALYTICS MES VENTES GERER LES CLIENS INTEGRATIONS EVENEMENTS GroupePage COMMUNAUTES{
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
