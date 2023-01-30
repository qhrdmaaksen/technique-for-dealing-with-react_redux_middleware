// 액션 타입을 선언
// 한 요청당 세 개를 만듦
import * as api from "../lib/api";
import { handleActions } from "redux-actions";
import createRequestThunk from "../lib/createRequestThunk";

const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

// thunk 함수를 생성
// thunk 함수 내부에서는 시작할 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치합니다.
export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);
/* src/lib/createRequestThunk.js 파일에서 작성한 thunk 함수를 사용하여 각 액션에 대한 thunk 함수를 생성
하였으므로 아래와 같이 각 액션에 대한 thunk 함수를 만들 필요가 없어졌음
export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST }); // 요청을 시작한 것을 알림
  try {
    const response = await api.getPost(id);
    dispatch({
      type: GET_POST_SUCCESS,
      payload: response.data,
    }); // 요청 성공
    console.log('GET POST 비동기 함수 응답받은 데이터',response.data)
  } catch (e) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    }); // 에러 발생
    throw e; // 나중에 컴포넌트단에서 에러를 조회할 수 있게 해 줌
  }
};

export const getUsers = (id) => async (dispatch) => {
  dispatch({ type: GET_USERS }); // 요청을 시작한 것을 알림
  try {
    const response = await api.getUsers(id);
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    }); // 요청 성공
    console.log('GET USERS 비동기 함수 응답받은 데이터',response.data)
  } catch (e) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    }); // 에러 발생
    throw e;
  }
};
*/

// 초기 상태를 선언
// 요청의 로딩 중 상태는 loading 이라는 객체에서 관리

const initialState = {
  post: null,
  users: null,
}

/* 로딩에 대한 초기 상태를 따로 modules/loading 에서 관리하므로 아래와 같이 작성할 필요가 없어졌음
const initialState = {
  loading: {
    GET_POST: false,
    GET_USERS: false,
  },
  post: null,
  users: null,
};*/

const sample = handleActions({
  [GET_POST_SUCCESS]: (state, action) => ({
    ...state,
    post: action.payload
  }),
  [GET_USERS_SUCCESS]: (state, action) => ({
    ...state,
    users: action.payload
  })
})

/* loading 액션 생성 함수를 modules/loading 에서 관리하므로 아래와 같이 작성할 필요가 없어졌음
const sample = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: true, // 요청 시작
      },
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false, // 요청 완료
      },
      post: action.payload,
    }),
    [GET_POST_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false, // 요청 완료
      },
    }),
    [GET_USERS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: true, // 요청 시작
      },
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false, // 요청 완료
      },
      users: action.payload,
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false, // 요청 완료
      },
    }),
  },
  initialState
);*/

export default sample;
