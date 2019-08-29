declare module '*.jpg' {
  const value: any;
  export = value;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}
