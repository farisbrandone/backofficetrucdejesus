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
        element: <CommunautePage />,
      },
      {
        path: "/GROUPES",
        element: <GroupePage />,
      },
      {
        path: "/EVENEMENTS",
        element: <EvenementPage />,
      },
      {
        path: "/INTEGRATIONS",
        element: <IntegrationPage />,
      },
      {
        path: "/GERER LES CLIENS",
        element: <ClientGerer />,
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
        element: <MembreGererPage />,
      },
    ],
  },
  /* MembreGererPage  ANALYTICS MES VENTES GERER LES CLIENS INTEGRATIONS EVENEMENTS GroupePage COMMUNAUTES{
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
    </>
  );
}

export default App;
