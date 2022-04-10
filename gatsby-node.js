const path = require('path')
const { createFilePath } = require(`gatsby-source-filesystem`)

// 절대경로 설정
exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  const output = getConfig().output || {}

  actions.setWebpackConfig({
    output,
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        utils: path.resolve(__dirname, 'src/utils'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        styles: path.resolve(__dirname, 'src/styles'),
        types: path.resolve(__dirname, 'src/types'),
      },
    },
  })
}

// 각 게시물(markdown) 데이터에 Slug 생성
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })

    createNodeField({ node, name: 'slug', value: slug })
  }
}

// 마크다운 데이터를 통한 페이지 생성
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  // 페이징을 위한 모든 마크다운 파일 가져오기
  const queryAllMarkdownData = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date, frontmatter___title] }
          skip: 1
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `,
  )

  // Handling GraphQL Query Error
  if (queryAllMarkdownData.errors) {
    reporter.panicOnBuild(`Error while running query`)
    return
  }

  // Import Post Template Component
  const PostTemplateComponent = path.resolve(__dirname, 'src/templates/post_template.tsx')

  // Page Generating Function
  const generatePostPage = ({
    node: {
      fields: { slug },
    },
  }) => {
    const pageOptions = {
      path: slug,
      component: PostTemplateComponent,
      context: { slug },
    }

    createPage(pageOptions)
  }

  // Generate Post Page And Passing Slug Props for Query
  queryAllMarkdownData.data.allMarkdownRemark.edges.forEach(generatePostPage)
}
