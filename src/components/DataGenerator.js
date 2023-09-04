import React, { useState, useEffect } from 'react';
import { generateTestData, saveToCSV } from '../helpers/generateData.js';

const DataGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateData = () => {
    setIsGenerating(true);
  };

  useEffect(() => {
    if (isGenerating) {
      // Generate synthetic data
      const testData = generateTestData(100); // Generate 100+ entries for each dataset

      // Save synthetic data to CSV files
      saveToCSV(testData.titles, 'titles.csv');
      saveToCSV(testData.credits, 'credits.csv');

      setIsGenerating(false);
    }
  }, [isGenerating]);

  return (
    <div>
      <h1>Data Generator</h1>
      <button onClick={handleGenerateData} disabled={isGenerating}>
        {isGenerating ? 'Generating Data...' : 'Generate Data'}
      </button>
    </div>
  );
};

export default DataGenerator;
