import express from 'express';
import { generateUploadURL, generateDownloadURL } from './s3.js';
import cors from 'cors';

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static('front'));

app.get('/s3Url', async (req, res) => {
  console.log("------------------fetch1");
  const url = await generateUploadURL();
  res.send({url});
})

app.post('/s3Url/download', async(req, res) => {
  console.log("====================fetch2");
  console.log(req.body.objectKey);
  const url = await generateDownloadURL(req.body.objectKey);
  console.log(url);
  res.status(200).send(url);
  // const url = await generateDownloadURL(req.body.objectKey)
  // res.send({url});
})

app.post("/test", async(req, res) => {
  // res.send("yes");
  const obj = req.body;
  res.status(200).send(obj);
})

app.listen(8080, () => console.log("listening on port 8080"))