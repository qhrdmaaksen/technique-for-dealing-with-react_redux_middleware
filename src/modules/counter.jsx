import {createAction, handleActions} from "redux-actions";
import {delay, put, takeEvery, takeLatest} from "redux-saga/effects";

// 액션 타입 선언
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

// Action 생성 함수
export const increase = createAction(INCREASE)
export const decrease = createAction(DECREASE)

/*
*마우스 클릭 이벤트가 payload 안에 들어가지않도록
* () => undefined 를 두 번째 파라미터로 넣어줍니다.
* */
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined)
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined)

// 제너레이터 함수 생성(제너레이터 함수를 사가라고 부름)
/**
 * redux-devtools-extension 에서 확인 결과 및 해석
 * +1 버튼 클릭 시 1초 뒤에 INCREASE_ASYNC 액션을 두번 디스패치되고 이에따라서
 * --INCREASE ACTION 도 두번 디스패치되며 takeEvery 를 사용해 increaseSaga 를
 * ---등록했으므로 디스패치되는 모든 INCREASE_ASYNC 액션에 대해 1초후 INCREASE 액션을 발생시켜줌
 * 반대로 -1 버튼 클릭을 두번하게되면 DECREASE_ASYNC 액션이 두번 디스패치되지만
 * -DECREASE 액션은 한번만 디스패치됨 decreaseSaga 를 takeLatest 를 사용했기때문에
 * --여러 액션이 중첩되어 디스패치됐을땐 기존의 것들은 무시하고 가장 마지막 액션만 제대로 처리함
 * */
function* increaseSaga() {
	yield delay(1000) // 1초를 기다립니다.
	yield put(increase()) // 특정 액션을 디스패치 합니다.
}

function* decreaseSaga() {
	yield delay(1000) // 1초를 기다립니다.
	yield put(decrease()) // 특정 액션을 디스패치 합니다.
}

export function* counterSaga() {
	// takeEvery 는 들어오는 모든 액션에 대해 특정 작업을 처리해 줍니다.
	yield takeEvery(INCREASE_ASYNC, increaseSaga)
	// takeLatest 는 기존에 진행 중이던 작업이 있다면 취소 처리하고
	// 가장 마지막으로 실행된 작업만 수행합니다.
	yield takeLatest(DECREASE_ASYNC, decreaseSaga)
}

// 1 초 뒤에 increase 혹은 decrease 함수를 디스패치 함
/* thunk 함수를 만들어 리듀서 작성 / 위에서 saga 사용으로 더이상 사용하지 않음
export const increaseAsync = () => dispatch => {
	setTimeout(() => {
		dispatch(increase())
	}, 1000)
}

export const decreaseAsync = () => dispatch => {
	setTimeout(() => {
		dispatch(decrease())
	}, 1000)
}*/

// 초기 상태
const initialState = 0; // 상태는 꼭 객체일 필요가 없다. 숫자도 작동한다.

// 리듀서
const counter = handleActions(
		{
			[INCREASE]: (state) => state + 1,
			[DECREASE]: (state) => state - 1
		},
		initialState
)

export default counter;
