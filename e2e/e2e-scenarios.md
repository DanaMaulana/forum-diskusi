### **🔷 1. E2E Tests (End-to-End Testing)**

#### **📄 `e2e/create-thread.spec.ts`**
**Skenario pengujian alur pembuatan thread:**
- **Skenario 1**: Redirect ke login ketika tidak terotentikasi
  - Pengguna mengakses `/create-thread` tanpa login
  - Sistem mengarahkan ke halaman `/login`
- **Skenario 2**: Menampilkan form pembuatan thread ketika terotentikasi
  - Mock API untuk `v1/users/me` dengan data user valid
  - Set token di localStorage
  - Navigasi ke halaman create-thread berhasil

#### **📄 `e2e/registration.spec.ts`**
**Skenario pengujian alur registrasi:**
- **Skenario 1**: Menampilkan form registrasi dengan benar
  - Form memiliki input nama, email, password, dan tombol submit
- **Skenario 2**: Navigasi ke halaman login dari registrasi
  - Link "Login disini" mengarahkan ke `/login`
- **Skenario 3**: Validasi field yang wajib diisi
  - Submit form kosong memicu HTML5 validation

#### **📄 `e2e/login.spec.ts`**
**Skenario pengujian alur login:**
- **Skenario 1**: Menampilkan halaman login dengan benar
  - Form login memiliki input email, password, dan tombol submit
- **Skenario 2**: Validasi error untuk field kosong
  - HTML5 validation mencegah submit form kosong
- **Skenario 3**: Navigasi ke halaman register dari login
  - Link "Daftar disini" mengarahkan ke `/register`
- **Skenario 4**: Menampilkan elemen form login
  - Label dan placeholder sesuai untuk input email dan password
- **Skenario 5**: Menangani percobaan login dengan mock credentials
  - Mock API dengan delay untuk menangkap loading state
  - Menampilkan tombol "Logging in..." saat proses login
