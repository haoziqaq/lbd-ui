export declare const ClockIn: any
export declare const Dialog: {
  alert: (options: {
    message: string;
    title?: string;
    width?: string;
    messageAlign?: string;
    showCancelButton?: boolean;
    cancelButtonText?: string;
    cancelButtonColor?: string;
    confirmButtonText?: string;
    confirmButtonColor?: string;
  } | string) => Promise<any>,
  confirm: (options: {
    message: string;
    title?: string;
    width?: string;
    messageAlign?: string;
    showCancelButton?: boolean;
    cancelButtonText?: string;
    cancelButtonColor?: string;
    confirmButtonText?: string;
    confirmButtonColor?: string;
  } | string) => Promise<any> 
}
export declare const Drawer: any
export declare const LuckyDraw: any
export declare const Modal: any
export declare const Questions: any
export declare const ScratchCard: any
export declare const Shake: any
export declare const Tabs: any
export declare const VerticalSwiper: any
export declare const VerticalSwiperSlide: any  

declare const LbdUI: { install: (Vue: any) => void }
export default LbdUI
