# 🚀 Thiết lập Backend Google Sheets (Miễn phí)

Hướng dẫn này giúp bạn tạo một "Server" miễn phí bằng Google Sheets để thu thập dữ liệu feedback từ ncsStat.

## Bước 1: Tạo Google Sheet
1.  Truy cập [Google Sheets](https://sheets.new) và tạo một trang tính mới.
2.  Đặt tên file là `ncsStat_Database`.
3.  Đổi tên **Sheet1** (phía dưới cùng) thành `FeedbackData`.
4.  Điền hàng đầu tiên (Header) như sau:
    *   **A1**: `timestamp`
    *   **B1**: `userId`
    *   **C1**: `type` (demographics/ai_feedback/applicability)
    *   **D1**: `data` (Lưu toàn bộ nội dung JSON)

## Bước 2: Tạo Apps Script
1.  Tại Google Sheet, chọn menu **Extensions (Tiện ích mở rộng)** -> **Apps Script**.
2.  Xóa hết code cũ trong file `Code.gs` và dán đoạn code sau vào:

```javascript
/*
  ncsStat Feedback Server
  - Receives JSON POST data from ncsStat app
  - Saves to Google Sheet
*/

function doPost(e) {
  try {
    // 1. Parse Data
    var postData = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("FeedbackData");
    
    // 2. Prepare Row
    // Format: [Timestamp, UserID, Type, JSON_String]
    var timestamp = new Date();
    var userId = postData.userId || "anonymous";
    var type = determineType(postData);
    var jsonString = JSON.stringify(postData);
    
    // 3. Append to Sheet
    sheet.appendRow([timestamp, userId, type, jsonString]);
    
    // 4. Return Success JSON
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "success", 
      "message": "Data saved successfully" 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return Error
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "error", 
      "message": error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Helper to guess feedback type based on keys
function determineType(data) {
  if (data.education && data.role) return "demographics";
  if (data.accuracy && data.formatting) return "ai_feedback";
  if (data.manuscriptUtility) return "applicability";
  return "unknown";
}
```

## Bước 3: Deploy (Quan trọng)
Thực hiện chính xác các bước sau để API hoạt động công khai:

1.  Nhấn nút **Deploy (Triển khai)** (màu xanh góc trên phải) -> chọn **New deployment (Tùy chọn triển khai mới)**.
2.  Bấm vào biểu tượng bánh răng settings -> chọn **Web app**.
3.  Điền thông tin:
    *   **Description**: `ncsStat API v1`
    *   **Execute as**: `Me (email của bạn)`
    *   **Who has access**: Chọn **Anyone (Mọi người)** <= **Rất quan trọng!**
4.  Nhấn **Deploy**.
5.  Google sẽ yêu cầu cấp quyền (Authorize access), hãy đồng ý tất cả.
6.  Copy dòng **Web app URL** (có dạng `https://script.google.com/macros/s/.../exec`).

## Bước 4: Kết nối với ncsStat
1.  Mở ncsStat App.
2.  Truy cập trang Admin: `.../admin` (hoặc localhost:3000/admin).
3.  Nhập mật khẩu mặc định: `admin`.
4.  Dán URL vừa copy vào ô **"Google Apps Script URL"**.
5.  Lưu lại. Xong!

---
*Lưu ý: Dữ liệu của người dùng sẽ đi thẳng từ trình duyệt của họ đến Google Sheet của bạn. Không qua server trung gian nào khác.*
