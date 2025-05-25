function doPost(e) {
  try {
    // Log the incoming request
    Logger.log('Received POST request');
    
    // Get the active spreadsheet and the first sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();
    
    // Get the form data
    let data;
    if (e.parameter.data) {
      // If data is sent as form parameter
      data = JSON.parse(e.parameter.data);
    } else if (e.postData && e.postData.contents) {
      // If data is sent as raw post data
      data = JSON.parse(e.postData.contents);
    } else {
      throw new Error('No data received');
    }
    
    Logger.log('Parsed data: ' + JSON.stringify(data));
    
    // Prepare the row data
    const rowData = [
      new Date().toLocaleString(), // Use local time for better readability
      data.name || '',
      data.year || '',
      data.department || '',
      data.isLoggedIn ? 'Yes' : 'No'
    ];
    
    Logger.log('Row data to be inserted: ' + JSON.stringify(rowData));
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data added successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Log the error
    Logger.log('Error: ' + error.toString());
    
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Function to set up the spreadsheet headers
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  
  // Set headers
  const headers = [
    'Timestamp',
    'Name',
    'Year',
    'Department',
    'Login Status'
  ];
  
  // Clear existing content and set headers
  sheet.clear();
  sheet.appendRow(headers);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#f3f3f3');
    
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
  
  // Log setup completion
  Logger.log('Sheet setup completed');
}

// Function to test the script
function testDoPost() {
  const testData = {
    name: 'Test User',
    year: '3',
    department: 'CSE',
    isLoggedIn: true
  };
  
  const e = {
    parameter: {
      data: JSON.stringify(testData)
    }
  };
  
  doPost(e);
} 