const fs = require('fs');

const a = (err, data) => {
    if(err) return res.status(500).send('Server error');

    const courses = JSON.parse(data.toString());
    return res.send(courses);
};

module.exports = a;