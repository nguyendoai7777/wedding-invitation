import cors from 'cors';
import express from 'express';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();

const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.json()).use(cors());

const dataPath = join(__dirname, 'db.json');

app.get('/background', async (req, res) => {
	try {
		const data = readFileSync(dataPath, { encoding: 'utf8' });
		return res.status(200).send({ status: 'OK', data: JSON.parse(data).background });
	} catch {}
});

app.put('/background', async (req, res) => {
	try {
		const payload = req.body;
		const raw = readFileSync(dataPath, { encoding: 'utf8' });
		const data = JSON.parse(raw);
		data.background = payload.url;
		writeFileSync(dataPath, JSON.stringify(data, null, 2));
		return res.status(200).send({ status: 'OK', data: data });
	} catch {}
});

app.get('/images', async (req, res) => {
	try {
		const data = readFileSync(dataPath, { encoding: 'utf8' });
		return res.status(200).send({ status: 'OK', data: JSON.parse(data).imagesLayout });
	} catch {}
});
app.put('/images/:id', async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const payload = req.body;
		const raw = readFileSync(dataPath, { encoding: 'utf8' });
		const data = JSON.parse(raw);
		const find = data.imagesLayout.findIndex(c => c.id === id);
		data.imagesLayout[find].imgUrl = payload.url;
		writeFileSync(dataPath, JSON.stringify(data, null, 2));
		return res.status(200).send({ status: 'OK', data: data });
	} catch {}
});

app.listen(PORT, () => {});
