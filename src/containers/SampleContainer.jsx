import React from "react";
import Sample from "../components/Sample";
import { connect } from "react-redux";
import { getPost, getUsers } from "../modules/sample";

const {useEffect} = React
const SampleContainer = ({
  getPost,
  getUsers,
  post,
  users,
  loadingPost,
  loadingUsers,
}) => {
  // 컴포넌트가 처음 렌더링될 때 포스트와 사용자 목록을 요청
  useEffect(() => {
    getPost(1);
    getUsers(1);
  }, [getPost, getUsers]);
  console.log('SampleContainer 컴포넌트에서 받은 데이터',post,users,'loadingPost, loadingUsers',loadingPost, loadingUsers)
  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    />
  );
};

export default connect(
    ({ sample, loading }) => ({
      post: sample.post,
      users: sample.users,
      loadingPost: loading['sample/GET_POST'],
      loadingUsers: loading['sample/GET_USERS'],
    }),
    {
      getPost,
      getUsers
    }
)(SampleContainer);

/* loading 상태 조회를 따로 하지 않고, loading 상태를 조회하는 함수를 만들어서 사용
했기때문에 더이상 아래와 같이 loading 상태를 조회할 필요가 없음
export default connect(
  ({ sample }) => ({
    post: sample.post,
    users: sample.users,
    loadingPost: sample.loading.GET_POST,
    loadingUsers: sample.loading.GET_USERS,
  }),
    {
  getPost,
  getUsers
    }
)(SampleContainer);*/
