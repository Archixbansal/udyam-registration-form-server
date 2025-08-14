
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;


app.use(cors()); 
app.use(bodyParser.json()); 
const validateFormData = (data) => {
  const { aadhaar, name, organizationType, pan } = data;

  if (!aadhaar || !/^\d{12}$/.test(aadhaar)) {
    return { error: 'Invalid Aadhaar Number' };
  }
  if (!name || name.length < 2) {
    return { error: 'Invalid Name' };
  }
  if (!organizationType) {
    return { error: 'Invalid Organization Type' };
  }
  if (!pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) {
    return { error: 'Invalid PAN Number' };
  }
  return null; 
};


app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/api/submit-form', async (req, res) => {
  const formData = req.body;
  console.log('Received form data:', formData);

  const validationError = validateFormData(formData);
  if (validationError) {
    return res.status(400).json({ message: validationError.error });
  }

  try {
    const newSubmission = await prisma.submission.create({
      data: {
        aadhaar: formData.aadhaar,
        name: formData.name,
        organizationType: formData.organizationType,
        pan: formData.pan,
      },
    });
    console.log('Saved to database:', newSubmission);
    res.status(200).json({ message: 'Data saved successfully!', data: newSubmission });
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
