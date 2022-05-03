const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div
      role="alert"
      className="flex flex-col justify-center items-center h-[calc(100vh-73px)] dark:bg-darkGray-500 text-primaryBlue-500"
    >
      <h1 className="text-2xl mb-4">Something went wrong:</h1>
      <pre>{error.message}</pre>
      <button className="mt-4" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
};

export default ErrorFallback;
