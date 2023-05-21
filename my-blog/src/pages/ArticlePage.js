import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import { useEffect, useState } from "react";
import axios from "axios";
import CommentsList from "../components/CommentsList";
import { BiLike } from "react-icons/bi";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const { articleId } = useParams();

    const { user, isLoading } = useUser();
    const article = articles.find(article => article.name === articleId);

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`)
            const articleInfo = response.data.article;
            setArticleInfo(articleInfo);
        }

        loadArticleInfo()
    }, [])

    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }

    if (!article) {
        return <NotFoundPage />
    }

    return (
        <>
            <h1>{article.title}</h1>
            <div className="upvote-section">
                {user
                    ? <button onClick={addUpvote}><BiLike /> Upvote</button>
                    : <button>Log in to upvote</button>
                }
                <p>This Article has: {articleInfo.upvotes} upvote(s)</p>
            </div>
            {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}

            {user
                ?
                <AddCommentForm
                    articleName={articleId}
                    onArticleUpdated={
                        updatedArticle => setArticleInfo(updatedArticle)
                    }
                />
                : <button>Log in to add comment</button>

            }

            <CommentsList comments={articleInfo.comments} />
        </>
    )
}

export default ArticlePage;