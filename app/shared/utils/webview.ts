declare global {
  interface Window {
    checkAndCloseModal: () => boolean;
  }
}

// 웹뷰 관련 함수들을 모아두는 파일
export const initWebViewFunctions = () => {
  window.checkAndCloseModal = function () {
    const modalElement = document.querySelector(".rs-modal-wrapper");
    if (modalElement) {
      // 모달이 있으면 true 반환 (웹뷰에서 뒤로가기 막기)
      return true;
    }
    // 모달이 없으면 false 반환 (웹뷰에서 뒤로가기 허용)
    return false;
  };
};
