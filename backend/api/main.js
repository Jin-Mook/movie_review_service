//const dotenv = require("dotenv");
const express = require("express");
const {
  Movie,
  Movie_review,
  sequelize,
  Want_watch,
  User,
  User_review,
} = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
//dotenv.config()
const main = express.Router();
const { logInChecker } = require("../routes/middleware");

//* 메인 페이지 영화 리스트
// /**
//  * @swagger
//  * /main/movies:
//  *  get:
//  *    summary: 메인페이지 영화 리스트
//  *    tags:
//  *    - USER
//  *    ApiKeyAuth:
//  *      type: apiKey
//  *      in: header
//  *      name: accessToken
//  *    responses:
//  *      200:
//  *        description: 로그아웃 성공
//  *        content:
//  *          application/json:
//  *            schema:
//  *              type: object
//  *              properties:
//  *                success:
//  *                  type: boolean
//  *                  example: true
//  *                message:
//  *                  type: string
//  *                  example: 로그아웃 성공
//  *      401:
//  *        description: 토큰이 잘못된 경우
//  *        content:
//  *          application/json:
//  *            schema:
//  *              type: object
//  *              properties:
//  *                success:
//  *                  type: boolean
//  *                  example: false
//  *                message:
//  *                  type: string
//  *                  example: 유효하지 않은 토큰입니다.
//  *      419:
//  *        description: 토큰이 만료된 경우 기본은 1일이 지나야 만료됨
//  *        content:
//  *          application/json:
//  *            schema:
//  *              type: object
//  *              properties:
//  *                success:
//  *                  type: boolean
//  *                  example: false
//  *                message:
//  *                  type: string
//  *                  example: 만료된 토큰입니다.
//  *      500:
//  *        description: 서버 에러
//  */
main.get("/main/movies", async (req, res) => {
  const data = await Movie.findAll({
    order: sequelize.random(),
    attributes: ["index", "poster_url"],
    where: {
      poster_url: {
        [Op.ne]: null,
      },
    },
    limit: 8,
    subQuery: false,
  });
  res.send(data, 200);
});

//* 영화 상세 페이지
main.get("/main/movie/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return (res.statusCode = 400);
  }
  const movie_info = await Movie.findOne({
    where: {
      index: id,
    },
  });
  const review_data = await Movie_review.findAll({
    where: {
      movie_index: id,
    },
  });
  if (movie_info === 0) {
    return (res.statusCode = 400);
  }
  res.send({ movie_info, review_data }, 200);
});
//보고싶어요 기록이랑 (본인)평점 기록 보게하는거 구현하기

//*영화 검색 페이지
main.get("/main/search/:keyword", logInChecker, async (req, res, next) => {
  try {
    const { keyword } = req.params;
    const index = req.user.user_index;
    const isLoggedIn = !!index;
    console.log(isLoggedIn, "로그인 여부 ");

    if (!keyword) {
      res.statusCode = 400;
      return res.send("키워드가 없습니다");
    }

    //* 해당 키워드의 영화들
    const movies = await Movie.findAll({
      where: {
        title: {
          [Op.like]: `%${keyword}%`,
        },
      },
      raw: true,
    });
    if (isLoggedIn) {
      //* 나의 좋아요들
      const likes = await Want_watch.findAll({
        where: {
          user_index: index,
        },
      });
      console.log(likes, "좋아요들");
      //* 해당 키워드 영화들중 내가 좋아요한 영화가 있는지
      const result = movies.map((_movie) => {
        if (likes.some((like) => like.movie_id === _movie.id)) {
          return { ..._movie, isLiked: true };
        }
        return _movie;
      });
      res.statusCode = 200;
      return res.send({ data: result });
    }
    res.statusCode = 200;
    return res.send({ data: movies });
  } catch (e) {
    console.log(e, "에러");
    res.statusCode = 500;
    return res.end();
  }
});
//?20 movie_review.find(user_id,movie_id)

main.post("/services/like/:movie_id", async (req, res) => {
  const { movie_id } = req.params;
  if (!movie_index || !user_id) {
    return (res.statusCode = 400);
  }
  await Want_watch.create({
    user_index: user_id,
    movie_index: movie_id,
  });
  res.statusCode(200);
});

main.delete("/services/unlike/:movie_id", async (req, res) => {
  const { movie_id } = req.params;
  if (!movie_index || !user_id) {
    return (res.statusCode = 400);
  }
  Want_watch.destroy({
    where: {
      user_index: user_id,
      movie_index: movie_id,
    },
  });
  res.statusCode(200);
});
// 찾았는데 없다면 추가하기

main.post("/services/ratings/:movie_id", async (req, res) => {
  const { movie_id } = req.params;
  const { rating } = req.body;
  if (!movie_index || !user_id || rating) {
    return (res.statusCode = 400);
  }
  await Movie_review.create({
    user_index: user_id,
    movie_index: movie_id,
    score: rating,
  });
});
//이미 있다면? 추가하기 혹은 FindorCreate로 바꾸기, 유저 테이블의 review_num 추가해주기

main.post("/services/comment/:movie_id", async (req, res) => {
  const { movie_id } = req.params;
  const { text } = req.body;
  if (!movie_index || !user_id || text) {
    return (res.statusCode = 400);
  }
  await Movie_review.create({
    user_index: user_id,
    movie_index: movie_id,
    comment: text,
  });
});
//이미 있다면? 추가하기, 유저 테이블의 review_num 추가해주기

main.put("/services/comment/:movie_id", async (req, res) => {
  const { movie_id } = req.params;
  const { text } = req.body;
  if (!movie_index || !user_id || text) {
    return (res.statusCode = 400);
  }
  // await Movie_review.findOne({

  // })
});

main.delete("/services/comment/:movie_id", async (req, res) => {
  const { movie_id } = req.params;
  const { text } = req.body;
  if (!movie_index || !user_id || text) {
    return (res.statusCode = 400);
  }
  // await Movie_review.findOne({

  // })
});

export default main;
