import {useEffect, useState} from "react";
import FirstList from "../components/FirstList";
import OtherList from "../components/OtherList";
import PageList from "../components/PageList";

function Main() {
    const [userInfo, setUserInfo] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        const json = await ( await fetch() ).json()  // api 요청 후 -> posts에 저장
        setPosts(json.results.data);
    }, []);

    const [showPosts, setShowPosts] = useState(posts);

    const [firstPost, ...otherPosts] = showPosts;
    const onClick = (event) => {
        const filter = event.target.value;
        switch (filter) {
            case "all":
                setShowPosts(posts);
                break;
            case "front":
                setShowPosts(posts.filter(post => post.type === "front"));
                break;
            case "back":
                setShowPosts(posts.filter(post => post.type === "back"));
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <div>
                {userInfo === 0 ? null :
                    <div>
                        <div>{userInfo.profile}</div>
                        <div>{userInfo.name}</div>
                    </div>
                }
                {userInfo === 0 ? <div>LogIn</div> : <div>LogOut</div>}
            </div>

            <div>
                <div>
                    <div>Welcome to</div>
                    <div>SweetBird <span>Tech blog</span></div>
                </div>

                <div>
                    <button onClick={onClick} value="all">all</button>
                    <button onClick={onClick} value="front">front</button>
                    <button onClick={onClick} value="back">back</button>
                </div>

                <div>
                    <FirstList
                        key={firstPost.id}
                        id={firstPost.id}
                        bgImg={firstPost.background}
                        title={firstPost.title}
                        userImg={firstPost.userImg}
                        userName={firstPost.name}
                        date={firstPost.date}
                    />
                </div>

                <div>
                    {otherPosts.map((post) => {
                        <OtherList
                            key={post.id}
                            id={post.id}
                            bgImg={post.background}
                            title={post.title}
                            userImg={post.userImg}
                            userName={post.name}
                            date={post.date}
                        />
                    })}
                </div>

                <div>
                    <button>&lt; 이전</button>
                    <PageList />
                    <button>&rt; 이전</button>
                </div>
            </div>
        </div>
    );
}

export  default  Main;