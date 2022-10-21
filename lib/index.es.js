import { defineComponent, useCssVars, unref, useSlots, shallowRef, watch, openBlock, createBlock, h } from "vue";
var org_vue_vue_type_style_index_0_lang = "";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "org",
  props: {
    data: null,
    globalStyles: null,
    align: { default: "center" }
  },
  emits: ["on-expand-toggle"],
  setup(__props, { emit }) {
    const props = __props;
    useCssVars((_ctx) => ({
      "d9809c4a": unref(globalStyles).$childrenRadius,
      "78bdb975": unref(globalStyles).$childrenBorder,
      "49bcbdc4": unref(globalStyles).$childrenBoxWidth,
      "57e7fe2e": unref(globalStyles).$childrenBoxHeight,
      "8d671a1e": unref(globalStyles).$left,
      "8d66fa44": unref(globalStyles).$line,
      "78bedf74": unref(globalStyles).$childrenBottom
    }));
    const slots = useSlots();
    const getChildren = (data) => {
      var _a;
      const children = [];
      const current = h(
        "div",
        { class: "tree-children" },
        slots.default ? slots.default(data) : data.label
      );
      const length = ((_a = data == null ? void 0 : data.children) == null ? void 0 : _a.length) || 0;
      ((data == null ? void 0 : data.children) || []).forEach((od, index) => {
        children.push(
          h("div", {
            class: `tree-parent tree-content ${index === length - 1 ? "tree-parent-last" : !index ? "tree-parent-first" : ""}`
          }, getChildren(od))
        );
      });
      const status = h(
        "div",
        { class: "tree-toggle", onClick: () => hideChildren(data) },
        slots.expand ? slots.expand(data) : data.unExpand ? "+" : "-"
      );
      const next = h("div", { class: "left-border" }, data.unExpand ? [status] : [status, ...children]);
      return children.length ? [current, next] : [current];
    };
    const orgRender = shallowRef({});
    const treeRender = (data) => {
      orgRender.value = {
        render: () => {
          return h("div", { class: `org-default org-${props.align}` }, getChildren(data));
        }
      };
    };
    watch(() => props.data, treeRender, { immediate: true });
    const hideChildren = async (data) => {
      data.unExpand = !data.unExpand;
      emit("on-expand-toggle", data.unExpand, data);
      treeRender(props.data);
    };
    const globalStyles = shallowRef({
      $left: "60px",
      $childrenBottom: "70px",
      $childrenBoxWidth: "80px",
      $childrenBoxHeight: "40px",
      $childrenBorder: "1px solid #000",
      $childrenRadius: "4px",
      $line: "1px solid #000"
    });
    watch(() => props.globalStyles, () => {
      globalStyles.value = { ...globalStyles.value, ...props.globalStyles };
    }, { deep: true, immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(orgRender));
    };
  }
});
const install = function(app) {
  app.component("VueOrg", _sfc_main);
};
export { install as default, _sfc_main as vueOrg };
