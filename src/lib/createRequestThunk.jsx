/* api 요청할때 thunk 함수를 작성 및 로딩 상태 리듀서에서 관리하는 작업을 따로 분리한 로직*/
// 사용법: createRequestThunk(“GET_POST”, api.getPost)
import {finishLoading, startLoading} from "../modules/loading";

export default function createRequestThunk(type, request) {
  // 성공 및 실패 액션 타입을 정의
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    dispatch({ type }); // 시작됨
    // loading 리덕스 모듈에서 만든 액션 생성 함수를 해당 함수 내에서 사용
    dispatch(startLoading(type))
    try {
      const response = await request(params);
      dispatch({
        type: SUCCESS,
        payload: response.data,
      }); // 성공
      dispatch(finishLoading(type))
    } catch (e) {
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      }); // 에러 발생
      dispatch(startLoading(type))
      throw e;
    }
  };
}

// 사용법 : createRequestSaga(GET_POST, api.getPost)