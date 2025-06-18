import { createRouter, createWebHistory } from "vue-router";
import { getCustomerNameById } from "./services/api";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./components/home/HomePage.vue"),
    redirect: "/dashboard",
    props: { show: false },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("./components/dashboard/DashboardPage.vue"),
        meta: {
          title: "Inicio",
        },
      },
      {
        path: "customers",
        name: "Clientes",
        component: () => import("./components/customers/CustomersPage.vue"),
        children: [
          {
            path: "",
            name: "Listado de Clientes",
            component: () => import("./components/customers/CustomersGrid.vue"),
            meta: {
              title: "Clientes",
            },
          },
          {
            path: ":id",
            name: "Detalle de Cliente",
            component: () =>
              import("./components/customers/CustomerDetail.vue"),
          },
        ],
      },
      {
        path: "customer-categories",
        name: "Categorías de cliente",
        component: () =>
          import("./components/customers/CustomerCategoriesGrid.vue"),
        meta: {
          title: "Categoría de clientes",
        },
      },
      {
        path: "labels",
        name: "Cucardas",
        component: () => import("./components/labels/LabelsPage.vue"),
        children: [
          {
            path: "",
            name: "Listado de Cucardas",
            component: () => import("./components/labels/LabelsGrid.vue"),
            meta: {
              title: "Cucardas",
            },
          },
          {
            path: ":id",
            name: "Detalle de Cucarda",
            component: () =>
              import("./components/errors/UnderConstructionPage.vue"),
          },
        ],
      },
      {
        path: "login",
        name: "Inicio de sesión",
        component: () => import("./components/auth/LoginPage.vue"),
        meta: {
          title: "Inicio de sesión",
        },
      },
      {
        path: "organization",
        name: "Organización",
        component: () =>
          import("./components/organizations/OrganizationPage.vue"),
        meta: {
          title: "Organización",
        },
      },
      {
        path: "settings",
        name: "Mis datos",
        component: () =>
          import("./components/errors/UnderConstructionPage.vue"),
        meta: {
          title: "Mis datos",
        },
      },
      {
        path: "not_found",
        name: "¡Ups - Página no encontrada!",
        component: () => import("./components/errors/404Page.vue"),
        meta: {
          title: "Página no encontrada",
        },
      },
      {
        path: "fatal_error",
        name: "¡Ups - Ocurrió un error!",
        component: () => import("./components/errors/500Page.vue"),
        meta: {
          title: "Error",
        },
      },
    ],
  },
  // will match everything and put it under `$route.params.pathMatch`
  {
    path: "/:pathMatch(.*)*",
    redirect: "/not_found",
  },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.skipAuth) {
    next();
  } else {
    const loginStatus = Boolean(Number(localStorage.getItem("login_status")));

    if (to.path === "/login") {
      if (loginStatus) {
        next("/");
      } else {
        next();
      }
    } else {
      if (loginStatus) {
        next();
      } else {
        if (
          to.path === "/not_found" ||
          to.path === "/fatal_error" ||
          to.path.startsWith("/verify_account") ||
          to.path === "/password_recovery" ||
          to.path.startsWith("/password_recovery") ||
          to.path === "/reset_password" ||
          to.path.startsWith("/reset_password") ||
          to.path === "/activate_account" ||
          to.path.startsWith("/activate_account")
        ) {
          next();
        } else {
          next("/login");
        }
      }
    }
  }
});

router.afterEach(async (to) => {
  const defaultTitle = "LerenTools";
  let title = `${defaultTitle} · ${to.meta.title}`;

  const hashRegex = /^[A-Za-z0-9]{11}$/; // Id hasheado
  if (hashRegex.test(to.params.id)) {
    if (to.path.startsWith("/customers/")) {
      const customerName = await getCustomerNameById(to.params.id);
      title = customerName
        ? `${defaultTitle} · Clientes · ${customerName}`
        : defaultTitle;
    }
  }

  document.title = title;
});

export default router;
