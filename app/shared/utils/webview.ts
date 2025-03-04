declare global {
  interface Window {
    checkAndCloseModal: () => boolean;
    handleFCMMessage: (message: any) => void;
    navigate?: (url: string) => void; // navigate 함수 저장용
  }
}

// 웹뷰 관련 함수들을 모아두는 파일
export const initWebViewFunctions = () => {
  // 모달 닫기 검증 함수
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

  // FCM 메시지 수신 처리 함수
  window.handleFCMMessage = function (message) {
    console.log("FCM message received:", message);
    if (message?.data?.targetUrl && window.navigate) {
      window.navigate(message.data.targetUrl);
    }
  };
};
