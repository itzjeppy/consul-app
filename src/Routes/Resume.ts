import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs';
import { openRouterChat } from '../api/OpenRouter';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

async function extractText(filePath: string, mimetype: string): Promise<string> {
  if (mimetype === 'application/pdf') {
    const dataBuffer = fs.readFileSync(filePath);
    return (await pdfParse(dataBuffer)).text;
  }
  if (
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    mimetype === 'application/msword'
  ) {
    const data = fs.readFileSync(filePath);
    const { value } = await mammoth.extractRawText({ buffer: data });
    return value;
  }
  throw new Error('Unsupported file type');
}

router.post('/upload-resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    const { path: filePath, mimetype } = req.file;
    const text = await extractText(filePath, mimetype);

    const prompt = `
Extract the following structured information from the resume text provided below. Output only a single JSON object, using the exact field names and structure as shown. If any field cannot be determined, use null for its value.

Return the result in this format:

{
  "skills": [
    {
      "technologies_known": "string (e.g., Python, JavaScript, etc.)",
      "years_of_experience": number (e.g., 3.5),
      "strength_of_skill": integer (1-10, how strong this skill is based on the resume)
    }
    // ... more skills
  ],
  "certifications": [
    {
      "certification_name": "string",
      "issued_date": "YYYY-MM-DD",
      "valid_till": "YYYY-MM-DD or null"
    }
    // ... more certifications
  ],
  "professional": {
    "last_worked_organization": "string",
    "recent_role": "string",
    "recent_project": "string or null",
    "recent_start_date": "YYYY-MM-DD or null",
    "recent_project_release_date": "YYYY-MM-DD or null"
  }
}

Guidelines:
- Estimate years_of_experience as accurately as possible from the resume.
- For strength_of_skill, give an integer 1 (weakest) to 10 (strongest) for each skill, based on emphasis and context.
- Use ISO 8601 date format (YYYY-MM-DD) for all dates.
- If any information is missing, set its value to null.
- Only produce valid JSON and nothing else.

Resume Text:
"""
${text}
"""`;

    const llmResponse = await openRouterChat(prompt);

    // Safely parse LLM response
    let output: any = {};
    try {
      const content = llmResponse.choices?.[0]?.message?.content || llmResponse.content;
      output = JSON.parse(content.trim());
    } catch {
      return res.status(500).json({ error: 'Failed to parse LLM response.' });
    }

    res.json({ success: true, data: output });
    fs.unlink(filePath, () => {});
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to process resume.' });
  }
});

export default router;