import { VNode } from 'vue';
import { Data } from '../types/OrgData';
declare const _sfc_main: import("vue").DefineComponent<{
    data: {
        type: null;
        required: true;
    };
    globalStyles: {
        type: null;
        required: true;
    };
    align: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}, {
    props: any;
    slots: any;
    getChildren: (data: Data) => VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[];
    orgRender: import("vue").ShallowRef<{}>;
    treeRender: (data: Data) => void;
    emit: (event: "on-expand-toggle", ...args: any[]) => void;
    hideChildren: (data: Data) => Promise<void>;
    globalStyles: import("vue").ShallowRef<{
        $left: string;
        $childrenBottom: string;
        $childrenBoxWidth: string;
        $childrenBoxHeight: string;
        $childrenBorder: string;
        $childrenRadius: string;
        $line: string;
    }>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "on-expand-toggle"[], "on-expand-toggle", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: null;
        required: true;
    };
    globalStyles: {
        type: null;
        required: true;
    };
    align: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>> & {
    "onOn-expand-toggle"?: ((...args: any[]) => any) | undefined;
}, {
    align: string;
}>;
export default _sfc_main;
