const Sample = ({ loadingPost, loadingUsers, post, users }) => {
  console.log('Sample 컴포넌트에서 받은 데이터',post,users,'loadingPost, loadingUsers',loadingPost, loadingUsers)
  return (
    <div>
      <section>
        <h1>포스트</h1>
        {loadingPost && "로딩 중..."}
        {!loadingPost && post && ( // post 객체가 유효할 때 post.title/body 보여줌 유효하지않으면 오류발생
          <div>
            <h3>{post.title}</h3>
            <h3>{post.body}</h3>
          </div>
        )}
      </section>
      <hr />
      <section>
        <h1>사용자 목록</h1>
        {loadingUsers && "로딩 중..."}
        {!loadingUsers && users && ( // users 객체가 유효할때 username/email 보여줌 유효하지않으면 오류발생
          <ul>
            {users.map((user) => {
              return (
                <li key={user.id}>
                  {user.username}({user.email})
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};
export default Sample;
