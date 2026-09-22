# Website content management

Open `/admin` and sign in with `ADMIN_PASSWORD`. `ADMIN_SESSION_SECRET` and `DATABASE_URL` must also be configured in `.env.local`.

The sidebar covers the homepage hero, contact page, careers, About content, partners, team, research overview, products, patents, blogs, publications, legal pages, page headings, homepage zoom copy, navigation, footer, and SEO.

For collaboration names and logos, open **Collaboration logos & names**. Use **Blogs**, **Patents & R&D**, **Product cards**, **About page**, and **Careers** for the respective content. Each collection supports adding, editing, removing, and reordering records. Images can be selected from Media library. Careers includes the application form labels, placeholders, success message, empty-jobs message, and search metadata. Blog button labels are in Patents & R&D; general page titles and descriptions are in Page headings. Removing all jobs displays the editable empty message and hides the application form.

Expand an item to edit its fields. Use **Add**, **Remove**, **Move up**, and **Move down** for lists. Changes remain in the editor until **Publish changes** is selected. Publishing saves to PostgreSQL and refreshes public content without a rebuild. Blog slugs must be unique lowercase words separated by hyphens.

Upload pictures in **Media library**. Select them from the image dropdown in a content editor. Existing project pictures are also available. New images remain in `public/uploads`; candidate documents are private in `storage/resumes`, downloaded only through authenticated admin routes. Images referenced by published content cannot be deleted. Bundled project assets are available for selection but cannot be deleted from the media UI.

Run `npm run db:migrate` after updating the project. Migration adds missing CMS sections while preserving existing database content. Defaults in `data/cms-defaults.json` and `data/site-content.json` are seed data, not a second editable store.

Run `npm run test:cms` for validation/session tests. With the local server running, use `npm run check:admin` for API and page checks. This republishes unchanged content and uploads then removes one temporary verification image.

Use Node.js 20.9 or newer. Hosting must have persistent storage for both project folders and PostgreSQL. Back up the database, `public/uploads`, and `storage/resumes` together. Serverless/read-only hosting is incompatible with project-folder uploads without a persistent mounted volume.

Publication DOI and social profile URL fields are optional. Leave them blank until verified destinations are available; blank links are hidden on the public site. Use actual company profile URLs, not social platform homepages.

Applications are saved in PostgreSQL and available under Job Applications. External notifications require a trusted `CAREERS_WEBHOOK_URL` configured on the server and a restart. This endpoint receives candidate details and resumes; configure only an approved hiring service. Delivery times out after 10 seconds without undoing the saved application.
