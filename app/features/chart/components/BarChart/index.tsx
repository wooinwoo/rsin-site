interface BarChartData {
  label: string;
  value: number;
  color: string;
}

interface BarChartProps {
  data: BarChartData[];
  maxValue?: number;
}

export function BarChart({ data, maxValue }: BarChartProps) {
  const chartTotalValue = maxValue || data.reduce((sum, item) => sum + item.value, 0);

  console.log(data);
  return (
    <div className="w-full h-full">
      <div className="relative flex items-end gap-4  p-4 h-full">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative flex-1 flex flex-col items-center"
            style={{ minHeight: "100%" }}
          >
            {/* 값 표시 */}
            <div className="absolute -top-6 text-sm  z-10">{item.value}</div>

            {/* 막대 컨테이너 */}
            <div className="absolute bottom-0 w-full max-w-[60px] h-[calc(100%-4px)] z-10">
              {/* 배경 막대 (회색) */}
              <div className="absolute inset-0 bg-gray-100 rounded-t-md" />
              {/* 값 막대 (컬러) */}
              <div
                className="absolute bottom-0 w-full rounded-t-md transition-all duration-300 bg-red-400"
                style={{
                  height: `${(item.value / chartTotalValue) * 100}%`,
                }}
              />
            </div>

            {/* x축 라벨 */}
            <div className="absolute -bottom-6 text-sm text-gray-600 z-10 whitespace-nowrap">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
