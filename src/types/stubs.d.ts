declare module "@radix-ui/react-accordion" {
  export const Root: any;
  export const Item: any;
  export const Trigger: any;
  export const Header: any;
  export const Content: any;
  export const Title: any;
  export const Description: any;
  export const Portal: any;
  export const Overlay: any;
  export const Close: any;
  const Primitive: any;
  export default Primitive;
}

declare module "@radix-ui/react-alert-dialog" {
  export const Root: any;
  export const Trigger: any;
  export const Portal: any;
  export const Overlay: any;
  export const Content: any;
  export const Title: any;
  export const Description: any;
  export const Action: any;
  export const Cancel: any;
  const Primitive: any;
  export default Primitive;
}

declare module "@radix-ui/react-aspect-ratio" {
  export const Root: any;
  const Primitive: any;
  export default Primitive;
}

declare module "@radix-ui/react-avatar" {
  export const Root: any;
  export const Image: any;
  export const Fallback: any;
  const Primitive: any;
  export default Primitive;
}

declare module "@radix-ui/react-slot" {
  export const Slot: any;
  const SlotPrimitive: any;
  export default SlotPrimitive;
}

declare module "class-variance-authority" {
  export type VariantProps<T = any> = any;
  export function cva(base?: string, config?: any): (...classes: any[]) => string;
  const defaultExport: typeof cva;
  export default defaultExport;
}

declare module "react-day-picker" {
  import * as React from "react";
  export const DayPicker: React.ComponentType<any>;
  export default DayPicker;
}

declare module "embla-carousel-react" {
  import * as React from "react";
  export type UseEmblaCarouselType = any;
  const useEmblaCarousel: (options?: any, plugins?: any) => [React.RefObject<any>, any];
  export default useEmblaCarousel;
}

declare module "recharts" {
  import * as React from "react";
  export const ResponsiveContainer: React.ComponentType<any>;
  export const Tooltip: React.ComponentType<any>;
  export const Legend: React.ComponentType<any>;
  export const Line: React.ComponentType<any>;
  export const LineChart: React.ComponentType<any>;
  export const BarChart: React.ComponentType<any>;
  export const Bar: React.ComponentType<any>;
  export const PieChart: React.ComponentType<any>;
  export const Pie: React.ComponentType<any>;
  export const AreaChart: React.ComponentType<any>;
  export const Area: React.ComponentType<any>;
  export const CartesianGrid: React.ComponentType<any>;
  export const XAxis: React.ComponentType<any>;
  export const YAxis: React.ComponentType<any>;
  export const Label: React.ComponentType<any>;
  export const LabelList: React.ComponentType<any>;
  export const ReferenceLine: React.ComponentType<any>;
  export const RadialBarChart: React.ComponentType<any>;
  export const RadialBar: React.ComponentType<any>;
  export type LegendPayload = any;
  export type LegendProps = any;
  export default any;
}

declare module "@radix-ui/react-radio-group" {
  export const Root: any;
  export const Item: any;
  export const Indicator: any;
  const Primitive: any;
  export default Primitive;
}

declare module "@radix-ui/react-scroll-area" {
  export const Root: any;
  export const Viewport: any;
  export const Scrollbar: any;
  export const Thumb: any;
  export const Corner: any;
  export const ScrollAreaScrollbar: any;
  export const ScrollAreaThumb: any;
  const Primitive: any;
  export default Primitive;
}

declare module "@radix-ui/react-select" {
  export const Root: any;
  export const Group: any;
  export const Value: any;
  export const Trigger: any;
  export const Icon: any;
  export const Label: any;
  export const Portal: any;
  export const Content: any;
  export const Viewport: any;
  export const Item: any;
  export const ItemText: any;
  export const ItemIndicator: any;
  export const Separator: any;
  export const ScrollUpButton: any;
  export const ScrollDownButton: any;
  const Primitive: any;
  export default Primitive;
}

declare module "@radix-ui/react-separator" {
  export const Root: any;
  const Primitive: any;
  export default Primitive;
}

declare module "@radix-ui/react-dialog" {
  export const Root: any;
  export const Trigger: any;
  export const Portal: any;
  export const Overlay: any;
  export const Content: any;
  export const Title: any;
  export const Description: any;
  export const Close: any;
  const Primitive: any;
  export default Primitive;
}

declare module "@radix-ui/react-slider" {
  export const Root: any;
  export const Track: any;
  export const Range: any;
  export const Thumb: any;
  const Primitive: any;
  export default Primitive;
}

declare module "next-themes" {
  export const useTheme: () => { theme?: string; setTheme: (value: string) => void };
}

declare module "sonner" {
  import * as React from "react";
  export interface ToasterProps extends Record<string, any> {}
  export const Toaster: React.ComponentType<ToasterProps>;
  export const toast: (...args: any[]) => void;
  export default any;
}

declare module "@radix-ui/react-switch" {
  export const Root: any;
  export const Thumb: any;
  const Primitive: any;
  export default Primitive;
}

declare module "@radix-ui/react-tabs" {
  export const Root: any;
  export const List: any;
  export const Trigger: any;
  export const Content: any;
  const Primitive: any;
  export default Primitive;
}

declare module "@radix-ui/react-toggle-group" {
  export const Root: any;
  export const Item: any;
  const Primitive: any;
  export default Primitive;
}

declare module "@radix-ui/react-toggle" {
  export const Root: any;
  const Primitive: any;
  export default Primitive;
}

declare module "@radix-ui/react-tooltip" {
  export const Root: any;
  export const Trigger: any;
  export const Portal: any;
  export const Content: any;
  export const Arrow: any;
  export const Provider: any;
  const Primitive: any;
  export default Primitive;
}

declare module "clsx" {
  export function clsx(...args: any[]): string;
  export default clsx;
}

declare module "tailwind-merge" {
  export function twMerge(...classes: any[]): string;
  export default twMerge;
}

declare module "react-resizable-panels" {
  import * as React from "react";
  export const PanelGroup: React.ComponentType<any>;
  export const Panel: React.ComponentType<any>;
  export const PanelResizeHandle: React.ComponentType<any>;
  const Primitive: any;
  export default Primitive;
}

declare module "@radix-ui/react-checkbox" {
  export const Root: any;
  export const Indicator: any;
  const Primitive: any;
  export default Primitive;
}

declare module "@radix-ui/react-collapsible" {
  const Primitive: Record<string, any>;
  export = Primitive;
}

declare module "cmdk" {
  import * as React from "react";
  const Command: Record<string, any> & React.ComponentType<any>;
  export { Command };
  export default Command;
}

declare module "@radix-ui/react-context-menu" {
  const Primitive: Record<string, any>;
  export = Primitive;
}

declare module "vaul" {
  import * as React from "react";
  export const Drawer: Record<string, any> & React.ComponentType<any>;
  export default Drawer;
}

declare module "@radix-ui/react-dropdown-menu" {
  const Primitive: Record<string, any>;
  export = Primitive;
}

declare module "@radix-ui/react-label" {
  const Primitive: Record<string, any>;
  export = Primitive;
}

declare module "react-hook-form" {
  export const FormProvider: any;
  export const useFormContext: any;
  export const useFormState: any;
  export const Controller: any;
  export type ControllerProps<TFieldValues = any, TName = any> = any;
  export type FieldPath<T = any> = any;
  export type FieldValues = any;
  export const useForm: any;
}

declare module "@radix-ui/react-hover-card" {
  const Primitive: Record<string, any>;
  export = Primitive;
}

declare module "input-otp" {
  import * as React from "react";
  export const OTPInput: React.ComponentType<any>;
  export const OTPInputContext: React.Context<{ slots: Array<Record<string, any>> }>;
}

declare module "@radix-ui/react-menubar" {
  const Primitive: Record<string, any>;
  export = Primitive;
}

declare module "@radix-ui/react-navigation-menu" {
  const Primitive: Record<string, any>;
  export = Primitive;
}

declare module "@radix-ui/react-popover" {
  const Primitive: Record<string, any>;
  export = Primitive;
}

declare module "@radix-ui/react-progress" {
  const Primitive: Record<string, any>;
  export = Primitive;
}