<template>
  <div class="card mx-2 items-center gap-4 bg-base-300 py-10">
    <div class="flex items-center">
      <p class="text-3xl">{{ t("Lo sentimos") }}...</p>
    </div>
    <p>
      {{ t("Lamentamos informarte que tu cuenta ha sido") }}
      <strong>{{ t("suspendida temporalmente") }}</strong
      >{{ t("por falta de pago") }}. <br />
      {{ t("Queremos ayudarte a solucionar esta situación lo antes posible") }}.
    </p>
    <div class="card max-w-3xl gap-2 border-2 border-info p-4 shadow-lg">
      <div class="mb-4 flex flex-col gap-2">
        <p class="pt-1 text-2xl font-bold">{{ t("Paso a paso") }}</p>
        <p class="text-gray-100s text-sm">
          {{ t("Siga los siguientes pasos para seguir utilizando LerenTools") }}
        </p>
      </div>
      <div class="flex gap-5">
        <div class="text-accent">1.</div>
        <p>
          {{ t("Si actualmente tenés la aplicación instalada, debés") }}
          <strong>{{ t("desinstalarla") }}.</strong><br />
          {{ t("Esto lo podes realizar directamente desde el panel") }}
          <a
            v-if="auth.store && auth.store.original_domain"
            :href="'https://' + auth.store.original_domain + '/admin/apps/'"
            target="_blank"
            rel="noopener noreferrer"
            class="link-accent link"
          >
            {{ t("administrador de Tiendanube") }}.
          </a>
        </p>
      </div>
      <div class="flex gap-5">
        <div class="text-accent">2.</div>
        <p>
          {{ t("Volver a instalarla para activar tu cuenta") }}. <br />
          {{ t("Esto lo podes realizar desde la sección") }}
          <a
            v-if="auth.store && auth.store.original_domain"
            href="/tools"
            class="link-accent link"
          >
            {{ t("Tools") }}.
          </a>
        </p>
      </div>
      <div class="flex gap-5">
        <div class="text-accent">3.</div>
        <p>
          {{
            t("Por último, activá la suscripción de la Tool correspondiente")
          }}.
        </p>
      </div>
    </div>
    <p class="mt-5 text-sm">
      {{
        t(
          "Recordá que siempre podes contactarte con nuestro equipo a traves del"
        )
      }}
      <strong class="link-hover link" @click="openSupport">{{
        t("chat de soporte")
      }}</strong>
      {{ t("en nuestra plataforma o via email") }}
    </p>
  </div>
</template>

<script setup>
import { useAuth } from "@/stores/auth";

const auth = useAuth();

const openSupport = () => {
  window.history.pushState({}, "bot_support", "?bot_support=true");
  window.HubSpotConversations.widget.refresh({ openToNewThread: true });
  setTimeout(() => {
    window.HubSpotConversations.widget.open();
  }, 1000);
};
</script>
