import React, { useState, useEffect } from 'react';
import RenderChart from './renderChart';

const CompanyDetails = () => {
  const [companyData, setCompanyData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
 
  useEffect(() => {
    fetch('http://localhost:3001/data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCompanyData(data);
        setSelectedData([data[0]])
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);

  const toggleChartData = (id) => {
    const list = companyData.find((comp) => comp.id === parseInt(id));
    const selectedDataIds = selectedData.map((sel) => sel.id)
    if (!selectedDataIds.includes(id)) {
      setSelectedData([...selectedData, list]);
    }
  };

  const removeSelectedItem = (id) => {
    const removedSelectedItem = selectedData.filter(sel => sel.id !== id);
    setSelectedData([...removedSelectedItem]);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row', margin: '1em 2em' }}>
        {
          companyData?.map((company) => {
            return <div key={company.id}>
              <button onClick={() => toggleChartData(company.id)}>{company.company_name}</button>
            </div>
          })
        }
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', margin: '1em' }}>
        {
          selectedData.map((company) => {
            return <div key={company.id} style={{ margin: '1em', display: 'flex', flexDirection: 'row', border: '1px solid grey', borderRadius: '25px', width: '100px' }}>
              <span style={{ padding: '8px', color: 'black' }} onClick={() => toggleChartData(company.id)}>{company.company_name}</span>
              <span style={{ color: 'red', fontSize: '12px', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => removeSelectedItem(company.id)}>X</span>
            </div>
          })
        }
      </div>
      <RenderChart selectedData={selectedData} />
    </div>
  );
};

export default CompanyDetails;
