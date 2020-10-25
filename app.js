const Joi = require('joi');
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!!!!')
});

app.get('/api/courses', (req, res) => {
    fs.readFile('courses.json', 'utf-8', (err, data) => {
        if(err) return res.status(500).send('Server error');

        const courses = JSON.parse(data.toString());
        return res.send(courses);
    })
});

app.get('/api/courses/:id', (req, res) => {
    fs.readFile('courses.json', 'utf-8', (err, data) => {
        if(err) return err;

        const courses = JSON.parse(data.toString());
        const course = courses.find(c => c.id === parseInt(req.params.id));
        // 404 bad request object not found by convection
        if(!course) return res.status(404).send('The course with the given Id was not found!');
        return res.send(course);
    })
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.message);

    fs.readFile('courses.json', 'utf-8', (err, data) => {
        if(err) return err;

        const courses = JSON.parse(data.toString());
        const course = {
            id: courses.length + 1,
            name: req.body.name
        }
        courses.push(course);
        fs.writeFile('courses.json', JSON.stringify(courses), (err) => {
            console.log(err)
        });
        return res.send(course);
    })
});

app.put('/api/courses/:id', (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.message);
    fs.readFile('courses.json', 'utf-8', (err, data) => {
        if(err) return err;

        const courses = JSON.parse(data.toString());
        const course = courses.find(c => c.id === +req.params.id);
        if(!course) return res.status(404).send('The course with the given Id was not found!');
    
        course.name = req.body.name;
        fs.writeFile('courses.json', JSON.stringify(courses), (err) => {
            console.log(err)
        });
        return res.send(course);
    })
});

app.delete('/api/courses/:id', (req, res) => {
    fs.readFile('courses.json', 'utf-8', (err, data) => {
        if(err) return err;

        const courses = JSON.parse(data.toString());
        const course = courses.find(c => c.id === +req.params.id);
        if(!course) return res.status(404).send('The course with the given Id was not found!');
        const index = courses.indexOf(course);
        courses.splice(index, 1);
        fs.writeFile('courses.json', JSON.stringify(courses), (err) => {
            console.log(err)
        });
        return res.send(course);
    })
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(10).required()
    })
    return schema.validate({ name: course.name });
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });