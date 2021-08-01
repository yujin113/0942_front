import React, { useState } from "react";
import "./DetailPage.css";
import TitleCategory from "../TitleCategory";
import SearchBar from "../NavBar/SearchBar";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function DetailPage(props) {
  const post = props.location.state;
  const imgs = post.imgs;
  let history = useHistory();

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  if (post === undefined) {
    props.history.push("/");
  }
  const settings = {
    className: "slider",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };
  const mobile_settings = {
    className: "slider",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  // post.writer와 user_id가 같은 데이터 받아오기
  const [user, setUser] = useState({
    user_id: "yujin113",
    user_count: 5,
    user_score: 90,
    review: [
      {
        review_content: "친절해요",
        review_date: "21.07.15",
      },
      {
        review_content: "시간 약속을 잘 지켜요",
        review_date: "21.07.15",
      },
    ],
  });

  const [isDelete, setDelete] = useState(false)
  const deletePost = (e) => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios.post(`http://localhost:8080/main/post/delete/${post.id}`)
        .then((response) => {
          history.push("/main")
        })
    }
  }

  return (
    <div>
    <NavBar />
      <div className="detailPage">
        <SearchBar />
        <TitleCategory slider={true} category={true} />
        <div className="detail_container">
          <div className="detail_post">
            <div className="detail_post_top">
              <div className="detail_ud">
                <Link to={{ pathname: `/write/${post.id}`,
                  state: {
                    id: post.id, writer: post.writer ,imgs: post.imgs, date: post.date, title: post.title, cost: post.cost, place: post.place,
                    invite_num: post.invite_num, content: post.content, writer_score: post.writer_score, scrap_num: post.scrap_num,
                  },}}>
                <span>수정</span>
                </Link>
                <span onClick={deletePost}>삭제</span>
              </div>
              <div className="detail_post_userInfo">
                <img
                  src="/images/main/user.png"
                  alt="user"
                  className="post_userImg"
                />
                <Link
                  to={{
                    pathname: `/user/${post.writer}`,
                    state: {
                      user_id: user.user_id,
                      user_count: user.user_count,
                      user_score: user.user_score,
                      review: user.review,
                    },
                  }}
                >
                  <span className="post_id">{post.writer}</span>{" "}
                </Link>
                <span className="post_date">{post.date}</span>
                <span className="post_score">{post.writer_score}점</span>
              </div>
              <aside>
                <div className={imgs.length !== 0 ? "detail_slider" : null}>
                  {isMobile === true ? (
                    <Slider {...mobile_settings}>
                      {imgs.length !== 0
                        ? imgs.map((img, index) => (
                            <div key={index}>
                              <img
                                src={img}
                                alt={post.title}
                                className="post_img"
                              />
                            </div>
                          ))
                          : null}
                      </Slider>
                    ) : (
                      <Slider {...settings}>
                        {imgs.length !== 0
                          ? imgs.map((img, index) => (
                            <div key={index}>
                              <img
                                src={img}
                                alt={post.title}
                                className="post_img"
                              />
                            </div>
                          ))
                          : null}
                      </Slider>
                    )}
                  </div>
                </aside>
              </div>
              <div className="detail_post_bottom">
                <hr />
                <p className="post_title">{post.title}</p>
                <p className="post_cost">
                  <strong>배송비 : </strong>
                  {post.cost}원
                </p>
                <p className="post_place">
                  <strong>배분 장소 : </strong>
                  {post.place}
                </p>
                <p className="post_plus"> {post.content}</p>
                <p className="post_num">{post.invite_num}명 모집 중</p>
              </div>
            </div>
          </div>
          <div className="detail_button">
            <Link
              to={{
                pathname: `/chat/${post.writer}`,
                state: {
                  writer: post.writer,
                },
              }}
            >
              <div>채팅</div>
            </Link>
            <div className="detail_scrap">
              <span role="img" aria-level="heart">
                ❤️
              </span>{" "}
              {post.scrap_num}
            </div>
          </div>
        </div>
    </div>
  );
}

export default DetailPage;