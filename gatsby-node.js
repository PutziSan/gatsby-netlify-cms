const path = require('path');

const markdownQuery = graphql => graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `);

const rejectOnErrors = result => result.errors ? Promise.reject(result.errors) : result;

const toPageConfig = (path, componentPath) => ({
  path: path,
  component: componentPath,
  context: {}, // additional data can be passed via context
});

const createPage = (boundActionCreators, componentPath) => edge => (
  boundActionCreators.createPage(toPageConfig(edge.node.frontmatter.path, componentPath))
);

const getComponentPath = () => path.resolve('src/templates/BlogTemplate.jsx');

exports.createPages = ({ boundActionCreators, graphql }) => (
  markdownQuery(graphql)
    .then(rejectOnErrors)
    .then(result => result.data.allMarkdownRemark.edges.forEach(createPage(boundActionCreators, getComponentPath())))
);