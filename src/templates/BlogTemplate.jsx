import React from 'react';

const BlogTemplate = props => (
  <div>
    <h1>{props.data.markdownRemark.frontmatter.title}</h1>
    <h2>{props.data.markdownRemark.frontmatter.date}</h2>
    {props.data.markdownRemark.frontmatter.thumbnail && (
      <img src={props.data.markdownRemark.frontmatter.thumbnail} />
    )}
    <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }} />
    <div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.body }} />
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
                thumbnail
                body
            }
        }
    }
`;

export default BlogTemplate;
