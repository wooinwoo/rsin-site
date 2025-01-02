import { useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";

export function GlobalLoadingIndicator() {
  const navigation = useNavigation();
  const [showDelayed, setShowDelayed] = useState(false);

  useEffect(() => {
    if (navigation.state === "loading") {
      const timer = setTimeout(() => setShowDelayed(true), 300);
      return () => clearTimeout(timer);
    }
    setShowDelayed(false);
  }, [navigation.state]);

  // if (navigation.state === "idle" || !showDelayed) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] z-[9999] flex items-center justify-center">
      <div className="relative bg-white rounded-lg shadow-xl p-8 min-w-[320px] transform scale-95 animate-in fade-in zoom-in duration-200">
        {/* 상단 로고 또는 아이콘 */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        </div>

        {/* 메시지 */}
        <div className="text-center space-y-2 mb-6">
          <h3 className="text-slate-800 text-lg font-medium">페이지 이동 중</h3>
          <p className="text-slate-500 text-sm">잠시만 기다려 달라냥</p>
        </div>

        {/* 프로그레스 바 */}
        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500/80 animate-progressBar" />
        </div>
      </div>
    </div>
  );
}
