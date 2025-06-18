import { describe, expect, fn, test } from "vitest";
import { mount } from "@vue/test-utils";
import router from "@/router";
import { createTestingPinia } from "@pinia/testing";
import LoginComponent from "@/components/auth/LoginComponent.vue";

describe("Example DOM Test Suite", () => {
  test("Mount LoginComponent", async () => {
    expect(LoginComponent).toBeTruthy();

    const wrapper = mount(LoginComponent, {
      global: { plugins: [router, createTestingPinia({ createSpy: fn })] },
      props: {},
    });

    expect(wrapper.text()).toContain("Inicio de sesión");
    expect(wrapper.text()).toContain("Email");
    expect(wrapper.text()).toContain("Contraseña");
    expect(wrapper.text()).toContain("Login");

    expect(wrapper.text()).not.toContain("Registro");
    expect(wrapper.text()).not.toContain("Registrarme");
    expect(wrapper.text()).not.toContain("Registrarse");

    // ejemplo click en botones
    // await wrapper.get("button").trigger("click")
  });
});
