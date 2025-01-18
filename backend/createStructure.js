const fs = require('fs');
const path = require('path');

// Function to create directories and files
const createStructure = (baseDir, structure) => {
  structure.forEach(item => {
    const itemPath = path.join(baseDir, item.name);

    if (item.type === 'directory') {
      if (!fs.existsSync(itemPath)) {
        fs.mkdirSync(itemPath, { recursive: true });
        console.log(`Directory created: ${itemPath}`);
      }
      createStructure(itemPath, item.children);
    } else if (item.type === 'file') {
      if (!fs.existsSync(itemPath)) {
        fs.writeFileSync(itemPath, '', 'utf8');
        console.log(`File created: ${itemPath}`);
      }
    }
  });
};

// Define the entire folder and file structure
const structure = [
  { type: 'directory', name: 'models', children: [
    { type: 'file', name: 'ClientModel.js' },
    { type: 'file', name: 'AppraiserModel.js' },
    { type: 'file', name: 'SupervisorModel.js' },
    { type: 'file', name: 'LoanModel.js' },
    { type: 'file', name: 'PaymentModel.js' },
  ]},
  { type: 'directory', name: 'controllers', children: [
    { type: 'file', name: 'ClientController.js' },
    { type: 'file', name: 'AppraiserController.js' },
    { type: 'file', name: 'SupervisorController.js' },
    { type: 'file', name: 'LoanController.js' },
    { type: 'file', name: 'PaymentController.js' },
  ]},
  { type: 'directory', name: 'services', children: [
    { type: 'file', name: 'ClientService.js' },
    { type: 'file', name: 'AppraiserService.js' },
    { type: 'file', name: 'SupervisorService.js' },
    { type: 'file', name: 'LoanService.js' },
    { type: 'file', name: 'PaymentService.js' },
  ]},
  { type: 'directory', name: 'routes', children: [
    { type: 'file', name: 'ClientRoutes.js' },
    { type: 'file', name: 'AppraiserRoutes.js' },
    { type: 'file', name: 'SupervisorRoutes.js' },
    { type: 'file', name: 'LoanRoutes.js' },
    { type: 'file', name: 'PaymentRoutes.js' },
  ]},
  { type: 'directory', name: 'config', children: [
    { type: 'file', name: 'database.js' },
    { type: 'file', name: 'africastalking.js' },
  ]},
  { type: 'directory', name: 'utils', children: [
    { type: 'file', name: 'mpesa.js' },
    { type: 'file', name: 'helpers.js' },
  ]},
  { type: 'directory', name: 'middlewares', children: [
    { type: 'file', name: 'authMiddleware.js' },
    { type: 'file', name: 'errorHandler.js' },
  ]},
];

// Run the script to create the structure
const baseDir = path.resolve(__dirname); // Root directory of the app
createStructure(baseDir, structure);

console.log('Project structure created successfully!');
