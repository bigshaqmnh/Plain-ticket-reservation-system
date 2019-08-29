declare module '*.jpg' {
  const value: any;
  export = value;
}

declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}
