import { Router } from 'express';
import multer from 'multer';
import pdf from 'pdf-parse';

const router = Router();
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Process the uploaded file
    const buffer = req.file.buffer;
    const data = await pdf(buffer);

    // Extract text content
    const textContent = data.text;

    // Here you can add additional processing logic
    // For example, analyzing the document content or extracting specific information

    res.json({
      message: 'Document processed successfully',
      textContent,
      pageCount: data.numpages,
    });
  } catch (error) {
    console.error('Document processing error:', error);
    res.status(500).json({ error: 'Failed to process document' });
  }
});

export default router;