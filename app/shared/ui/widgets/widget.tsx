interface WidgetProps {
  children: React.ReactNode;
}

export function Widget({ children }: WidgetProps) {
  return <div className="bg-white rounded-[8px] shadow-md p-4">{children}</div>;
}
