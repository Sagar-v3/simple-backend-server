const express = require("express");

const app = express();
app.use(express.json());

const users = [{
    name: "harkiart",
    kidneys: [{
        healthy: false
    }]   
}]

app.get('/', function(req,res) {

    const numberOfKidneys = users[0].kidneys.length;
    let numberOfHealthyKidneys = 0;

    for(let i=0; i < users[0].kidneys.length; i++) {
        if(users[0].kidneys[i].healthy == true) {
            numberOfHealthyKidneys = numberOfHealthyKidneys +1;
        }
    }

    let numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys; 
    return res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
});

app.post('/', function(req,res) {

    const isHealthy = req.body.isHealthy;
    console.log(isHealthy);
    users[0].kidneys.push({
        healthy: isHealthy
    });

     res.json({
        msg: "Done!"
    });
});

app.put('/', function(req,res) {

    for(let i =0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }

    res.json({msg: "Done!"});

});

app.delete("/", function (req, res) {
    const user = users[0];
    const kidneys = user.kidneys;

    // If only one kidney, do nothing — keep it even if unhealthy
    if (kidneys.length === 1) {
        return res.json({ msg: "Only one kidney left. Cannot delete it." });
    }

    // Filter out unhealthy kidneys but only if more than one kidney exists
    const healthyKidneys = kidneys.filter(kidney => kidney.healthy === true);

    // If filtering removes all kidneys, keep the last one (unhealthy or not)
    if (healthyKidneys.length === 0) {
        return res.json({ msg: "Cannot remove all kidneys. At least one must remain." });
    }

    user.kidneys = healthyKidneys;

    res.json({ msg: "Unhealthy kidneys removed." });
});

app.listen(3000);