require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `My Blog I`,
    description: `Kick off your next`,
    author: `@me`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-mongodb`,
      options: { 
        dbName: `test`, 
        connectionString: process.env.MONGO_DB_URL,
        extraParams: {ssl: true, authSource: `admin`},
        clientOptions: {
          useUnifiedTopology: true,
          useNewUrlParser: true
        },
        collection: `posts`,
        map: { documents: { description: `text/markdown` } }
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
