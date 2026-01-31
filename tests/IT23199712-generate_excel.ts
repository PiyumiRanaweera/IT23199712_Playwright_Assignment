import * as XLSX from 'xlsx';

const testCases = [
  // ================= POSITIVE FUNCTIONAL =================
  {
    "TC ID": "Pos_Fun_0001",
    "Test case name": "Greeting phrase",
    "Input": "oyaata kohomadha?",
    "Expected output": "ඔයාට කොහොමද?",
    "Actual output": "ඔයාට කොහොමද?",
    "Status": "Pass",
    "Justification": "Standard transliteration for greeting preserved."
  },
  {
    "TC ID": "Pos_Fun_0002",
    "Test case name": "Mixed-language input",
    "Input": "machan mata adha meeting ekak thiyenavaa",
    "Expected output": "මචන් මට අද meeting එකක් තියෙනවා",
    "Actual output": "මචන් මට අද meeting එකක් තියෙනවා",
    "Status": "Pass",
    "Justification": "English words within Singlish text handled correctly."
  },
  {
    "TC ID": "Pos_Fun_0003",
    "Test case name": "Short request",
    "Input": "mata help ekak karanna puLuvandha?",
    "Expected output": "මට help එකක් කරන්න පුළුවන්ද?",
    "Actual output": "මට help එකක් කරන්න පුළුවන්ද?",
    "Status": "Pass",
    "Justification": "Question format and English 'help' preserved."
  },
  {
    "TC ID": "Pos_Fun_0004",
    "Test case name": "Simple sentence",
    "Input": "mama gedhara yanavaa",
    "Expected output": "මම ගෙදර යනවා",
    "Actual output": "මම ගෙදර යනවා",
    "Status": "Pass",
    "Justification": "Basic sentence structure transliterated accurately."
  },
  {
    "TC ID": "Pos_Fun_0005",
    "Test case name": "Compound sentence",
    "Input": "mama bath kanna yanavaa, passee ennam",
    "Expected output": "මම බත් කන්න යනවා, පස්සේ එන්නම්",
    "Actual output": "මම බත් කන්න යනවා, පස්සේ එන්නම්",
    "Status": "Pass",
    "Justification": "Comma and multiple clauses handled correctly."
  },
  {
    "TC ID": "Pos_Fun_0006",
    "Test case name": "Question sentence",
    "Input": "oyaa monavadha karannee?",
    "Expected output": "ඔයා මොනවද කරන්නේ?",
    "Actual output": "ඔයා මොනවද කරන්නේ?",
    "Status": "Pass",
    "Justification": "Interrogative particle correctly converted."
  },
  {
    "TC ID": "Pos_Fun_0011",
    "Test case name": "Thanks phrase",
    "Input": "bohooma sthuthiyi",
    "Expected output": "බොහෝම ස්තුතියි",
    "Actual output": "බොහෝම ස්තුතියි",
    "Status": "Pass",
    "Justification": "Polite phrase spelling accurate."
  },
  {
    "TC ID": "Pos_Fun_0015",
    "Test case name": "Future tense",
    "Input": "mama heta ennam",
    "Expected output": "මම හෙට එන්නම්",
    "Actual output": "මම හෙට එන්නම්",
    "Status": "Pass",
    "Justification": "Future tense suffix correctly handled."
  },
  {
    "TC ID": "Pos_Fun_0019",
    "Test case name": "Motivation",
    "Input": "oyaa hari hoDHAyi",
    "Expected output": "ඔයා හරි හොඳයි",
    "Actual output": "", 
    "Status": "Fail",
    "Justification": "Empty string received; likely a UI rendering delay."
  },

  // ================= NEGATIVE FUNCTIONAL =================
  {
    "TC ID": "Neg_Fun_0001",
    "Test case name": "Empty input",
    "Input": "",
    "Expected output": "",
    "Actual output": "",
    "Status": "Pass",
    "Justification": "No input leads to no output as expected."
  },
  {
    "TC ID": "Neg_Fun_0005",
    "Test case name": "Wrong spelling",
    "Input": "mamgedraynava",
    "Expected output": "mamgedraynava",
    "Actual output": "මම්ගෙඩ්‍රය්නව",
    "Status": "Fail",
    "Justification": "System attempted to transliterate nonsensical spelling."
  },
  {
    "TC ID": "Neg_Fun_0006",
    "Test case name": "Slang input",
    "Input": "thx bro",
    "Expected output": "thx bro",
    "Actual output": "තx bro",
    "Status": "Fail",
    "Justification": "Slang 'thx' incorrectly partially converted."
  },

  // ================= UI TEST CASES =================
  {
    "TC ID": "Pos_UI_0001",
    "Test case name": "Real-time conversion",
    "Input": "man gedhara yanavaa",
    "Expected output": "මන් ගෙදර යනවා",
    "Actual output": "man ගෙදර යනවා",
    "Status": "Fail",
    "Justification": "Real-time trigger failed to convert the first word."
  },
  {
    "TC ID": "Neg_UI_0003",
    "Test case name": "Page reload behavior",
    "Input": "man gedhara yanavaa",
    "Expected output": "Output resets",
    "Actual output": "",
    "Status": "Fail",
    "Justification": "System output box was empty instead of showing reset state."
  },
  {
    "TC ID": "Neg_UI_0004",
    "Test case name": "No update UI",
    "Input": "hello",
    "Expected output": "hello",
    "Actual output": "",
    "Status": "Fail",
    "Justification": "UI failed to display the English word in output box."
  },

  // ================= EDGE CASES =================
  {
    "TC ID": "Edge_0001",
    "Test case name": "Very long input",
    "Input": "mama ".repeat(100),
    "Expected output": "Handled without crash",
    "Actual output": "Timeout",
    "Status": "Fail",
    "Justification": "Browser session timed out before processing long string."
  },
  {
    "TC ID": "Edge_0002",
    "Test case name": "Emoji input",
    "Input": "oya 😊 kohomadha",
    "Expected output": "ඔයා 😊 කොහොමද",
    "Actual output": "ඔය 😊 කොහොමද",
    "Status": "Fail",
    "Justification": "Character 'a' lost when followed immediately by emoji."
  }
];

// 1. Create workbook and worksheet
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(testCases);

// 2. Format columns (Set widths for readability)
const wscols = [
  { wch: 15 }, // TC ID
  { wch: 25 }, // Test name
  { wch: 30 }, // Input
  { wch: 30 }, // Expected
  { wch: 30 }, // Actual
  { wch: 10 }, // Status
  { wch: 50 }, // Justification
];
ws['!cols'] = wscols;

// 3. Append and Write
XLSX.utils.book_append_sheet(wb, ws, 'Execution_Results');
XLSX.writeFile(wb, 'IT23199712_Test_Report.xlsx');

console.log('✅ Excel file IT23199712_Test_Report.xlsx has been created successfully!');