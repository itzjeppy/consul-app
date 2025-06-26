import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import { openRouterChat } from '../api/OpenRouter';
import fs from 'fs';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    const filePath = req.file.path;
    // Assume PDF for this example. Add DOCX support as needed.
    const dataBuffer = fs.readFileSync(filePath);
    const text = (await pdfParse(dataBuffer)).text;

    const prompt = `Extract a skill vector and employment history from this resume. Respond in JSON with "skills" and "history" fields.\n\nResume:\n${text}`;
    const llmResponse = await openRouterChat(prompt);

    // Ideally, parse and validate the JSON output from the LLM
    const output = JSON.parse(llmResponse.choices[0].message.content);

    // Update user profile in your DB here
    // await updateUserProfile(req.user.id, output);

    res.json({ success: true, data: output });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to process resume.' });
  }
});

export default router;