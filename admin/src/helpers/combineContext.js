export default (...contexts) => component => contexts.reduce((component, context) => context(component), component);
