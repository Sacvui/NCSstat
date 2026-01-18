# ncsStat: Nền tảng Phân tích Thống kê Trực tuyến

**"Democratizing Data Science for Vietnamese Researchers"**

[https://ncsstat.vercel.app](https://ncsstat.vercel.app)

---

## 📄 Giới Thiệu

**ncsStat** là một nền tảng phân tích thống kê mã nguồn mở, chạy trực tiếp trên trình duyệt web, được thiết kế đặc biệt cho Nghiên cứu sinh và Giảng viên tại Việt Nam.

Dự án sử dụng công nghệ **WebR (WebAssembly)** để chạy ngôn ngữ R ngay trên trình duyệt người dùng, đảm bảo:
- 🔒 **Bảo mật tuyệt đối:** Dữ liệu không bao giờ rời khỏi máy tính của bạn.
- ⚡ **Tốc độ cao:** Không có độ trễ mạng khi xử lý.
- 💸 **Miễn phí:** Không cần bản quyền đắt đỏ như SPSS/AMOS.
- 🧠 **AI hỗ trợ:** Tự động giải thích kết quả bằng tiếng Việt.

---

## 🚀 Tính Năng Chính

### 1. Phân Tích Đa Dạng
Hỗ trợ đầy đủ các phương pháp cho nghiên cứu Khoa học Xã hội:
- **Độ tin cậy:** Cronbach's Alpha (với gợi ý loại bỏ biến)
- **Khám phá:** Exploratory Factor Analysis (EFA), PCA
- **Khẳng định:** Confirmatory Factor Analysis (CFA), SEM
- **So sánh:** T-test, ANOVA, Mann-Whitney U, Chi-Square
- **Dự báo:** Hồi quy tuyến tính, Tương quan

### 2. Workflow Mode (Mới) 🎯
Chế độ hướng dẫn từng bước thông minh:
- Tự động gợi ý chuyển từ Cronbach's Alpha → EFA khi dữ liệu đạt chuẩn.
- Gợi ý từ EFA → CFA khi cấu trúc nhân tố rõ ràng.
- Gợi ý từ CFA → SEM khi mô hình phù hợp (Fit Indices tốt).

### 3. AI Interpretation 🤖
- Tự động viết nhận xét, đánh giá kết quả bằng ngôn ngữ tự nhiên.
- Giải thích các chỉ số phức tạp (CFI, RMSEA, P-value) cho người không chuyên.

---

## 📚 Hướng Dẫn Trích Dẫn (Citation)

Khi sử dụng **ncsStat** cho luận văn, luận án hoặc bài báo khoa học, vui lòng trích dẫn như sau để đảm bảo tính học thuật:

### Trong phần Phương pháp nghiên cứu:
> "Dữ liệu được phân tích bằng ngôn ngữ lập trình R (R Core Team, 2023) thông qua nền tảng **ncsStat** (Nguyen, 2026). Các phân tích độ tin cậy và nhân tố được thực hiện bằng các package `psych` (Revelle, 2023) và `lavaan` (Rosseel, 2012)."

### Trong Danh mục Tài liệu tham khảo:
**Tiếng Việt:**
> Nguyễn Văn A (2026). *ncsStat: Nền tảng phân tích thống kê trực tuyến cho nghiên cứu sinh Việt Nam*. Truy cập tại https://ncsstat.vercel.app

**English:**
> Nguyen, V. A. (2026). *ncsStat: A Web-Based Statistical Analysis Platform for Psychometric Analysis*. Available at https://ncsstat.vercel.app

---

## 🛠️ Công Nghệ

- **Frontend:** Next.js 14, React, TypeScript, Tailwind CSS
- **Statistical Engine:** WebR (WebAssembly R)
- **R Packages:** `psych`, `lavaan`, `stats`, `base`
- **AI:** Google Gemini API

---

## 📦 Cài Đặt (Local Development)

Nếu bạn muốn chạy source code trên máy cá nhân:

```bash
# 1. Clone repo
git clone https://github.com/your-username/statviet.git

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev
```

Truy cập `http://localhost:3000` để bắt đầu.

---

## 📝 License

Dự án được phát hành dưới giấy phép MIT License.
Copyright © 2026 ncsStat Team.
