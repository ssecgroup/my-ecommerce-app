// Error handling middleware
class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = 'AppError';
  }
}

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(status).json({
    success: false,
    error: {
      message,
      status,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

// Default export for errorMiddleware
export default errorMiddleware;

// Named export for AppError
export { AppError };
