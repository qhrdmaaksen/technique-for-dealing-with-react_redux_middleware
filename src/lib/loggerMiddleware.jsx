// 미들웨어 이전상태,액션정보,새로워진 상태 정보를 콘솔에 찍음
const LoggerMiddleware = (store) => (next) => (action) => {
	// 미들 웨어 기본 구조
	console.group(action && action.type) // 액션 타입으로 log 를 그룹화함
	console.log('이전 상태', store.getState())
	console.log('액션', action)
	next(action) // 다음 미들웨어 혹은 리듀서에게 전달
	console.log('다음 상태', store.getState()) // 업데이트 된 상태
	console.group() // 그룹 끝
}

// 일반 function 으로 작성
/*
const LoggerMiddleware = function(store) {
	return function(next) {
		return function(action) {
			// 미들 웨어 기본 구조
		}
	}
}
*/

export default LoggerMiddleware