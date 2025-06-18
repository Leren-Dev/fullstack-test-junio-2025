import { notify } from "notiwind";

const notifyPlugin = {
  install(app) {
    // Agregar $notify como una propiedad global
    const notifyFunction = (type, message, duration = 3000) => {
      switch (type) {
        case "success":
          notify(
            {
              group: "bottom-right",
              type: "success",
              title: "Éxito",
              text: message,
            },
            duration
          );
          break;
        case "error":
          notify(
            {
              group: "bottom-right",
              type: "error",
              title: "Error",
              text: message,
            },
            duration
          );
          break;
        case "warning":
          notify(
            {
              group: "bottom-right",
              type: "warning",
              title: "Advertencia",
              text: message,
            },
            duration
          );
          break;
        case "info":
          notify(
            {
              group: "bottom-right",
              type: "info",
              title: "Info",
              text: message,
            },
            duration
          );
          break;
        default:
          console.warn("Tipo de notificación no soportado:", type);
      }
    };
    app.provide("notify", notifyFunction);
  },
};

export default notifyPlugin;
