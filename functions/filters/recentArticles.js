module.exports = function recentArticles(articles, page) {
    let filteredArticles = articles.filter((article) => {
        return page.url === `/articles/${article.slug}/` ? false : true;
    });

    filteredArticles = filteredArticles.slice(0, 5);

    return filteredArticles;
};
