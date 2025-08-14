
const request = require('supertest');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

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

app.use(cors());
app.use(bodyParser.json());
app.post('/api/submit-form', async (req, res) => {
  const formData = req.body;
  const validationError = validateFormData(formData);
  
  if (validationError) {
    return res.status(400).json({ message: validationError.error });
  }

  // In a real application, you would save this to the database here.
  // For this test, we just return a success message.
  res.status(200).json({ message: 'Data saved successfully!' });
});

describe('POST /api/submit-form', () => {
  // Test 1: Successful submission with valid data
  it('should return a 200 status for valid form data', async () => {
    const validFormData = {
      aadhaar: '123456789012',
      name: 'John Doe',
      organizationType: 'Proprietorship',
      pan: 'ABCDE1234F',
    };
    const response = await request(app)
      .post('/api/submit-form')
      .send(validFormData);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Data saved successfully!');
  });

  // Test 2: Unsuccessful submission with invalid Aadhaar data
  it('should return a 400 status for invalid Aadhaar data', async () => {
    const invalidFormData = {
      aadhaar: '123', // Invalid Aadhaar number
      name: 'John Doe',
      organizationType: 'Proprietorship',
      pan: 'ABCDE1234F',
    };
    const response = await request(app)
      .post('/api/submit-form')
      .send(invalidFormData);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid Aadhaar Number');
  });

  it('should return a 400 status for invalid PAN data', async () => {
    const invalidFormData = {
      aadhaar: '123456789012',
      name: 'John Doe',
      organizationType: 'Proprietorship',
      pan: 'INVALIDPAN', 
    };
    const response = await request(app)
      .post('/api/submit-form')
      .send(invalidFormData);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid PAN Number');
  });
});
