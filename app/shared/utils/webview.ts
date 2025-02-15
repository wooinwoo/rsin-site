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
      // 모달 닫기 버튼 클릭
      const closeButton = modalElement.querySelector("[data-modal-close]") as HTMLElement;
      if (closeButton) {
        closeButton.click();
      }
      return true;
    }
    return false;
  };
};
