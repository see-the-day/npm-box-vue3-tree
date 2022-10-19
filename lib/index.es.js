import { defineComponent, useCssVars, unref, useSlots, shallowRef, watch, openBlock, createBlock, h } from "vue";
var org_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => '.org-default,.org-default .tree-parent{display:flex;align-items:center}.org-default .tree-children{border-radius:var(--38dddf1e);border:var(--1e5be6b8);width:var(--0084a647);height:var(--137dae74)}.org-default .left-border{margin-left:var(--1462c7f4);padding-left:var(--1462c7f4);position:relative}.org-default .left-border:before{content:"";position:absolute;top:50%;left:calc(var(--1462c7f4) * -1);width:var(--1462c7f4);border-top:var(--1462d7e1)}.org-default .left-border .tree-toggle{width:20px;height:20px;background:#fff;border:1px solid #000;cursor:pointer;z-index:1;border-radius:50%;position:absolute;display:flex;justify-content:center;align-items:center;top:calc(50% - 10px);left:-10px}.org-default .left-border .tree-content{margin-bottom:var(--1e5d0cb7);position:relative}.org-default .left-border .tree-content:before{content:"";position:absolute;left:calc(var(--1462c7f4) * -1);border-top:var(--1462d7e1);width:var(--1462c7f4)}.org-default .left-border .tree-content:after{content:"";position:absolute;top:0;left:calc(var(--1462c7f4) * -1);height:calc(var(--1e5d0cb7) + 100%);border-left:var(--1462d7e1)}.org-default .left-border .tree-parent-first:after{top:50%;height:calc(var(--1e5d0cb7) + 50%)}.org-default .left-border .tree-parent-last{margin-bottom:0}.org-default .left-border .tree-parent-last:after{height:50%;top:0}.org-top,.org-top .tree-parent{align-items:flex-start}.org-top .left-border:before{top:calc(var(--137dae74) / 2)}.org-top .left-border .tree-toggle{top:calc(var(--137dae74) / 2 - 10px)}.org-top .left-border .tree-content:before{top:calc(var(--137dae74) / 2)}.org-top .left-border .tree-parent-first:after{height:calc(var(--1e5d0cb7) + 100%);top:calc(var(--137dae74) / 2)}.org-vertical,.org-vertical .tree-parent{flex-direction:column}.org-vertical .left-border{flex-direction:initial;margin-top:var(--1e5d0cb7);padding-top:var(--1e5d0cb7);margin-left:0;padding-left:0}.org-vertical .left-border:before{left:50%;top:calc(var(--1e5d0cb7) * -1);height:var(--1e5d0cb7);border-top:0;border-left:var(--1462d7e1)}.org-vertical .left-border .tree-toggle{left:calc(50% - 10px);top:-10px}.org-vertical .left-border .tree-content{margin-right:var(--1462c7f4)}.org-vertical .left-border .tree-content:before{width:0;top:calc(var(--1e5d0cb7) * -1);left:50%;border-left:var(--1462d7e1);height:var(--1e5d0cb7)}.org-vertical .left-border .tree-content:after{left:0;top:calc(var(--1e5d0cb7) * -1);width:calc(var(--1462c7f4) + 100%);border-top:var(--1462d7e1);border-left:0}.org-vertical .left-border .tree-parent-first:after{top:calc(var(--1e5d0cb7) * -1);left:50%;width:calc(var(--1462c7f4) + 50%)}.org-vertical .left-border .tree-parent-last{margin-right:0}.org-vertical .left-border .tree-parent-last:after{width:50%;left:0;top:calc(var(--1e5d0cb7) * -1)}\n')();
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
      "38dddf1e": unref(globalStyles).$childrenRadius,
      "1e5be6b8": unref(globalStyles).$childrenBorder,
      "0084a647": unref(globalStyles).$childrenBoxWidth,
      "137dae74": unref(globalStyles).$childrenBoxHeight,
      "1462c7f4": unref(globalStyles).$left,
      "1462d7e1": unref(globalStyles).$line,
      "1e5d0cb7": unref(globalStyles).$childrenBottom
    }));
    const slots = useSlots();
    const getChildren = (data) => {
      var _a;
      const children = [];
      const current = h("div", { class: "tree-children" }, slots.default ? slots.default(data) : data.label);
      const length = ((_a = data == null ? void 0 : data.children) == null ? void 0 : _a.length) || 0;
      ((data == null ? void 0 : data.children) || []).forEach((od, index2) => {
        children.push(h("div", {
          class: `tree-parent tree-content ${index2 === length - 1 ? "tree-parent-last" : !index2 ? "tree-parent-first" : ""}`
        }, getChildren(od)));
      });
      const status = h("div", { class: "tree-toggle", onClick: () => hideChildren(data) }, slots.expand ? slots.expand(data) : data.unExpand ? "+" : "-");
      const next = h("div", { class: "flex flex-col left-border" }, data.unExpand ? [status] : [status, ...children]);
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
  app.component("VueTree", _sfc_main);
};
var index = { install };
export { index as default, _sfc_main as vueTree };
