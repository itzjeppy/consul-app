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
    const dataBuffer = fs.readFileSync(filePath);
    const text = (await pdfParse(dataBuffer)).text;

    const prompt = `Extract the following structured information from the resume text provided below. Output only a single JSON object, using the exact field names and structure as shown. If any field cannot be determined, use null for its value.

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

    const output = JSON.parse(llmResponse.choices[0].message.content);

    res.json({ success: true, data: output });
    // Clean up file
    fs.unlink(filePath, () => {});
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to process resume.' });
  }
});

export default router;