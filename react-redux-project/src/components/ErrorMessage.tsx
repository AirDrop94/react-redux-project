import Button from './ui/Button';

type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <p>{message}</p>

      {onRetry && <Button onClick={onRetry}>Try again</Button>}
    </div>
  );
}

export default ErrorMessage;