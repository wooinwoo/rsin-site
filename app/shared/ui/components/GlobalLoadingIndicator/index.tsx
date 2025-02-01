import { useNavigation, type Navigation } from "@remix-run/react";
import { useRef, useEffect, useState } from "react";

export function GlobalLoadingIndicator() {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>();

  const MINIMUM_DELAY = 400;
  const SHOW_DELAY = 400;

  useEffect(() => {
    const state = navigation.state;
    const isLoading = state === "loading" || state === "submitting";

    if (isLoading) {
      if (timerRef.current) return;

      startTimeRef.current = Date.now();

      timerRef.current = setTimeout(() => {
        const currentState = navigation.state;
        if (currentState === "loading" || currentState === "submitting") {
          setShow(true);
        }
      }, SHOW_DELAY);
    }

    if (state === "idle" && show) {
      const elapsedTime = Date.now() - (startTimeRef.current || Date.now());
      const remainingTime = Math.max(MINIMUM_DELAY - elapsedTime, 0);

      setTimeout(() => {
        setShow(false);
        startTimeRef.current = undefined;
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = undefined;
        }
      }, remainingTime);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }
    };
  }, [navigation.state, show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/10 z-[9999] flex items-center justify-center">
      <div className="relative bg-white rounded-xl shadow-lg p-5 min-w-[240px] transform scale-95 animate-in fade-in zoom-in duration-200">
        {/* 로딩 스피너 */}
        <div className="flex justify-center mb-3">
          <div className="w-8 h-8 rounded-full border-[3px] border-blue-200 border-t-blue-600 animate-spin" />
        </div>

        {/* 메시지 */}
        <div className="text-center">
          <p className="text-slate-700 text-sm font-medium">잠시만 기다려달라냥</p>
        </div>
      </div>
    </div>
  );
}
