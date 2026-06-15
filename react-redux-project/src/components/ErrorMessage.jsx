function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-message">
      <p>{message}</p>

      {onRetry && (
        <button type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;