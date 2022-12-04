exports.createPages = async ({ actions: {createPage, createSlice}, graphql }) => {
  createSlice({
    id: `header`,
    component: require.resolve(`./src/components/header.js`),
  });
  createSlice({
    id: `footer`,
    component: require.resolve(`./src/components/footer.js`),
  });
  createSlice({
    id: `contact-icons`,
    component: require.resolve(`./src/components/contact-icons.js`),
  });
  createSlice({
    id: `contact-text`,
    component: require.resolve(`./src/components/contact-text.js`),
  });

  const { data } = await graphql(`
    query {
      allContentfulPortfolioEntry {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  data.allContentfulPortfolioEntry.edges.forEach(edge => {
    const slug = edge.node.slug
    createPage({
      path: `featured-work/${slug}`,
      component: require.resolve(`./src/templates/portfolio-entry.js`),
      context: { slug: slug },
    })
  })
};
