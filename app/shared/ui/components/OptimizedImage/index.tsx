import { useState, useEffect, useRef, memo, useMemo, useCallback } from "react";
import type { OptimizedImageProps } from "./types";
import {
  imageCache,
  BLUR_DATA_URL,
  DEFAULT_FALLBACK_IMAGE,
  DEFAULT_WIDTH,
  DEFAULT_HEIGHT,
  DEFAULT_QUALITY,
} from "./constants";

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className = "",
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  fallbackSrc = DEFAULT_FALLBACK_IMAGE,
  quality = DEFAULT_QUALITY,
  priority = false,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(imageCache.has(src) ? src : BLUR_DATA_URL);
  const [isLoading, setIsLoading] = useState(!imageCache.has(src));
  const [isError, setIsError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // 이미지 URL 최적화
  const optimizedSrc = useMemo(() => {
    try {
      const url = new URL(src);
      // CDN 파라미터 추가
      url.searchParams.set("w", width.toString());
      url.searchParams.set("q", quality.toString());
      url.searchParams.set("fmt", "webp"); // WebP 포맷 사용
      return url.toString();
    } catch {
      return src;
    }
  }, [src, width, quality]);

  // Intersection Observer를 사용한 지연 로딩
  useEffect(() => {
    if (!priority && typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadImage();
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: "50px",
        }
      );

      if (imageRef.current) {
        observer.observe(imageRef.current);
      }

      return () => observer.disconnect();
    } else {
      loadImage();
    }
  }, [optimizedSrc]);

  // 이미지 로드 함수
  const loadImage = useCallback(() => {
    if (imageCache.has(optimizedSrc)) {
      setImageSrc(optimizedSrc);
      setIsLoading(false);
      return;
    }

    const img = new Image();
    img.src = optimizedSrc;

    img.onload = () => {
      setImageSrc(optimizedSrc);
      setIsLoading(false);
      imageCache.add(optimizedSrc);
    };

    img.onerror = () => {
      setImageSrc(fallbackSrc);
      setIsLoading(false);
      setIsError(true);
    };
  }, [optimizedSrc, fallbackSrc]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      <img
        ref={imageRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`
          w-full h-full object-cover transition-opacity duration-300
          ${isLoading ? "opacity-0" : "opacity-100"}
          ${isError ? "grayscale" : ""}
        `}
        onError={() => {
          if (!isError) {
            setImageSrc(fallbackSrc);
            setIsError(true);
          }
        }}
      />
      {isLoading && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
    </div>
  );
});

// 사용 예시
const ImageCell = memo(function ImageCell({ row }: { row: any }) {
  return (
    <div className="flex items-center gap-2">
      <OptimizedImage
        src={row.original.profileUrl}
        alt={row.original.employeeName}
        className="rounded-full"
        width={32}
        height={32}
        priority={false}
      />
      <span>{row.original.employeeName}</span>
    </div>
  );
});
