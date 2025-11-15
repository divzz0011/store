let cart = [];
let phone = "62800000000"; // ganti ke nomor WA asli

function addToCart(name, price) {
  let item = cart.find(x => x.name === name);
  if (item) item.qty++;
  else cart.push({ name, price, qty: 1 });

  updateCart();
}

function updateCart() {
  document.getElementById("cartCount").innerText =
    cart.reduce((total, item) => total + item.qty, 0);
}

function toggleCart() {
  const modal = document.getElementById("cartModal");
  modal.classList.toggle("active");
  renderCart();
}

function renderCart() {
  const list = document.getElementById("cartItems");
  let total = 0;
  list.innerHTML = "";

  cart.forEach(item => {
    total += item.price * item.qty;
    list.innerHTML += `
      <li>
        ${item.name} x${item.qty} (Rp ${item.price})
        <button style="background:none;border:none;color:#e63946;font-weight:bold" onclick="removeItem('${item.name}')">hapus</button>
      </li>`;
  });

  document.getElementById("totalPrice").innerText = total;
}

function removeItem(name) {
  cart = cart.filter(x => x.name !== name);
  updateCart();
  renderCart();
}









function checkout() {
    if (cart.length < 1) return alert("Keranjang masih kosong!");
    
    let name = document.getElementById("buyerName").value;
    let payment = document.getElementById("paymentMethod").value;
    let note = document.getElementById("buyerNote").value; // <-- catatan baru
    
    if (!name || !payment) {
      return alert("Harap isi nama dan pilih metode pembayaran!");
    }
    
    let text = `Halo, nama saya *${name}* ingin memesan:%0A%0A`;
    cart.forEach(item => {
      text += `- ${item.name} x${item.qty} (Rp ${item.price})%0A`;
    });
    
    let total = cart.reduce((a,b) => a + (b.price * b.qty), 0);
    
    text += `%0ATotal: Rp ${total}`;
    text += `%0AMetode Pembayaran: *${payment}*`;
    
    // Tambahkan catatan jika diisi
    if (note.trim() !== "") {
      text += `%0A%0ACatatan: ${note}`;
    }
    
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  }
  






  