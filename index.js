const express = require('express');

const app = express();

app.get('/', (req,res) => {
        res.json({
            message: 'Successfully',

        });
})

app.listen(8085);
