import express from 'express';
import cors from 'cors';

import notFound from './middlewares/default/notFound.js';
import errorHandler from './middlewares/default/errorHandler.js';
import morgan from 'morgan';
import helmet from 'helmet';
import { responseFormatter } from './middlewares/default/responseFormater.js';
import connectDB from './config/db.js';

import alumniDataRoute from './modules/institute_dashboard/alumni_data/alumni_data.routes.js';
import campaignsRoute from './modules/institute_dashboard/campaigns/campaigns.routes.js';
import eventManagementRoute from './modules/institute_dashboard/event_management/event_management.routes.js';
import profileRoute from './modules/alumni_dashboard/profile/profile.routes.js';
import eventsRoute from './modules/alumni_dashboard/events/events.routes.js';
import pollRoute from './modules/alumni_dashboard/engagement_activities/polls/polls.routes.js';
import analyticsReportsRoute from './modules/institute_dashboard/analytics_reports/analytics_reports.routes.js';
import donationRoute from './modules/donation/donation.routes.js';
import donation1Route from './modules/donation1/donation1.routes.js';
import approvalWorkflowRoute from './modules/institute_dashboard/content_management/approval_workflow/approval_workflow.routes.js';
import announcementsRoute from './modules/alumni_dashboard/news_update/announcements/announcements.routes.js';
import spotlightStoriesRoute from './modules/alumni_dashboard/news_update/spotlight_stories/spotlight_stories.routes.js';
import newsLetterRoute from './modules/alumni_dashboard/news_update/newsletter/newsletter.routes.js';
import notificationRoute from './modules/institute_dashboard/notification_management/notification_management.routes.js';
import notificationTemplateRoute from './modules/institute_dashboard/notification_templates/notification_templates.routes.js';
import notification1Route from './modules/institute_dashboard/notification_management1/notification_management1.routes.js';
import mentorshipRoute from './modules/alumni_dashboard/mentorship/mentorship.routes.js';
import chatRoute from './modules/chat/chat.routes.js';

import compression from 'compression';

const app = express();

// default middlewares
// app.use(helmet());
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://checkout.razorpay.com",
        ],
        scriptSrcElem: [
          "'self'",
          "'unsafe-inline'",
          "https://checkout.razorpay.com",
        ],
        styleSrc: ["'self'", "'unsafe-inline'", "https:"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: [
          "'self'",
          "https://checkout.razorpay.com",
          "https://api.razorpay.com",
        ],
        frameSrc: [
          "'self'",
          "https://checkout.razorpay.com",
          "https://api.razorpay.com",
        ],
        childSrc: [
          "'self'",
          "https://checkout.razorpay.com",
          "https://api.razorpay.com",
        ],
        formAction: ["'self'", "https://checkout.razorpay.com"],
        frameAncestors: ["'self'", "https://checkout.razorpay.com"],
        objectSrc: ["'none'"],
      },
    },
  })
);

app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/socket.io')) return next(); // skip Helmet for sockets
  helmet()(req, res, next);
});


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(express.static("public")); 

connectDB();

app.use(responseFormatter);
app.get('/', (req, res) => {
     res.send('Server is running!');
})

app.use('/api/v1/institute-dashboard/alumni-data', alumniDataRoute);
app.use('/api/v1/institute-dashboard/campaigns', campaignsRoute);
app.use('/api/v1/institute-dashboard/event-management', eventManagementRoute);
app.use('/api/v1/alumni-dashboard/profile', profileRoute);
app.use('/api/v1/alumni-dashboard/events', eventsRoute);
app.use('/api/v1/alumni-dashboard/poll', pollRoute);
app.use('/api/v1/institute-dashboard/analytics-reports', analyticsReportsRoute);
app.use('/api/v1/donations', donationRoute);
app.use('/api/v1/donations1', donation1Route);
app.use('/api/v1/institute-dashboard/content-management/approval-workflow', approvalWorkflowRoute);
app.use('/api/v1/alumni-dashboard/news-update/announcements', announcementsRoute);
app.use('/api/v1/alumni-dashboard/news-update/spotlight-stories', spotlightStoriesRoute);
app.use('/api/v1/alumni-dashboard/news-update/newsletter', newsLetterRoute);
app.use('/api/v1/institute-dashboard/notification', notificationRoute);
app.use('/api/v1/institute-dashboard/notification-template', notificationTemplateRoute);
app.use('/api/v1/institute-dashboard/notification1', notification1Route);
app.use('/api/v1/alumni-dashboard/mentorship', mentorshipRoute);
app.use('/api/v1/chat', chatRoute);

app.use(notFound);
app.use(errorHandler);


export default app;