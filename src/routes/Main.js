import { useEffect, useState } from "react";
import FirstList from "../components/FirstList.js";
import OtherList from "../components/OtherList.js";
import PageList from "../components/PageList.js";
import { useQuery } from "react-query";
import { fetchPosts } from "../api.js";

function Main() {
    const [prevList, setPrevList] = useState(1);
    const [prevPage, setPrevPage] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState("all");

    const { isLoading, data } = useQuery(["posts", prevList], fetchPosts);
    const [showPosts, setShowPosts] = useState([]);

    const totalPosts = 200; // 전체 개수
    const postLength = 10; // 한 페이지에서 보여주는 리스트 개수

    const maxPage = Math.ceil(totalPosts / (postLength * 10));
    const lastList = Math.ceil((totalPosts - ((maxPage - 1) * postLength * 10)) / postLength);

    useEffect(() => {
        setShowPosts(data || []); // data가 null일 수 있으므로 기본값을 빈 배열로 설정
    }, [data]);

    const onClick = (event) => {
        const filter = event.target.value;
        setSelectedFilter(filter); // 선택된 필터 업데이트

        // 필터링 로직
        switch (filter) {
            case "all":
                setShowPosts(data || []); // data가 null일 수 있으므로 기본값을 빈 배열로 설정
                break;
            case "front":
                setShowPosts(data.filter(post => post.type === "front") || []);
                break;
            case "back":
                setShowPosts(data.filter(post => post.type === "backend") || []);
                break;
            default:
                break;
        }
    };

    const toPrevPage = () => {
        if (prevPage !== 1) {
            setPrevPage(prev => prev - 1);
            setPrevList(((prevPage - 2) * 10) + 1);
        }
    }

    const toNextPage = () => {
        if (prevPage !== maxPage) {
            setPrevPage(prev => prev + 1);
            setPrevList((prevPage * 10) + 1);
        }
    }

    const moveToList = (list) => {
        setPrevList(list)
    }

    return (
        <div>
            <div className="Main_container">
                <div className="Main_subTitle">
                    <div>Welcome to</div>
                    <div className="Main_subTitle2">
                        SweetBird <span className="Main_subTitle_highlight">Tech blog</span>
                    </div>
                </div>

                <div className="Main_option">
                    <button onClick={onClick} value="all" className={selectedFilter === "all" ? "active" : ""}>all</button>
                    <button onClick={onClick} value="front" className={selectedFilter === "front" ? "active" : ""}>front</button>
                    <button onClick={onClick} value="back" className={selectedFilter === "back" ? "active" : ""}>back</button>
                </div>

                {isLoading ? (
                    "loading..."
                ) : (
                    <div>
                        {showPosts && showPosts.length > 0 ? (
                            <>
                                <FirstList
                                    key={showPosts[0].id}
                                    id={showPosts[0].id}
                                    bgImg={showPosts[0].background}
                                    title={showPosts[0].title}
                                    userImg={showPosts[0].userImg}
                                    userName={showPosts[0].name}
                                    date={showPosts[0].date}
                                />
                                {showPosts.slice(1).map((post) => (
                                    <OtherList
                                        key={post.id}
                                        id={post.id}
                                        bgImg={post.background}
                                        title={post.title}
                                        userImg={post.userImg}
                                        userName={post.name}
                                        date={post.date}
                                    />
                                ))}
                            </>
                        ) : (
                            <div>개수 맞춰서 받아오면 아래 숫자 자체가 안뜸.</div>
                        )}
                    </div>
                )}

                <div className="Main_footer_page">
                    <button onClick={toPrevPage}>&lt;</button>
                    <PageList
                        prevList={prevList}
                        prevPage={prevPage}
                        maxPage={maxPage}
                        postLength={postLength}
                        lastList={lastList}
                        moveToList={moveToList}
                    />
                    <button onClick={toNextPage}>&gt;</button>
                </div>
            </div>
        </div>
    );
}

export default Main;


