import React from 'react';
import { FaFilePdf, FaFileExcel } from 'react-icons/fa';
import './Payslip.css';

const Payslip = () => {
  // Sample payslip data
  const payslipData = {
    employee: {
      name: "John Doe",
      id: "IT-2025-007",
      department: "Engineering",
      bankAccount: "XXXX-XXXX-1234"
    },
    currentMonth: {
      netPay: 8450.00,
      currency: 'IND',
      payPeriod: 'June 2025',
      paymentDate: '2025-06-30'
    },
    ytdEarnings: 67600.00,
    breakdown: [
      { component: 'Base Salary', amount: 7500.00, type: 'Earnings' },
      { component: 'On-Call Allowance', amount: 500.00, type: 'Earnings' },
      { component: 'Performance Bonus', amount: 650.00, type: 'Earnings' },
      { component: 'Tax', amount: -1200.00, type: 'Deduction' },
      { component: 'Retirement Plan', amount: -450.00, type: 'Deduction' },
      { component: 'Health Insurance', amount: -300.00, type: 'Deduction' }
    ]
  };

  const downloadCSV = (format) => {
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Add employee information
    csvContent += "Employee Payslip\r\n\r\n";
    csvContent += `Employee Name,${payslipData.employee.name}\r\n`;
    csvContent += `Employee ID,${payslipData.employee.id}\r\n`;
    csvContent += `Department,${payslipData.employee.department}\r\n`;
    csvContent += `Bank Account,${payslipData.employee.bankAccount}\r\n\r\n`;
    
    // Add payment information
    csvContent += `Pay Period,${payslipData.currentMonth.payPeriod}\r\n`;
    csvContent += `Payment Date,${payslipData.currentMonth.paymentDate}\r\n`;
    csvContent += `Currency,${payslipData.currentMonth.currency}\r\n\r\n`;
    
    // Add salary breakdown header
    csvContent += "Salary Breakdown\r\n";
    csvContent += "Component,Amount,Type\r\n";
    
    // Add breakdown items
    payslipData.breakdown.forEach(item => {
      csvContent += `${item.component},${item.amount.toFixed(2)},${item.type}\r\n`;
    });
    
    // Add summary information
    csvContent += `\r\nNet Pay,${payslipData.currentMonth.netPay.toFixed(2)}\r\n`;
    csvContent += `YTD Earnings,${payslipData.ytdEarnings.toFixed(2)}\r\n`;
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download", 
      `${payslipData.employee.name.replace(/\s+/g, '_')}_Payslip_${payslipData.currentMonth.payPeriod.replace(/\s+/g, '_')}.${format}`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="payslip-page">
      <h2>Salary Details</h2>
      
      <div className="summary-cards">
        <div className="payslip-card">
          <h3>Current Month</h3>
          <div className="amount">
            {payslipData.currentMonth.currency} {payslipData.currentMonth.netPay.toFixed(2)}
          </div>
          <p>Net pay for {payslipData.currentMonth.payPeriod}</p>
        </div>
        
        <div className="payslip-card">
          <h3>YTD Earnings</h3>
          <div className="amount">
            {payslipData.currentMonth.currency} {payslipData.ytdEarnings.toFixed(2)}
          </div>
          <p>Jan 2025 - Present</p>
        </div>
      </div>
      
      <div className="breakdown-section">
        <h3>{payslipData.currentMonth.payPeriod} Breakdown</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Amount ({payslipData.currentMonth.currency})</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {payslipData.breakdown.map((item, index) => (
                <tr key={index}>
                  <td>{item.component}</td>
                  <td className={item.amount < 0 ? 'deduction' : 'earning'}>
                    {item.amount > 0 ? '+' : ''}{item.amount.toFixed(2)}
                  </td>
                  <td>{item.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="action-buttons">
          <button 
            className="btn pdf-btn" 
            onClick={() => downloadCSV('csv')}
            title="Download as CSV file"
          >
            <FaFilePdf /> Download CSV
          </button>
          <button 
            className="btn excel-btn" 
            onClick={() => downloadCSV('csv')}
            title="Download as CSV file"
          >
            <FaFileExcel /> Download CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payslip;