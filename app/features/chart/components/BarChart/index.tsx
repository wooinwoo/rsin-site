interface BarChartData {
  label: string;
  value: number;
  color: string;
}

interface BarChartProps {
  data: BarChartData[];
  height?: number;
  maxValue?: number;
}

export function BarChart({ data, height = 200, maxValue }: BarChartProps) {
  const chartMaxValue = maxValue || Math.max(...data.map((item) => item.value));
  console.log(chartMaxValue);

  return (
    <div className="w-full">
      <div className="relative flex items-end gap-4  p-4" style={{ height: `${height}px` }}>
        {/* y축 그리드 라인 */}
        {/* <div className="absolute inset-0 flex flex-col justify-between z-0">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="border-t border-gray-200 w-full"
              style={{ bottom: `${(index / 20) * 100}%` }}
            />
          ))}
        </div> */}

        {data.map((item, index) => (
          <div
            key={index}
            className="relative flex-1 flex flex-col items-center"
            style={{ minHeight: "100%" }}
          >
            {/* 값 표시 */}
            <div className="absolute -top-6 text-sm font-medium z-10">{item.value}</div>

            {/* 막대 컨테이너 */}
            <div className="absolute bottom-0 w-full max-w-[60px] h-[calc(100%-40px)] z-10">
              {/* 배경 막대 (회색) */}
              <div className="absolute inset-0 bg-gray-100 rounded-t-md" />
              {/* 값 막대 (컬러) */}
              <div
                className="absolute bottom-0 w-full rounded-t-md transition-all duration-300 bg-red-400"
                style={{
                  height: `${(item.value / chartMaxValue) * 100}%`,
                }}
              />
            </div>

            {/* x축 라벨 */}
            <div className="absolute -bottom-6 text-sm text-gray-600 z-10">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
