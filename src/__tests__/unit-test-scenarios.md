### **🔷 2. Component Tests (Unit Testing Komponen React)**

#### **📄 `src/__tests__/components/HeroSection.test.tsx`**
**Skenario pengujian komponen HeroSection:**
- **Skenario 1**: Render title dan description
  - Menampilkan "Dicoding Forum" dan deskripsi yang sesuai
- **Skenario 2**: Menampilkan tombol create thread ketika user login
  - Tombol "Buat Thread Baru" terlihat dan mengarah ke `/create-thread`
- **Skenario 3**: Menyembunyikan tombol create thread ketika user tidak login
  - Tombol "Buat Thread Baru" tidak terlihat
- **Skenario 4**: Styling CSS yang benar
  - Title memiliki class gradient yang sesuai

#### **📄 `src/__tests__/components/SearchFilters.test.tsx`**
**Skenario pengujian komponen SearchFilters:**
- **Skenario 1**: Render input search dan category select
  - Input placeholder "Cari thread atau topik..." dan combobox tersedia
- **Skenario 2**: Memanggil setSearchTerm ketika mengetik
  - Event change pada input memicu callback dengan nilai yang benar
- **Skenario 3**: Menampilkan term pencarian saat ini
  - Input menampilkan nilai searchTerm yang diberikan
- **Skenario 4**: Render category select dengan benar
  - Select trigger terlihat dan berfungsi
- **Skenario 5**: Menangani array categories kosong
  - Komponen tetap render meski categories kosong

#### **📄 `src/__tests__/components/ThreadsList.test.tsx`**
**Skenario pengujian komponen ThreadsList:**
- **Skenario 1**: Render threads ketika disediakan
  - Menampilkan daftar thread dan jumlah thread yang ditemukan
- **Skenario 2**: Menampilkan empty state ketika tidak ada threads
  - Pesan "Tidak ada thread yang ditemukan" dan "0 thread ditemukan"
- **Skenario 3**: Menampilkan title yang benar untuk semua threads
  - Title "Semua Thread" untuk kategori "all"
- **Skenario 4**: Menampilkan title yang benar untuk kategori spesifik
  - Title "Thread #javascript" untuk kategori "javascript"
- **Skenario 5**: Render jumlah thread cards yang benar
  - Jumlah thread card sesuai dengan data yang diberikan

#### **📄 `src/__tests__/components/Navbar.test.tsx`**
**Skenario pengujian komponen Navbar:**
- **Skenario 1**: Render dengan benar ketika user tidak login
  - Link Home, Leaderboard, Login, Register tersedia
- **Skenario 2**: Render dengan benar ketika user login
  - Menampilkan nama user, menyembunyikan Login/Register
- **Skenario 3**: Memanggil onLogout ketika tombol logout diklik
  - Callback onLogout terpanggil saat klik tombol logout
- **Skenario 4**: Link navigasi yang benar
  - Semua link memiliki href yang sesuai
- **Skenario 5**: Menampilkan link profil user ketika login
  - Link profil user mengarah ke `/profile`

#### **📄 `src/__tests__/components/ThreadCard.test.tsx`**
**Skenario pengujian komponen ThreadCard:**
- **Skenario 1**: Render informasi thread dengan benar
  - Title, username, category, upvotes, dan comments count ditampilkan
- **Skenario 2**: Memotong teks body yang panjang
  - Body teks panjang dipotong dengan ellipsis
- **Skenario 3**: Link navigasi yang benar
  - Link title dan "Read more" mengarah ke `/thread/id`
- **Skenario 4**: Menampilkan fallback avatar ketika tidak ada avatar
  - Icon User sebagai fallback avatar
- **Skenario 5**: Format tanggal pembuatan dengan benar
  - Menampilkan waktu relatif dengan "ago"

---

### **🔷 3. Redux Slice Tests (Unit Testing State Management)**

#### **📄 `src/__tests__/reducers/authSlice.test.ts`**
**Skenario pengujian authSlice reducer:**
- **Skenario 1**: Handle logout action
  - State user menjadi null, error dihapus
- **Skenario 2**: Handle clearError action
  - Error state menjadi null
- **Skenario 3**: Handle loginUser pending
  - Loading true, error null
- **Skenario 4**: Handle loginUser fulfilled
  - Loading false, user diset, error null
- **Skenario 5**: Handle registerUser rejected
  - Loading false, error diset dengan pesan error

#### **📄 `src/__tests__/reducers/threadsSlice.test.ts`**
**Skenario pengujian threadsSlice reducer:**
- **Skenario 1**: Handle clearCurrentThread action
  - currentThread menjadi null
- **Skenario 2**: Handle fetchThreads pending
  - Loading true, error null
- **Skenario 3**: Handle fetchThreads fulfilled
  - Loading false, threads diupdate dengan data baru
- **Skenario 4**: Handle fetchThreads rejected
  - Loading false, error diset dengan pesan error
- **Skenario 5**: Handle createNewThread fulfilled
  - Thread baru ditambahkan ke array threads

#### **📄 `src/__tests__/reducers/usersSlice.test.ts`**
**Skenario pengujian usersSlice reducer:**
- **Skenario 1**: Handle fetchUsers pending
  - Loading true, error null
- **Skenario 2**: Handle fetchUsers fulfilled
  - Loading false, users diupdate dengan data baru
- **Skenario 3**: Handle fetchUsers rejected
  - Loading false, error diset dengan pesan error

#### **📄 `src/__tests__/reducers/leaderboardSlice.test.ts`**
**Skenario pengujian leaderboardSlice reducer:**
- **Skenario 1**: Handle fetchLeaderboards pending
  - Loading true, error null
- **Skenario 2**: Handle fetchLeaderboards fulfilled
  - Loading false, leaderboards diupdate dengan data baru
- **Skenario 3**: Handle fetchLeaderboards rejected
  - Loading false, error diset dengan pesan error

---

### **🔷 4. Redux Thunk Tests (Integration Testing Async Actions)**

#### **📄 `src/__tests__/thunks/authThunks.test.ts`**
**Skenario pengujian auth thunks:**
- **Skenario 1**: Login user berhasil
  - Mock API login dan getOwnProfile, verifikasi payload dan API calls
- **Skenario 2**: Handle login error
  - Mock API error, verifikasi error handling
- **Skenario 3**: Register user berhasil
  - Mock API register, verifikasi API call dengan parameter yang benar
- **Skenario 4**: Get current user berhasil
  - Mock API getOwnProfile, verifikasi user data

#### **📄 `src/__tests__/thunks/threadsThunks.test.ts`**
**Skenario pengujian threads thunks:**
- **Skenario 1**: Fetch threads berhasil
  - Mock API getThreads, verifikasi data threads
- **Skenario 2**: Handle fetchThreads error
  - Mock API error, verifikasi error handling
- **Skenario 3**: Fetch thread detail berhasil
  - Mock API getThreadDetail dengan ID, verifikasi thread data
- **Skenario 4**: Create new thread berhasil
  - Mock API createThread, verifikasi thread creation dengan parameter
- **Skenario 5-7**: Vote thread (upvote, downvote, neutralize)
  - Mock API calls untuk berbagai jenis voting, verifikasi API calls

#### **📄 `src/__tests__/thunks/usersThunks.test.ts`**
**Skenario pengujian users thunks:**
- **Skenario 1**: Fetch users berhasil
  - Mock API getUsers, verifikasi data users
- **Skenario 2**: Handle fetchUsers error
  - Mock API error, verifikasi error handling

#### **📄 `src/__tests__/thunks/leaderboardThunks.test.ts`**
**Skenario pengujian leaderboard thunks:**
- **Skenario 1**: Fetch leaderboards berhasil
  - Mock API getLeaderboards, verifikasi data leaderboards
- **Skenario 2**: Handle fetchLeaderboards error
  - Mock API error, verifikasi error handling