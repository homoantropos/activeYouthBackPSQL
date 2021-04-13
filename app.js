const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

const activityRoutes = require('./routes/activity_routes');
const addressRoutes = require('./routes/address_routes');
const appointmentRoutes = require('./routes/appointment_routes');
const coachRoutes = require('./routes/coach_routes');
const countryRoutes = require('./routes/country_routes');
const eduEntityRoutes = require('./routes/educational_entity_routes');
const expensesRoutes = require('./routes/expenses_routes');
const memberRoutes = require('./routes/members_routes');
const newsRoutes = require('./routes/news_routes');
const participantRoutes = require('./routes/participant_routes');
const placeRoutes = require('./routes/place_routes');
const regionRoutes = require('./routes/region_routes');
const reportRoutes = require('./routes/report_routes');
const resultRoutes = require('./routes/result_routes');
const sportHallRoutes = require('./routes/sport_hall_routes');
const sportKindsRoutes = require('./routes/sport_kind_routes');
const townRoutes = require('./routes/town_routes');
const userRoutes = require('./routes/user_routes');

app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/activity', activityRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/coach', coachRoutes);
app.use('/api/country', countryRoutes);
app.use('/api/eduEntity', eduEntityRoutes);
app.use('/api/expenses', expensesRoutes);
app.use('/api/member', memberRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/participant', participantRoutes);
app.use('/api/place', placeRoutes);
app.use('/api/region', regionRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/result', resultRoutes);
app.use('/api/sportHall', sportHallRoutes);
app.use('/api/sportKind', sportKindsRoutes);
app.use('/api/town', townRoutes);
app.use('/api/user', userRoutes);


module.exports = app
