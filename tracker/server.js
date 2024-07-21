const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const moment = require('moment');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const recommendationsPath = path.join(__dirname, 'recommendation.json');
const recommendations = require(recommendationsPath);

app.post('/api/period', (req, res) => {
    const { startDate } = req.body;
    const start = moment(startDate, 'YYYY-MM-DD');
    const averageCycleLength = 28;
    const menstrualPhase = [start.format('DD-MM-YYYY')];
    const ovulationPhase = [start.clone().add(14, 'days').format('DD-MM-YYYY')];
    const lutealPhase = [start.clone().add(21, 'days').format('DD-MM-YYYY')];
    const nextCycleStartDate = start.clone().add(averageCycleLength, 'days').format('DD-MM-YYYY');
    res.json({
        menstrualPhase,
        ovulationPhase,
        lutealPhase,
        nextCycleStartDate,
        recommendations
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
