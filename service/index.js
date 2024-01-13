import express from 'express'
import { exec } from 'child_process'

const app = express()
const port = process.env.PORT || 8080;

const execAsync = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
            console.log(stdout)
            console.log(stderr)
            resolve(stdout)
        })
    })
}

app.get("/", async (req, res) => {
    const cmd = req.query.test
    const execCmd = `mongo < ${cmd}`
    console.log(execCmd)
    const result = await execAsync(execCmd)
    const first = result.indexOf('[')
    const last = result.lastIndexOf(']')
    const replaceable = ['\n', '\t', '\\', '(', ')', 'ObjectId', 'NumberDecimal', 'ISODate']
    let test = result.substring(first, last+1)
    for (let word of replaceable) {
        test = test.replaceAll(word, '')
    }
    const json = JSON.parse(test)
    try{
        res.send({
            result: json
        });
    }
    catch(error) {
        console.log(error)
        res.send({
            error
        });
    }
});

app.listen(port, () => {
    execAsync('mongoimport --file sales.json')
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
