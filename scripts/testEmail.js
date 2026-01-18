import * as m from '../src/utils/emailUtils.js';
const names = ["O'Keefe", "D'Amore", "O'Hara", "O'Reilly", "O'Conner"]; 
console.log(names.map(n => ({ name: n, email: m.makeCompanyEmail(n, 'company.com'), valid: m.isValidEmail(m.makeCompanyEmail(n, 'company.com')) })));
