const logger = err => {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  console.error(err);
};

export default logger;
