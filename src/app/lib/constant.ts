import { MenuItem } from "@/types";

export const JWT_SECRET_KEY = "default_secret"
export const JWT_EXPIRES_IN = "5s"
export const JWT_REFRESH_EXPIRES_IN = "7d"



/**
 * router 등록 or navigate로 이동 시 사용하는 경로 타입
 * 오타 방지 및 경로 수정 시 편리하게 사용하기 위해 정의됨
 *
 */
export enum NavigateType {
  /**
   * 로그인
   */
  login = "/login",
  /**
   * 비밀번호 변경
   */
  changePassword = "/changePassword",

  // LNB 대시보드 메뉴
  /**
   * 대시보드
   */
  dashboard = "/dashboard",

  // LNB 회원 정보 메뉴
  /**
   * 회원 정보
   */
  account = "/userList",
  /**
   * 회원 정보 수정
   */
  accountEdit = "/userList/edit", // 회원 정보 수정

  // LNB 회원 정보 메뉴
  /**
   * 매장 목록
   */
  store = "/storeList", // 매장 목록
  /**
   * 매장 수정
   */
  storeEdit = "/storeList/edit", // 매장 수정
  /**
   * 매장 추가
   */
  storeAdd = "/storeList/add", // 매장 추가
  /**
   * 매장 문의 목록
   */
  storeInquiry = "/storeInquiry", // 매장 문의 목록
  /**
   * 매장 문의 상세
   */
  storeInquiryDetail = "/storeInquiry/detail", // 매장 문의 상세

  // LNB 요청 메뉴
  /**
   * 현장제작물 요청 목록 관리
   */
  request = "/produceRequestList", // 요청 목록 관리
  /**
   * 현장제작물 요청 상세 및 수정
   */
  requestEdit = "/produceRequestList/edit", // 요청 상세/수정

  /**
   * 현장제작물 보기 페이지
   */

  requestView = "/requestView",

  /**
   * POP 보기 페이지
   */
  requestPopView = "/requestPopView",

  /**
   * POP 요청 목록 관리
   */
  requestPop = "/popRequestList", // 요청 목록 관리
  /**
   * POP 요청 상세 및 수정
   */
  requestPopEdit = "/popRequestList/edit", // 요청 상세/수정

  /**
   * 현장제작물 송장번호 입력
   */
  invoice = "/produceInvoiceList", // 송장번호 입력

  /**
   * POP 송장번호 입력
   */
  invoicePop = "/popInvoiceList", // 송장번호 입력

  // LNB 제작물 관리 메뉴
  /**
   * 제작물 관리
   */
  product = "/produceList", // 제작물 관리
  /**
   * 제작물 등록
   */
  productRegister = "/produceList/register", // 제작물 등록
  /**
   * 제작물 상세
   */
  productEdit = "/produceList/edit", // 제작물 등록

  // LNB POP 관리 메뉴
  /**
   * POP 관리
   */
  pop = "/popList", // POP 관리
  /**
   * POP 등록
   */
  popRegister = "/popList/register", // POP 등록
  /**
   * POP 상세
   */
  popEdit = "/popList/edit", // POP 수정

  /**
   * 일정 등록
   */
  popSchedule = "/schedule", // 일정 관리

  // LNB 가이드 메뉴
  /**
   * 가이드 메뉴 관리
   */
  guideMenu = "/guideList/menu", // 가이드 메뉴 관리
  /**
   * 가이드 메뉴 수정
   */
  guideMenuEdit = "/guideList/menu/edit", // 가이드 메뉴 수정
  /**
   * 가이드 메뉴 등록
   */
  guideMenuRegister = "/guideList/menu/register", // 가이드 메뉴 등록

  /**
   * 가이드 동영상
   */
  guideVideo = "/guideList/video", // 동영상
  /**
   * 가이드 동영상 수정
   */
  guideVideoEdit = "/guideList/video/edit", // 동영상 수정
  /**
   * 가이드 동영상 등록
   */
  guideVideoRegister = "/guideList/video/register", // 동영상 등록

  /**
   * 추가 등록된 가이드 메뉴
   */
  guide = "/guideList",
  /**
   * 추가 등록된 가이드 메뉴 수정
   */
  guideEdit = "/guideList/edit",
  /**
   * 추가 등록된 가이드 메뉴 등록
   */
  guideRegister = "/guideList/register",

  //LNB 공지사항 메뉴
  /**
   * 공지사항
   */
  notice = "/noticeList", // 공지사항
  /**
   * 공지사항 상세
   */
  noticeEdit = "/noticeList/edit", // 공지사항 상세
  /**
   * 공지사항 등록
   */
  noticeRegister = "/noticeList/register", // 공지사항 등록

  // LNB 관리자 메뉴
  /**
   * 권한 관리
   */
  permission = "/adminList", // 권한 관리
  /**
   * 권한 수정
   */
  permissionEdit = "/adminList/edit", // 관리자 정보 수정
  /**
   * 권한 등록
   */
  permissionRegister = "/adminList/register", // 관리자 등록

  /**
   * Log 관리
   */
  log = "/logList", // 로그 관리

  /**
   * 에러 페이지
   */

  error = "/error", // 에러
}

export const LNBMenuList: MenuItem[] = [
  {
    label: "대시보드",
    path: NavigateType.dashboard,
  },
  {
    label: "회원정보",
    path: NavigateType.account,
    children: [{ label: "회원 정보 수정", path: NavigateType.accountEdit }],
  },
  {
    label: "매장",
    children: [
      {
        label: "매장 목록",
        path: NavigateType.store,
        children: [
          { label: "매장 수정", path: NavigateType.storeEdit },
          { label: "매장 등록", path: NavigateType.storeAdd },
        ],
      },
      { label: "매장 문의", path: NavigateType.storeInquiry },
    ],
  },
  {
    label: "요청내역 관리",
    children: [
      {
        label: "현장제작물 요청 목록 관리",
        path: NavigateType.request,
        children: [
          { label: "현장제작물 요청 상세", path: NavigateType.requestEdit },
        ],
      },
      { label: "현장제작물 송장번호 입력", path: NavigateType.invoice },
      {
        label: "POP 요청 목록 관리",
        path: NavigateType.requestPop,
        children: [
          { label: "POP 요청 상세", path: NavigateType.requestPopEdit },
        ],
      },
      { label: "POP 송장번호 입력", path: NavigateType.invoicePop },
    ],
  },
  {
    label: "제작물 관리",
    path: NavigateType.product,
    children: [
      { label: "제작물 등록", path: NavigateType.productRegister },
      { label: "제작물 상세", path: NavigateType.productEdit },
    ],
  },
  {
    label: "POP",
    children: [
      {
        label: "POP 관리",
        path: NavigateType.pop,
        children: [
          { label: "POP 등록", path: NavigateType.popRegister },
          { label: "POP 수정", path: NavigateType.popEdit },
        ],
      },
      { label: "일정 관리", path: NavigateType.popSchedule },
    ],
  },
  {
    label: "가이드 관리",
    children: [
      {
        label: "가이드 메뉴 관리",
        path: NavigateType.guideMenu,
        children: [
          { label: "가이드 메뉴 등록", path: NavigateType.guideMenuRegister },
          { label: "가이드 메뉴 수정", path: NavigateType.guideMenuEdit },
        ],
      },
      {
        label: "동영상",
        path: NavigateType.guideVideo,
        children: [
          { label: "동영상 등록", path: NavigateType.guideVideoRegister },
          { label: "동영상 수정", path: NavigateType.guideVideoEdit },
        ],
      },
    ],
  },
  {
    label: "공지사항",
    path: NavigateType.notice,
    children: [
      { label: "공지사항 등록", path: NavigateType.noticeRegister },
      { label: "공지사항 수정", path: NavigateType.noticeEdit },
    ],
  },
  {
    label: "관리자",
    children: [
      {
        label: "권한 관리",
        path: NavigateType.permission,
        children: [
          { label: "관리자 등록", path: NavigateType.permissionRegister },
          { label: "관리자 수정", path: NavigateType.permissionEdit },
        ],
      },
      { label: "Log 관리", path: NavigateType.log },
    ],
  },
];
