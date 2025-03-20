export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error(err); // Affiche le détail complet de l'erreur dans la console
  res.status(statusCode).json({
    message: err.message,
    stack: err.stack,
  });
};
