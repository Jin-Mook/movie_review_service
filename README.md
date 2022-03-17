# 목차
- [서비스명](#서비스명)
    + [나도 평론가](#나도-평론가)
- [프로젝트 구성 안내](#프로젝트-구성-안내)
    + [1. 와이어 프레임](#1-와이어-프레임)
    + [2. 프로젝트 소개](#2-프로젝트-소개)
    + [3. 서비스 이미지](#3-서비스-이미지)
      - [영화 목록을 랜덤으로 보여주는 메인 화면](#----------------------)
      - [영화 줄거리를 보여주는 상세 페이지](#-------------------)
    + [4. 서비스 실행 방법](#4-서비스-실행-방법)
    + [5. 기술 스택](#5-기술-스택)
- [나의 역할 및 작성한 주요 코드](#나의-역할-및-작성한-주요-코드)
    + [내가 맡은 역할](#내가-맡은-역할)
    + [passport.js 패키지를 이용한 로컬 로그인 전략](#passportjs-패키지를-이용한-로컬-로그인-전략)
    + [유저 평가 목록을 불러오는 컨트롤러](#유저-평가-목록을-불러오는-컨트롤러)
    + [유닛테스트 진행](#유닛테스트-진행)
- [프로젝트를 진행하며 느낀점 및 아쉬운점](#프로젝트를-진행하며-느낀점-및-아쉬운점)
    + [느낀점](#느낀점)
    + [아쉬운점](#아쉬운점)

<br>

# 서비스명
### 나도 평론가
- 영화에 대한 평점을 확인할 수 있습니다.
- 평점 확인 뿐만 아니라 직접 평점을 줄 수 있고 다른 사람의 평점과 해당 유저의 평가가 가능한 서비스입니다.
<br>

# 프로젝트 구성 안내
### 1. 와이어 프레임
- [와이어프레임 바로가기](https://whimsical.com/MZicn3wKE8tEei73i4bRJ1)
<img src="https://user-images.githubusercontent.com/91299082/158553707-ccb22815-4fb4-48c8-b0e8-50447f1f8f41.png" width="80%" height="80%">

### 2. 프로젝트 소개
- 다양한 영화들의 평점을 알 수 있습니다.
- 다른 유저의 후기를 확인할 수 있습니다.
- 다른 유저의 후기를 보고 해당 유저가 얼마나 객관적으로 평가했는지 점수를 줄 수 있습니다.
- 객관적으로 평가한 유저들의 후기를 통해 해당 영화가 나에게 맞을지 확인할 수 있는 서비스입니다.

### 3. 서비스 이미지
#### 영화 목록을 랜덤으로 보여주는 메인 화면
<img src="https://user-images.githubusercontent.com/91299082/158557238-97cd43db-1720-4686-9c44-9c431fc5a1da.png" width="70%" height="70%">

#### 영화 줄거리를 보여주는 상세 페이지
<img src="https://user-images.githubusercontent.com/91299082/158557400-178c7787-81bc-424c-b24c-bce3746490c8.png" width="70%" height="70%">

### 4. 서비스 실행 방법
1. root 디렉터리에서 docker-compose -f docker-compose-dev.yml up 명령어 실행합니다.
2. 이후 docker exec -it 'project_backend컨테이너아이디' /bin/bahs or sh 작성해서 백엔드 컨테이너 내부로 들어갑니다.
3. cd src 이동 후 node data_to_db.js 작성해서 데이터베이스에 필요한 데이터들을 넣습니다.

### 5. 기술 스택
|기술|선정 이유|
|:---:|:---:|
|Express.js|node.js를 이용해 백엔드 서버를 구현하는데 가장 많이 사용되는 패키지이며 참고할 문서가 가장 많기 때문에 사용하였습니다.|
|MySQL|가장 널리 사용되는 DB이며 준수한 속도를 보장하기 때문에 선택하였습니다.|
|passport.js|로그인과 관련된 패키지 중 많이 사용되고 있고 다양한 전략을 통해 원하는 구현을 할 수 있기 때문에 사용하였습니다.|
|sequelize.js|대중적으로 사용되며 코드가 직관적이라고 생각하였기 때문에 선택하였습니다.|
|docker|프로젝트를 참여하는 인원이 모두 동일한 환경에서 작업할 수 있게 하기위해 사용하였습니다.|
|swagger-jsdoc|스웨거를 이용해 api 명세서를 작성한다면 프론트엔드 분들과 원활한 소통이 될 수 있을것이라 생각하여 사용하였습니다.|
|jsonwebtoken|JWT를 이용해 로그인을 구현하면 세션을 이용한 방법보다 서버에 무리가 덜 갈것이라고 판단하여 사용하였습니다.|


# 나의 역할 및 작성한 주요 코드

### 내가 맡은 역할

- DB 스키마 설계
- 도커를 이용한 개발환경 세팅
- 로그인 기능 api 작성
- 유저 상세페이지 및 랭킹 페이지 api 작성
- 아래 구조는 제가 직접 작성한 코드만 나타낸 구조입니다.
- 컨트롤러 분리 및 테스트 코드 작성
```
📦backend
 ┣ 📂controllers
 ┃ ┣ 📜login.js
 ┃ ┣ 📜login.test.js
 ┃ ┣ 📜user_info.js
 ┃ ┣ 📜user_info.test.js
 ┃ ┣ 📜user_ranking.js
 ┃ ┗ 📜user_ranking.test.js
 ┃
 ┣ 📂models
 ┃ ┣ 📜index.js
 ┃ ┣ 📜movie.js
 ┃ ┣ 📜movie_review.js
 ┃ ┣ 📜user.js
 ┃ ┣ 📜user_review.js
 ┃ ┗ 📜want_watch.js
 ┃
 ┣ 📂passport
 ┃ ┗ 📜strategies.js
 ┃
 ┣ 📂routes
 ┃ ┣ 📜login_pages.js
 ┃ ┣ 📜middleware.js
 ┃ ┣ 📜middleware.test.js
 ┃ ┣ 📜user_info_pages.js
 ┃ ┗ 📜user_ranking_pages.js
 ┃
 ┣ 📜Dockerfile
 ┣ 📜Dockerfile.dev
 ┣ 📜app.js
```
### passport.js 패키지를 이용한 로컬 로그인 전략
- passport-local 패키지를 이용해 원하는 형태의 로그인 전략 코드를 작성하였습니다.
- 이후 passport-kakao 를 이용하여 카카오 전략을 이용한 소셜 로그인도 구현했습니다.
- 로그인에 성공한 유저에게 JWT토큰을 쿠키에 담아주는 방식을 이용하였습니다.
- 이후 로그아웃을 하게 되면 쿠키의 JWT를 삭제해 주었습니다.
```js
// 로그인 전략
const strategy_login = new LocalStrategy(
  {
    usernameField: "id",
    passwordField: "password",
  },
  async (id, password, cb) => {
    try {
      const exUser = await User.findOne({ where: { id } });

      // exUser가 없다면 없는 회원이다.
      if (!exUser) return cb(null, false, { message: "no user" });
      // exUser가 있는경우
      else {
        // 비밀번호가 틀린경우
        const result = await bcrypt.compare(password, exUser.password);
        if (!result) return cb(null, false, { message: "no password" });

        // 유저 확인이 완료된 경우
        return cb(null, exUser);
      }
    } catch (error) {
      console.error(error);
      return cb(error);
    }
  }
);

passport.use("login", strategy_login);
```

### 유저 평가 목록을 불러오는 컨트롤러
- ORM의 relation을 설정하여 코드로 작성하였습니다.
- 유저와 코멘트의 관계를 이용해 검색을 한번에 진행하였습니다.
- sequelize 공식 문서를 참고하여 sequelize에서 제공하는 다양한 쿼리 문을 이용하였습니다. 
```js
// 유저 평가 목록 불러오기 컨트롤러
exports.showUserComment = async (req, res, next) => {
  try {
    const reviewedUserIndex = req.params.reviewed_user_id   // 평가 받은 유저의 인덱스
    // 평가 받은 유저에 해당하는 코멘트들을 가져온다.
    const scoreAndComments = await User_review.findAll({
      where: {
        reviewed_index: reviewedUserIndex
      },
      attributes: ['index', 'reviewer_index', 'score', 'comment'],
      include: {
        model: User,
        attributes: ['name'],
      }
    })
    
    if (scoreAndComments.length === 0) return res.status(300).json({success: false, message: '유저에 해당하는 코멘트가 없습니다.'})
  
    res.json(scoreAndComments)
  } catch (err) {
    console.error(err)
    next(err)
  }
}

// sequelize의 메서드인 findOrCreate를 이용해 검색 및 추가를 한번에 진행했습니다.
async (accessToken, refreshToken, profile, done) => {
 try {
   // id가 있는지 확인해보고 있으면 해당 모델을 반환하고 없으면 저장 후 반환한다.
   // 이때 user의 형태는 배열의 형태이고 0번 인덱스에는 모델의 정보가 있고
   // 1번 인덱스에는 새로 만들었으면 true, 기존에 있던 유저면 false를 나타낸다.
   const user = await User.findOrCreate({
     where: {
       id: profile.id,
     },
     defaults: {
       name: profile.displayName,
       password: "kakao-login",
       social: profile.provider,
     },
   });

   done(null, user);
 } catch (err) {
   console.error(err);
   done(err);
 }
}
```

### 유닛테스트 진행
- jest를 이용하여 유닛테스트를 진행했습니다.
- 아래 코드는 유저 상세페이지의 데이터를 가져오는 컨트롤러를 테스트한 코드입니다.
- 데이터베이스와 관련된 부분은 mock함수를 만들어 테스트를 진행했습니다.
```js
describe('showUserInfoPage', () => {
  const req = {
    params: {
      user_id: 3
    }
  }
  const next = jest.fn()
  const res = {
    status: jest.fn(() => res),
    json: jest.fn()
  }


  test('유저 상세 페이지에서 유저 정보 가져오기', async () => {
    Want_watch.findAll.mockResolvedValue([{
      movie_index: '1',
      Movie: {
        title: '테스트 제목',
        poster_url: '테스트 포스터'
      }
    }])

    Movie_review.findAll.mockResolvedValue([{
      movie_index: '1',
      Movie: {
        title: '테스트 제목',
        poster_url: '테스트 포스터',
      },
      score: '50',
      comment: '테스트 코멘트'
    }])

    User.findOne.mockResolvedValue({temperature: 14})
    const response = {
      temperature: 14,
      want_watch_movies: [ { movie_index: '1', title: '테스트 제목', poster_url: '테스트 포스터'}],
      comment_movies: [{
        movie_index: '1',
        title: '테스트 제목',
        poster_url: '테스트 포스터',
        score: '50',
        comment: '테스트 코멘트'
      }]
    }

    await showUserInfoPage(req, res, next)
    expect(res.json).toBeCalledWith(response)
  })

  test('없는 유저의 인덱스를 받는 경우', async () => {
    const error = new Error()
    error.name = 'TypeError'
    Want_watch.findAll.mockRejectedValue(error)

    await showUserInfoPage(req, res, next)
    expect(res.json).toBeCalledWith({success: false, message: '없는 유저의 인덱스 입니다.'})
  })

  test('서버 내부 에러', async () => {
    const error = '테스트용 에러'
    Want_watch.findAll.mockRejectedValue(error)

    await showUserInfoPage(req, res, next)
    expect(next).toBeCalledTimes(1)
  })
})
```

# 프로젝트를 진행하며 느낀점 및 아쉬운점
### 느낀점
- sequelize 공식문서에 있는 다양한 메소드를 이용하면 훨씬 코드를 간결하게 작성할 수 있다는 점을 알게되었습니다.
- docker-compose를 이용해 개발환경을 세팅한 후 동일한 환경에서 개발하는 것의 편리함을 느꼈습니다.
- 테스트 코드 작성의 중요성에 대해 느꼈습니다.
   - 실제 테스트 코드를 작성하다 보니 생각보다 놓치고 작성한 부분이 있다는 것을 알게되었습니다.
   - 이후 놓친 부분에 대한 코드를 추가로 작성하여 훨씬 에러를 줄일 수 있는 코드를 작성하였습니다.
- api 명세서를 확실히 작성해 두니 프론트엔드 작업하시는 분들도 훨씬 편했다는 얘기를 들어서 문서화의 편리함에 대해 느꼈습니다.

### 아쉬운점
- 프론트엔드 작업을 하신 분들이 시간이 부족하여 api 연결을 모두 확인하지 못하여 단순이 swagger를 통해 확인만 한 부분이 아쉬운것 같습니다.
- 마찬가지로 원래 헤로쿠에 컨테이너 형태로 배포까지 마무리하고 싶었지만 배포하지 못한점이 아쉽습니다.
- 유닛테스트는 진행하였지만 통합테스트는 시간 상 진행하지 못한 부분이 아쉽습니다.
