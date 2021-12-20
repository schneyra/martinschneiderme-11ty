module.exports = function recentArticles(articles, page) {
    // remove current article from list
    let filteredArticles = articles.filter(
        (article) => article.inputPath !== page.inputPath
    );

    filteredArticles = filteredArticles.slice(0, 5);

    return filteredArticles;
};
