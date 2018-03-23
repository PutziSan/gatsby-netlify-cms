import React from 'react';

const BlogTemplate = props => (
  <div className="blog-post-container">
    <div className="blog-post">
      <h1>{props.data.markdownRemark.frontmatter.title}</h1>
      <h2>{props.data.markdownRemark.frontmatter.date}</h2>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
      />
    </div>
  </div>
);

export const pageQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title
            }
        }
    }
`;

export default BlogTemplate;
