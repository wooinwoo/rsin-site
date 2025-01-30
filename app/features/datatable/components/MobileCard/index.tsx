interface MobileCardProps<T> {
  item: T;
  renderHeader?: (item: T) => React.ReactNode;
  renderBody?: (item: T) => React.ReactNode;
  renderFooter?: (item: T) => React.ReactNode;
}

export function MobileCard<T>({
  item,
  renderHeader,
  renderBody,
  renderFooter,
}: MobileCardProps<T>) {
  return (
    <div className="w-full max-w-none p-4 border-b border-gray-200 last:border-b-0">
      {renderHeader && <div className="">{renderHeader(item)}</div>}

      {renderBody && <div className="">{renderBody(item)}</div>}

      {renderFooter && <div>{renderFooter(item)}</div>}
    </div>
  );
}
