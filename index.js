const OSPerformance = require('./OSPerformance');
const express = require('express');

const app = express();


app.get('/', async (req,res) => {
       try {
        const osPerformance = new OSPerformance();
        await osPerformance.computeCpuLoad();
        return res.send({ machineInfo : osPerformance});
       }catch(e){}
})

app.listen(8085);
