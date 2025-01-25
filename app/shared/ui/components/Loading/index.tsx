interface LoadingProps {
  className?: string;
}

export function Loading({ className = "h-8 w-8" }: LoadingProps) {
  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={`animate-spin border-4 border-primary border-t-transparent rounded-full ${className}`}
      />
    </div>
  );
}
