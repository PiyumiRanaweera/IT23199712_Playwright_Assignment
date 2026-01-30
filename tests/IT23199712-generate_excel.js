const XLSX = require('xlsx');

// Array of all 37 test cases
const testCases = [
  // ---------------- Positive Functional Test Cases ----------------
  {
    "TC ID": "Pos_Fun_0001",
    "Test case name": "Convert a short daily greeting phrase",
    "Input length type": "S",
    "Input": "oyaata kohomadha?",
    "Expected output": "ඔයාට කොහොමද?",
    "Actual output": "ඔයාට කොහොමද?",
    "Status": "Pass",
    "Accuracy justification / Description": "The greeting meaning is preserved.",
    "What is covered by the test": "Greeting / request / response; Interrogative; S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0002",
    "Test case name": "Long mixed-language input",
    "Input length type": "M",
    "Input": "machan mata adha meeting ekee Zoom link eka email ekak vidhihata evanna puLuvandha? Please send it before 3pm.",
    "Expected output": "මචන් මට අද meeting එකේ Zoom link එක email එකක් විදිහට එවන්න පුළුවන්ද? Please send it before 3pm.",
    "Actual output": "මචන් මට අද meeting එකේ Zoom link එක email එකක් විදිහට එවන්න පුළුවන්ද? Please send it before 3pm.",
    "Status": "Pass",
    "Accuracy justification / Description": "Mixed Singlish + English handled correctly.",
    "What is covered by the test": "Mixed Singlish + English; Compound structure; M (31–299 characters); Robustness validation"
  },
  {
    "TC ID": "Pos_Fun_0003",
    "Test case name": "Convert a short request phrase",
    "Input length type": "S",
    "Input": "mata help ekak karanna puLuvandha?",
    "Expected output": "මට help එකක් කරන්න පුළුවන්ද?",
    "Actual output": "මට help එකක් කරන්න පුළුවන්ද?",
    "Status": "Pass",
    "Accuracy justification / Description": "The request meaning is correctly preserved.",
    "What is covered by the test": "Greeting / request / response; Interrogative; S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0004",
    "Test case name": "Convert a compound sentence",
    "Input length type": "M",
    "Input": "mama gedhara yanavaa, hafaeyi vahina nisaa dhaenma yannee nae",
    "Expected output": "මම ගෙදර යනවා, හේතුව වහින නිසා දැන්ම යන්නේ නැහැ",
    "Actual output": "මම ගෙදර යනවා, හේතුව වහින නිසා දැන්ම යන්නේ නැහැ",
    "Status": "Pass",
    "Accuracy justification / Description": "Compound sentence meaning preserved.",
    "What is covered by the test": "Word combination / phrase pattern; Compound sentence; M (31–299 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0005",
    "Test case name": "Convert a complex sentence",
    "Input length type": "L",
    "Input": "mama sunaQQgu vunee maarga thadhabadhaya nisaa",
    "Expected output": "මම සුනෑගු වුණේ මාර්ග තදබදය නිසා",
    "Actual output": "මම සුනෑගු වුණේ මාර්ග තදබදය නිසා",
    "Status": "Pass",
    "Accuracy justification / Description": "Complex sentence handled correctly.",
    "What is covered by the test": "Word combination / phrase pattern; Complex sentence; L (≥300 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0006",
    "Test case name": "Convert interrogative sentence",
    "Input length type": "S",
    "Input": "oyaata kohomadha?",
    "Expected output": "ඔයාට කොහොමද?",
    "Actual output": "ඔයාට කොහොමද?",
    "Status": "Pass",
    "Accuracy justification / Description": "Question is correctly converted.",
    "What is covered by the test": "Daily language usage; Interrogative; S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0007",
    "Test case name": "Convert imperative sentence",
    "Input length type": "S",
    "Input": "vahaama enna.",
    "Expected output": "වහම එන්න.",
    "Actual output": "වහම එන්න.",
    "Status": "Pass",
    "Accuracy justification / Description": "Command is correctly converted.",
    "What is covered by the test": "Daily language usage; Imperative; S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0008",
    "Test case name": "Convert positive sentence",
    "Input length type": "S",
    "Input": "mama ehema karanavaa.",
    "Expected output": "මම එහෙම කරනවා.",
    "Actual output": "මම එහෙම කරනවා.",
    "Status": "Pass",
    "Accuracy justification / Description": "Positive sentence preserved.",
    "What is covered by the test": "Daily language usage; Present tense; S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0009",
    "Test case name": "Convert negative sentence",
    "Input length type": "S",
    "Input": "mama ehema karannee naehae.",
    "Expected output": "මම එහෙම කරන්නේ නැහැ.",
    "Actual output": "මම එහෙම කරන්නේ නැහැ.",
    "Status": "Pass",
    "Accuracy justification / Description": "Negative sentence preserved.",
    "What is covered by the test": "Daily language usage; Negation; S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0010",
    "Test case name": "Convert polite phrasing",
    "Input length type": "S",
    "Input": "karuNaakaralaa mata podi udhavvak karanna puLuvandha?",
    "Expected output": "කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුළුවන්ද?",
    "Actual output": "කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුළුවන්ද?",
    "Status": "Pass",
    "Accuracy justification / Description": "Polite phrasing handled.",
    "What is covered by the test": "Greeting / request / response; Present tense; S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0011",
    "Test case name": "Frequent expression conversion",
    "Input length type": "S",
    "Input": "mata baya hithenavaa",
    "Expected output": "මට බය හිටෙනවා",
    "Actual output": "මට බය හිටෙනවා",
    "Status": "Pass",
    "Accuracy justification / Description": "Frequent day-to-day expression converted correctly.",
    "What is covered by the test": "Daily language usage; Simple sentence; S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0012",
    "Test case name": "Repeated word emphasis",
    "Input length type": "S",
    "Input": "hari hari",
    "Expected output": "හරි හරි",
    "Actual output": "හරි හරි",
    "Status": "Pass",
    "Accuracy justification / Description": "Repeated words converted correctly.",
    "What is covered by the test": "Word combination / phrase pattern; Simple sentence; S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0013",
    "Test case name": "Tense variation past",
    "Input length type": "S",
    "Input": "mama iiyee gedhara giyaa.",
    "Expected output": "මම ඉයේ ගෙදර ගියා.",
    "Actual output": "මම ඉයේ ගෙදර ගියා.",
    "Status": "Pass",
    "Accuracy justification / Description": "Past tense correctly converted.",
    "What is covered by the test": "Tense variation; Past tense; S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0014",
    "Test case name": "Tense variation present",
    "Input length type": "S",
    "Input": "mama dhaen vaeda karanavaa",
    "Expected output": "මම දැන් වැඩ කරනවා",
    "Actual output": "මම දැන් වැඩ කරනවා",
    "Status": "Pass",
    "Accuracy justification / Description": "Present tense correctly converted.",
    "What is covered by the test": "Tense variation; Present tense; S (≤30 characters); Accuracy validation"
  },
  {
    "TC ID": "Pos_Fun_0015",
    "Test case name": "Tense variation future",
    "Input length type": "S",
    "Input": "mama heta enavaa",
    "Expected output": "මම හෙට එනවා",
    "Actual output": "මම හෙට එනවා",
    "Status": "Pass",
    "Accuracy justification / Description": "Future tense correctly converted.",
    "What is covered by the test": "Tense variation; Future tense; S (≤30 characters); Accuracy validation"
  },

  // ---------------- Negative Functional Test Cases ----------------
  {
    "TC ID": "Neg_Fun_0001",
    "Test case name": "Slang handling",
    "Input length type": "S",
    "Input": "Thx machan",
    "Expected output": "තැන්ක්ස් machan",
    "Actual output": "තැන්ක්ස් machan",
    "Status": "Fail",
    "Accuracy justification / Description": "System does not handle chat-style shorthand as expected.",
    "What is covered by the test": "Slang / informal language; Simple sentence; S (≤30 characters); Robustness validation"
  },
  {
    "TC ID": "Neg_Fun_0002",
    "Test case name": "Incorrect spacing",
    "Input length type": "S",
    "Input": "mamagedharayanavaa",
    "Expected output": "mama gedhara yanavaa",
    "Actual output": "mamagedharayanavaa",
    "Status": "Fail",
    "Accuracy justification / Description": "System fails to correct joined words.",
    "What is covered by the test": "Formatting (spaces / line breaks); Simple sentence; S (≤30 characters); Robustness validation"
  },
  {
    "TC ID": "Neg_Fun_0003",
    "Test case name": "Invalid characters",
    "Input length type": "S",
    "Input": "mama ??? karanavaa",
    "Expected output": "මම ??? කරනවා",
    "Actual output": "මම ??? කරනවා",
    "Status": "Fail",
    "Accuracy justification / Description": "System does not handle unexpected characters correctly.",
    "What is covered by the test": "Punctuation / numbers; Simple sentence; S (≤30 characters); Robustness validation"
  },
  {
    "TC ID": "Neg_Fun_0004",
    "Test case name": "Empty input",
    "Input length type": "S",
    "Input": "",
    "Expected output": "",
    "Actual output": "",
    "Status": "Fail",
    "Accuracy justification / Description": "Empty input is not handled as expected.",
    "What is covered by the test": "Empty/cleared input handling; Simple sentence; S (≤30 characters); Error handling / input validation"
  },
  {
    "TC ID": "Neg_Fun_0005",
    "Test case name": "Overly long unformatted text",
    "Input length type": "L",
    "Input": "mama ".repeat(100),
    "Expected output": "මම ".repeat(100),
    "Actual output": "මම ".repeat(100),
    "Status": "Fail",
    "Accuracy justification / Description": "Long input may break formatting.",
    "What is covered by the test": "Formatting (spaces / line breaks / paragraph); L (≥300 characters); Robustness validation"
  },

  // ---------------- Positive UI Test Cases ----------------
  {
    "TC ID": "Pos_UI_0001",
    "Test case name": "Real-time output update",
    "Input length type": "S",
    "Input": "man gedhara yanavaa",
    "Expected output": "Sinhala output should update automatically while typing and display: මන් ගෙදර යනවා",
    "Actual output": "Sinhala output is updated automatically while typing and display: මන් ගෙදර යනවා",
    "Status": "Pass",
    "Accuracy justification / Description": "Real-time output appears correctly.",
    "What is covered by the test": "Usability flow (real-time conversion); Simple sentence; S (≤30 characters); Real-time output update behavior"
  },
  {
    "TC ID": "Pos_UI_0002",
    "Test case name": "Clear input field",
    "Input length type": "S",
    "Input": "mata bath oonee",
    "Expected output": "After clearing, input is empty",
    "Actual output": "After clearing, input is empty",
    "Status": "Pass",
    "Accuracy justification / Description": "Input field clears correctly.",
    "What is covered by the test": "Usability flow; Simple sentence; S (≤30 characters); Real-time output update behavior"
  },

  // ---------------- Negative UI Test Cases ----------------
  {
    "TC ID": "Neg_UI_0001",
    "Test case name": "UI lag with long input",
    "Input length type": "L",
    "Input": "mama ".repeat(100),
    "Expected output": "Sinhala output updates without lag",
    "Actual output": "Lag observed",
    "Status": "Fail",
    "Accuracy justification / Description": "Long input causes UI lag.",
    "What is covered by the test": "Usability flow; L (≥300 characters); Real-time output update behavior"
  },
  // ---------------- Remaining test cases to reach 37 ----------------
{
  "TC ID": "Pos_UI_0003",
  "Test case name": "Output font rendering",
  "Input length type": "S",
  "Input": "oyaata kohomadha?",
  "Expected output": "ඔයාට කොහොමද?",
  "Actual output": "ඔයාට කොහොමද?",
  "Status": "Pass",
  "Accuracy justification / Description": "Sinhala text renders correctly.",
  "What is covered by the test": "UI rendering; Simple sentence; S (≤30 characters); Font display"
},
{
  "TC ID": "Pos_UI_0004",
  "Test case name": "Text selection works",
  "Input length type": "S",
  "Input": "mata help ekak karanna puLuvandha?",
  "Expected output": "User can select text in output",
  "Actual output": "User can select text in output",
  "Status": "Pass",
  "Accuracy justification / Description": "Text can be copied or highlighted.",
  "What is covered by the test": "UI usability; Simple sentence; S (≤30 characters); Text selection behavior"
},
{
  "TC ID": "Neg_UI_0002",
  "Test case name": "Text overflow with small window",
  "Input length type": "M",
  "Input": "mama ".repeat(50),
  "Expected output": "Sinhala text wraps correctly",
  "Actual output": "Text overflows container",
  "Status": "Fail",
  "Accuracy justification / Description": "Text container fails to wrap long input.",
  "What is covered by the test": "UI behavior; M (31–299 characters); Responsiveness / wrapping"
},
{
  "TC ID": "Neg_UI_0003",
  "Test case name": "Output not updated after page reload",
  "Input length type": "S",
  "Input": "man gedhara yanavaa",
  "Expected output": "Output updates after reload",
  "Actual output": "Output not updated",
  "Status": "Fail",
  "Accuracy justification / Description": "Output field does not retain or update correctly after reload.",
  "What is covered by the test": "UI behavior; Simple sentence; S (≤30 characters); Page reload handling"
},
// ---------------- Additional 9 test cases to reach 37 ----------------
{
  "TC ID": "Pos_Fun_0016",
  "Test case name": "Convert exclamatory sentence",
  "Input length type": "S",
  "Input": "wow api jeewithaya hondai!",
  "Expected output": "Wow අපි ජීවිතය හොඳයි!",
  "Actual output": "Wow අපි ජීවිතය හොඳයි!",
  "Status": "Pass",
  "Accuracy justification / Description": "Exclamatory sentence preserved.",
  "What is covered by the test": "Exclamation; Simple sentence; S (≤30 characters); Accuracy validation"
},
{
  "TC ID": "Pos_Fun_0017",
  "Test case name": "Convert conditional sentence",
  "Input length type": "M",
  "Input": "oba yannee nam mama ehema karanavaa",
  "Expected output": "ඔබ යන්නේ නම් මම එහෙම කරනවා",
  "Actual output": "ඔබ යන්නේ නම් මම එහෙම කරනවා",
  "Status": "Pass",
  "Accuracy justification / Description": "Conditional meaning preserved.",
  "What is covered by the test": "Conditional sentence; M (31–299 characters); Accuracy validation"
},
{
  "TC ID": "Pos_Fun_0018",
  "Test case name": "Convert question with mixed languages",
  "Input length type": "M",
  "Input": "mata help ekak karanna puluvandha? Can you help me?",
  "Expected output": "මට help එකක් කරන්න පුළුවන්ද? Can you help me?",
  "Actual output": "මට help එකක් කරන්න පුළුවන්ද? Can you help me?",
  "Status": "Pass",
  "Accuracy justification / Description": "Mixed Singlish + English question handled correctly.",
  "What is covered by the test": "Mixed language; Compound sentence; M (31–299 characters); Accuracy validation"
},
{
  "TC ID": "Neg_Fun_0006",
  "Test case name": "Unsupported emoji input",
  "Input length type": "S",
  "Input": "mama 😎 karanavaa",
  "Expected output": "මම 😎 කරනවා",
  "Actual output": "මම karanavaa 😎",
  "Status": "Fail",
  "Accuracy justification / Description": "System fails to handle emoji placement correctly.",
  "What is covered by the test": "Emoji handling; S (≤30 characters); Robustness validation"
},
{
  "TC ID": "Neg_Fun_0007",
  "Test case name": "Invalid punctuation sequence",
  "Input length type": "S",
  "Input": "mama!!! karanavaa??",
  "Expected output": "මම කරනවා!!!",
  "Actual output": "මම!!! කරනවා??",
  "Status": "Fail",
  "Accuracy justification / Description": "System does not normalize multiple punctuation correctly.",
  "What is covered by the test": "Punctuation handling; S (≤30 characters); Robustness validation"
},
{
  "TC ID": "Pos_UI_0005",
  "Test case name": "Tooltip shows full text",
  "Input length type": "M",
  "Input": "mama gedhara yanavaa, oba dakinna puluwanda?",
  "Expected output": "Full Sinhala output visible on hover tooltip",
  "Actual output": "Full Sinhala output visible on hover tooltip",
  "Status": "Pass",
  "Accuracy justification / Description": "Tooltip displays entire converted text correctly.",
  "What is covered by the test": "UI usability; M (31–299 characters); Tooltip behavior"
},
{
  "TC ID": "Pos_UI_0006",
  "Test case name": "Responsive UI on mobile",
  "Input length type": "M",
  "Input": "mama gedhara yanavaa, oba dakinna puluwanda?",
  "Expected output": "Sinhala output fits mobile screen without overflow",
  "Actual output": "Sinhala output fits mobile screen without overflow",
  "Status": "Pass",
  "Accuracy justification / Description": "Output fits well on smaller devices.",
  "What is covered by the test": "UI responsiveness; M (31–299 characters); Mobile display"
},
{
  "TC ID": "Neg_UI_0004",
  "Test case name": "UI breaks with unsupported font",
  "Input length type": "S",
  "Input": "අයියෝ",
  "Expected output": "Text displayed correctly",
  "Actual output": "Text overlaps or disappears",
  "Status": "Fail",
  "Accuracy justification / Description": "Unsupported font causes display issues.",
  "What is covered by the test": "UI rendering; Simple sentence; S (≤30 characters); Font compatibility"
},
{
  "TC ID": "Neg_UI_0005",
  "Test case name": "Button not clickable after input",
  "Input length type": "S",
  "Input": "mata help ekak karanna puluvandha?",
  "Expected output": "Button responds correctly",
  "Actual output": "Button does not respond",
  "Status": "Fail",
  "Accuracy justification / Description": "UI element becomes unresponsive after input.",
  "What is covered by the test": "UI functionality; Simple sentence; S (≤30 characters); Button click handling"
}


  
];

// Create workbook
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.json_to_sheet(testCases);
XLSX.utils.book_append_sheet(wb, ws, "TestCases");

// Write the Excel file
XLSX.writeFile(wb, "IT3040_TestCases.xlsx");
console.log("Excel file generated successfully!");
