// 액션 타입을 선언
// 한 요청당 세 개를 만듦
import * as api from "../lib/api";
import { createAction, handleActions } from "redux-actions";
import createRequestThunk from "../lib/createRequestThunk";
import { finishLoading, startLoading } from "./loading";
import { put, call } from "redux-saga/effects";
import { takeLatest } from "redux-saga/effects";

const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

// saga 사용 액션 생성 함수
/* getPost 경우에 api 요청을 할때 어떤 id 로 조회할지 정해줘야하며
 * redux-saga 를 사용할때 id 처럼 요청에 필요한 값을 액션의 payload 로 넣어줘야함
 */
export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);

function* getPostSaga(action) {
  yield put(startLoading(GET_POST)); // 로딩 시작
  // 파라미터로 action 을 받아오면 액션의 정보를 조회할 수 있음
  try {
    // call 을 사용하고 나면, 이 함수는 Promise 를 반환하고, 기다릴 수 있음
    // 첫 번째 파라미터는 호출하고싶은 함수, 나머지 파라미터는 해당 함수에 넣어주고싶은 인수
    const post = yield call(api.getPost, action.payload); // api.getPost(action.payload) 를 의미
    yield put({
      type: GET_POST_SUCCESS,
      payload: post.data,
    });
  } catch (e) {
    // try/catch 문을 사용하여 에러도 잡을 수 있음
    yield put({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_POST)); // 로딩 끝
}

function* getUsersSaga() {
  yield put(startLoading(GET_USERS)); // 로딩 시작
  // 파라미터로 action 을 받아오면 액션의 정보를 조회할 수 있음
  try {
    const users = yield call(api.getUsers); // api.getUsers(action.payload) 를 의미
    yield put({
      type: GET_USERS_SUCCESS,
      payload: users.data,
    });
  } catch (e) {
    yield put({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_USERS)); // 로딩 끝
}

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

// thunk 함수를 생성
// thunk 함수 내부에서는 시작할 때, 성공했을 때, 실패했을 때 다른 액션을 디스패치함
/* saga 를 사용하지 않고 thunk 를 사용할 경우 아래와 같이 thunk 함수를 만들어야 함
위에 saga 사용으로 아래 thunk 함수 사용하지 않음
export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);*/
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
};

/* 로딩에 대한 초기 상태를 따로 modules/loading 에서 관리하므로 아래와 같이 작성할 필요가 없어졌음
const initialState = {
  loading: {
    GET_POST: false,
    GET_USERS: false,
  },
  post: null,
  users: null,
};*/

const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  initialState
);

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
