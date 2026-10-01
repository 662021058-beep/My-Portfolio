function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
      .setTitle('Financial System | ANP')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getSavedSets() {
  const defaultSets = ["Ricknew1", "Ricknew2", "Ricknew3"];
  const saved = PropertiesService.getScriptProperties().getProperty('ROV_SETS');
  return saved ? JSON.parse(saved) : defaultSets;
}

function saveNewSet(name) {
  let sets = getSavedSets();
  if (!sets.includes(name)) {
    sets.push(name);
    PropertiesService.getScriptProperties().setProperty('ROV_SETS', JSON.stringify(sets));
  }
  return sets;
}

// ฟังก์ชันสำหรับบันทึก Log กิจกรรม
function addActivityLog(title, type, amount = 0) {
  const logs = JSON.parse(PropertiesService.getScriptProperties().getProperty('ACTIVITY_LOGS') || "[]");
  logs.unshift({
    date: Utilities.formatDate(new Date(), "GMT+7", "dd/MM HH:mm"),
    timestamp: new Date().getTime(),
    title: title,
    type: type, 
    amount: amount
  });
  PropertiesService.getScriptProperties().setProperty('ACTIVITY_LOGS', JSON.stringify(logs.slice(0, 20)));
}

/**
 * ดึงข้อมูลสรุปทั้งหมดเพื่อแสดงผลบน Dashboard
 */
function getAllSummary(filterObj) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const now = new Date();
  
  let rovWithdrawed = 0, rovCost = 0, rovPending = 0, totalIDs = 0, rovProfitTotal = 0;
  let finIncome = 0, finExpense = 0;

  // --- 1. ข้อมูลจากชีท Summary (งาน ROV) ---
  const summarySheet = ss.getSheetByName("Summary");
  if (summarySheet) {
    const data = summarySheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      let date = new Date(data[i][0]);
      if (!isDateMatch(date, filterObj, now)) continue;

      let amount = parseFloat(data[i][2]) || 0; 
      let cost = parseFloat(data[i][3]) || 0;   
      let profit = parseFloat(data[i][4]) || 0; 
      let status = data[i][5];                  
      let count = parseInt(data[i][6]) || 0;    

      totalIDs += count;
      rovCost += cost;

      if (status === "จ่ายแล้ว") {
        rovWithdrawed += amount; 
        rovProfitTotal += profit; 
      } else {
        rovPending += amount; 
      }
    }
  }

  // --- 2. ข้อมูลจากชีท บัญชีสรุป (รายรับ-รายจ่ายทั่วไป) ---
  const finSheet = ss.getSheetByName("บัญชีสรุป");
  if (finSheet) {
    const data = finSheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      let date = new Date(data[i][0]);
      if (!isDateMatch(date, filterObj, now)) continue;

      let type = data[i][3]; 
      let amount = parseFloat(data[i][4]) || 0;

      if (type === "รายรับ") finIncome += amount;
      else if (type === "รายจ่าย") finExpense += amount;
    }
  }

  const activityLogs = JSON.parse(PropertiesService.getScriptProperties().getProperty('ACTIVITY_LOGS') || "[]");

  return {
    // แก้ไข: ยอดเงินคงเหลือสุทธิ = ยอดเบิก ROV ที่จ่ายแล้ว + ยอดเบิก ROV ที่ยังค้างเบิก
    netBalance: (rovWithdrawed + rovPending), 
    rov: { profit: rovProfitTotal, cost: rovCost, pending: rovPending, count: totalIDs },
    genIncome: finIncome,
    genExpense: finExpense,
    recent: activityLogs.slice(0, 5)
  };
}

function isDateMatch(dateValue, filter) {
  if (!dateValue) return false;
  let d = new Date(dateValue);
  let now = new Date();
  d.setHours(0,0,0,0);
  now.setHours(0,0,0,0);

  if (filter.mode === 'วันนี้') {
    return d.getTime() === now.getTime();
  } else if (filter.mode === 'เดือนนี้') {
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  } else if (filter.mode === 'ปีนี้') {
    return d.getFullYear() === now.getFullYear();
  } else if (filter.mode === 'กำหนดเอง') { // <--- เช็กตัวสะกดตรงนี้ "ก" หรือ "กำ"
    let start = new Date(filter.start);
    let end = new Date(filter.end);
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);
    return d >= start && d <= end;
  }
  return true; // ทั้งหมด
}

/**
 * บันทึกรายการรายรับ-รายจ่าย (แบบใหม่มีหมวดหมู่)
 */
function saveTransaction(type, category, amount, note) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("บัญชีสรุป") || ss.insertSheet("บัญชีสรุป");
    
    // บันทึก: วันที่ | หมวดหมู่ | รายละเอียด | ประเภท | จำนวนเงิน
    sheet.appendRow([
      new Date(), 
      category,    
      note || "-", 
      type,        
      parseFloat(amount)
    ]);
    
    const logDetail = note ? `${category} (${note})` : category;
    addActivityLog(logDetail, type === 'รายรับ' ? 'income' : 'expense', amount);
    
    return "บันทึกสำเร็จ";
  } catch (e) {
    return "เกิดข้อผิดพลาด: " + e.toString();
  }
}

// --- ฟังก์ชันอื่นๆ ของระบบ ROV (คงเดิม) ---

function saveRovBulk(sheetName, dataRows, actualWithdraw, totalTier, totalDiscount) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(["วันที่", "ID/รายการ", "จำนวนสกิน", "ประเภท", "ยอดสุทธิ", "ต้นทุน (0.3)", "กำไรสุทธิ", "รายละเอียด/ส่วนลด"]);
    sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#f3f4f6");
  }

  const now = new Date();
  let totalSkins = 0;
  const idCount = dataRows.length; 

  dataRows.forEach(r => {
    const skins = parseInt(r.skins) || 0;
    totalSkins += skins;
    sheet.appendRow([now, r.id, skins, "ตัดรูป Rov", parseFloat(r.final), "", "", `ราคาเต็ม ${r.tier} (ลด ${r.discount}%)`]);
  });

  const totalCost = totalSkins * 0.3;
  const withdrawAmount = parseFloat(actualWithdraw) || 0;
  const netProfit = withdrawAmount - totalCost;

  sheet.appendRow([now, `--- สรุปชุดงาน (${idCount} ID) ---`, totalSkins, "ยอดเบิกจริง:", withdrawAmount, totalCost, netProfit, `รวม: ${idCount} ID`]);

  let summarySheet = ss.getSheetByName("Summary") || ss.insertSheet("Summary");
  if (summarySheet.getLastRow() === 0) {
    summarySheet.appendRow(["วันที่", "ชื่อชุดงาน", "ยอดเบิก", "ต้นทุน", "กำไร", "สถานะ", "จำนวน ID"]);
  }
  
  summarySheet.appendRow([now, sheetName, withdrawAmount, totalCost, netProfit, "ค้างเบิก", idCount]);
  addActivityLog(`สร้างชุดงาน: ${sheetName}`, 'create', withdrawAmount);
  return `บันทึกสำเร็จ! รวมทั้งหมด ${idCount} ID`;
}

function getRovHistory(filterObj) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const summarySheet = ss.getSheetByName("Summary");
  if (!summarySheet) return [];
  
  const data = summarySheet.getDataRange().getValues();
  const history = [];
  const now = new Date();

  for (let i = 1; i < data.length; i++) {
    if (!data[i][0]) continue;
    let dateVal = new Date(data[i][0]);

    // เพิ่ม: ตรวจสอบตัวกรองวันที่
    if (filterObj && !isDateMatch(dateVal, filterObj, now)) continue;

    history.push({
      date: Utilities.formatDate(dateVal, "GMT+7", "dd/MM/yyyy"),
      sheet: data[i][1], 
      amount: data[i][2] || 0, 
      cost: data[i][3] || 0,   // ส่งต้นทุนไปด้วย
      profit: data[i][4] || 0, 
      type: data[i][5] || "ค้างเบิก", 
      count: data[i][6] || 0, 
      row: i + 1
    });
  }
  return history.reverse();
}

// เปลี่ยนจาก markAsPaid เป็น updateRovStatus
function updateRovStatus(sheetName, rowIdx) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const summarySheet = ss.getSheetByName("Summary");
  if (summarySheet) {
    summarySheet.getRange(rowIdx, 6).setValue("จ่ายแล้ว").setFontColor("#10b981");
    const amount = summarySheet.getRange(rowIdx, 3).getValue();
    addActivityLog(`รับเงินจาก: ${sheetName}`, 'paid', amount);
  }
  return "รับเงินเรียบร้อย";
}

// เปลี่ยนจาก deleteRow เป็น deleteRovRow
function deleteRovRow(sheetName, rowIdx) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const summarySheet = ss.getSheetByName("Summary");
  if (summarySheet) summarySheet.deleteRow(rowIdx);
  return "ลบสำเร็จ";
}

// --- ฟังก์ชันระบบบัญชีใหม่ ---

function getFinanceHistory(filterObj) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("บัญชีสรุป");
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getValues();
  const history = [];
  const now = new Date();
  
  // ปรับ i >= 1 เพื่อข้ามหัวตาราง
  for (let i = data.length - 1; i >= 1; i--) { 
    if (!data[i][0]) continue; 
    let dateValue = new Date(data[i][0]);
    
    if (filterObj && !isDateMatch(dateValue, filterObj, now)) continue;

    history.push({
      row: i + 1,
      date: Utilities.formatDate(new Date(data[i][0]), "GMT+7", "dd/MM/yyyy HH:mm"),
      category: data[i][1] ? data[i][1].toString() : "", 
      note: data[i][2] ? data[i][2].toString() : "",     
      type: data[i][3] ? data[i][3].toString() : "",     
      amount: parseFloat(data[i][4] || 0) 
    });
  }
  return history;
}

function deleteFinanceRow(row) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("บัญชีสรุป");
    sheet.deleteRow(row);
    return "ลบเรียบร้อย";
}

// ส่วนของ getJobDetails (คงเดิม)
function getJobDetails(sheetName, rowIdx) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(sheetName.trim());
    const summarySheet = ss.getSheetByName("Summary");
    if (!sheet || !summarySheet) throw new Error("ไม่พบแผ่นงาน");

    const summaryRow = summarySheet.getRange(rowIdx, 1, 1, 7).getValues()[0];
    const withdrawAmount = parseFloat(summaryRow[2]) || 0;
    const dateVal = summaryRow[0];
    const targetCount = parseInt(summaryRow[6]) || 0;

    const data = sheet.getDataRange().getValues();
    let allDetails = [];
    let totalTier = 0;

    let endRowIdx = -1;
    for (let i = data.length - 1; i >= 0; i--) {
      let colB = data[i][1] ? data[i][1].toString() : "";
      let colE = parseFloat(data[i][4]) || 0; 
      if (colB.includes("สรุป") && Math.abs(colE - withdrawAmount) < 0.1) {
        endRowIdx = i;
        break;
      }
    }
    if (endRowIdx === -1) endRowIdx = data.length;

    let foundCount = 0;
    for (let i = endRowIdx - 1; i >= 0; i--) {
      if (foundCount >= targetCount) break;
      const id = data[i][1] ? data[i][1].toString().trim() : "";
      if (id !== "" && !id.includes("สรุป") && !id.includes("วันที่")) {
        let final = parseFloat(data[i][4]) || 0;
        let note = data[i][7] || "";
        let tierMatch = note.match(/ราคาเต็ม\s(\d+)/);
        let tier = tierMatch ? parseFloat(tierMatch[1]) : final;
        allDetails.unshift({ id: id, skins: data[i][2], tier: tier, final: final });
        totalTier += tier;
        foundCount++;
      }
    }

    const chunkSize = 25;
    let pages = [];
    for (let i = 0; i < allDetails.length; i += chunkSize) {
      pages.push(allDetails.slice(i, i + chunkSize));
    }
    if (pages.length === 0) pages.push([]);

    return {
      date: Utilities.formatDate(dateVal instanceof Date ? dateVal : new Date(), "GMT+7", "dd/MM/yyyy"),
      sheet: sheetName,
      pages: pages,
      totalTier: totalTier,
      totalDiscount: totalTier - withdrawAmount,
      withdrawAmount: withdrawAmount
    };
  } catch (e) { return { error: e.message }; }
}

// ฟังก์ชันสำหรับล้างข้อมูลความเคลื่อนไหวล่าสุด
function clearActivityLogs() {
  const props = PropertiesService.getScriptProperties();
  // ลบข้อมูลที่ชื่อ ACTIVITY_LOGS ออก
  props.deleteProperty('ACTIVITY_LOGS');
  return "ล้างข้อมูลเรียบร้อยแล้ว";
}