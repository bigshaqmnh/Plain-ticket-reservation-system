export default (...contexts) => component =>
  contexts.reduce((componentWithContext, context) => context(componentWithContext), contexts[0](component));
// const componentWithContext = first(component);

// return second(componentWithContext);
