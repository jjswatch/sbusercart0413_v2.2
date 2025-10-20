
let isLoggedIn = false;
let cart = [];
let myproducts = [];
let filteredProducts = null;  // null 表示沒有啟用搜尋
let priceSortOrder = 'default'; // asc, desc, default
// 分頁相關變數
let currentPage = 1;
const pageSize = 8; // 每頁顯示幾個產品
// 送出訂單
function submitOrder() {
	if (!isLoggedIn) {
		alert("請先登入！");
		return;
	}

	//const username = $('#username').val();
	const username = sessionStorage.getItem("username");
	if (!username) {
		alert("使用者資訊錯誤，請重新登入");
		return;
	}
	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const order = {
		username: username,
		totalPrice: total,
		status: "未付款",
		items: cart.map(p => ({
			pid: p.id,
			productTitle: p.title,
			productPrice: p.price,
			quantity: p.quantity
		}))
	};
	console.log("orders list :" + JSON.stringify(order));

	$.ajax({
		url: "http://localhost:8080/api/orders",
		type: "POST",
		contentType: "application/json",
		headers: {
			"Authorization": "Bearer " + localStorage.getItem("token")
		},
		data: JSON.stringify(order),
		success: function(data) {
			alert("訂單已送出！");
			cart = [];
			updateCart();
		}
	});
}
// 購物車
function updateCart() {
	$('#cartItems').empty();
	let total = 0;

	if (cart.length === 0) {
		$('#cartItems').append('<li class="list-group-item bg-transparent text-light text-center">🛒 購物車是空的</li>');
	} else {
		cart.forEach((item, index) => {
			total += item.price * item.quantity;
			$('#cartItems').append(`
        <li class="list-group-item d-flex justify-content-between align-items-center cart-item-glass">
          <span>
            <strong>${item.title}</strong><br>
            <small class="text-info">${item.price} 元 × ${item.quantity}</small>
          </span>
          <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">
            <i class="fa fa-trash"></i> 捨棄
          </button>
        </li>
      `);
		});
	}
	$('#totalPrice').text(total);
}

// 刪除購物車商品
function removeFromCart(index) {
	if (confirm("確定要將此商品從購物車中移除嗎？")) {
		cart.splice(index, 1); // 從購物車陣列中移除指定 index 的項目
		updateCart();
	}
}

function start() {
	isLoggedIn = false;
	$('#nav-logout').hide(); // 隱藏登出按鈕
	$.ajax({
		url: "http://localhost:8080/api/user/checkLogin",
		type: "GET",
		headers: {
			"Authorization": "Bearer " + localStorage.getItem("token")
		},
		success: function(isValid) {
			if (isValid === true) {
				isLoggedIn = true;
				const username = sessionStorage.getItem("username");
				$('#loginStatus').text(`歡迎，${username}`);
				$('#nav-logout').show();
				$('#content > div').removeClass('active');
				$('#products').addClass('active');
				loadProducts();
			} else {
				isLoggedIn = false;
				$('#loginStatus').text('未登入');
				$('#content > div').removeClass('active');
				$('#login').addClass('active');
			}
		},
		error: function() {
			isLoggedIn = false;
			$('#loginStatus').text('未登入');
			$('#content > div').removeClass('active');
			$('#login').addClass('active');
		}
	});

	$('#nav-logout').click(function(e) {
		e.preventDefault();
		logout();
	});

	$('#searchInput').on('input', filterAndSortProducts);
	$('#brandFilter').on('change', filterAndSortProducts);
	$('#priceSort').on('change', filterAndSortProducts);

	$('.nav-link').click(function(e) {
		e.preventDefault();
		let target = $(this).data('target');
		// 訂單及購物車需登入才能查看
		if ((target === 'cart' || target === 'orders') && !isLoggedIn) {
			alert('請先登入才能查看此頁面');
			$('#content > div').removeClass('active');
			$('#login').addClass('active');
			return;
		}
		// 一般頁面切換
		$('#content > div').removeClass('active');
		$('#' + target).addClass('active');

		if (target === 'products') loadProducts();
		if (target === 'cart') updateCart();
		if (target === 'orders') showOrders();
	});

	$('#loginBtn').click(function(e) {
		e.preventDefault();
		const user = $('#username').val();
		const pass = $('#password').val();

		$.ajax({
			url: "http://localhost:8080/api/user/login",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify({ username: user, password: pass }),
			success: function(res) {
				localStorage.setItem("token", res.token);
				console.log("encoded data :" + res.token);
				isLoggedIn = true;
				$('#loginMessage').text('');
				$('#loginStatus').text(`歡迎，${user}`);
				sessionStorage.setItem("username", `${user}`);
				$('#nav-logout').show();   // 顯示登出選項
				alert("登入成功！");
				$('#content > div').removeClass('active'); // 隱藏所有內容區塊
				$('#products').addClass('active');         // 顯示產品區塊
				loadProducts();                            // 載入產品
			},
			error: function(xhr) {
				$('#loginMessage').text('帳號或密碼錯誤');
			}
		});

	});

	$('#backToList').click(function() {
		$('#content > div').removeClass('active');
		$('#products').addClass('active');
		renderProductPage();
		renderPagination();
	});

	function loadProducts() {
		console.log('開始載入產品...');
		$('#productList').empty();
		$.ajax({
			url: "http://localhost:8080/api/products",
			type: "GET",
			dataType: "json",
			success: function(products) {
				myproducts = products;

				// 根據品牌建立分類選單
				const brands = [...new Set(products.map(p => p.brand))]; // 取得唯一品牌
				$('#brandFilter').empty().append(`<option value="all">全部品牌</option>`);
				brands.forEach(brand => {
					$('#brandFilter').append(`<option value="${brand}">${brand}</option>`);
				});

				renderProductPage();      // 渲染當前頁面產品
				renderPagination();       // 渲染分頁按鈕
			},
			error: function(xhr) {
				$('#loginMessage').text('帳號或密碼錯誤');
			}
		});
	}
}

function setSortOrder(order) {
	priceSortOrder = order;
	filterAndSortProducts();
}

function filterAndSortProducts() {
	const keyword = $('#searchInput').val().toLowerCase().replace(/\s+/g, '');
	const selectedBrand = $('#brandFilter').val();

	// 篩選產品
	filteredProducts = myproducts.filter(p => {
		const titleNormalized = p.title.toLowerCase().replace(/\s+/g, '');
		const matchesKeyword = !keyword || titleNormalized.includes(keyword);
		const matchesBrand = selectedBrand === 'all' || p.brand === selectedBrand;
		return matchesKeyword && matchesBrand;
	});

	// 排序產品
	if (priceSortOrder === 'asc') {
		filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
	} else if (priceSortOrder === 'desc') {
		filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
	}

	currentPage = 1;  // 重置頁碼
	renderProductPage();
	renderPagination();
}

// 顯示當前頁面的產品
function renderProductPage() {
	$('#productList').empty();

	const sourceProducts = filteredProducts && filteredProducts.length ? filteredProducts : myproducts;
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const productsToShow = sourceProducts.slice(startIndex, endIndex);

	if (productsToShow.length === 0) {
		$('#productList').html('<p class="text-muted">查無商品</p>');
		return;
	}

	$.each(productsToShow, function(i, product) {
		const index = startIndex + i;
		$('#productList').append(`
            <div class="col-md-3">
                <div class="card mb-3">
                    <img src="${product.image}" class="card-img-top" width="160" height="200"/>
                    <div class="card-body">
                        <h4 class="product-detail-title mb-3">${product.title}</h4>
                        <p class="card-text">價格：${product.price} 元</p>
                        <p class="card-text">購買數量：<input type="number" id="qty" value="1" min="1" max="${product.stock}"></p>
						<button class="btn btn-neon flex-grow-1" onclick="addToCart(${product.id}, '#qty')">
						                    <i class="fa fa-cart-plus me-1"></i> 加入購物車
						                </button>
                        <button class="btn btn-primary btn-sm" onclick="viewProductDetail(${product.id})">查看商品</button>
                    </div>
                </div>
            </div>
        `);
	});
}

// 分頁按鈕
function renderPagination() {
	$('#pagination').empty();
	const sourceProducts = filteredProducts || myproducts;
	const totalPages = Math.ceil(sourceProducts.length / pageSize);

	// 上一頁
	$('#pagination').append(`
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">上一頁</a>
        </li>
    `);

	// 頁碼
	for (let i = 1; i <= totalPages; i++) {
		$('#pagination').append(`
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `);
	}

	// 下一頁
	$('#pagination').append(`
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">下一頁</a>
        </li>
    `);
}

// 切換頁碼
function changePage(page) {
	const sourceProducts = filteredProducts || myproducts;
	const totalPages = Math.ceil(sourceProducts.length / pageSize);
	if (page < 1 || page > totalPages) return;

	currentPage = page;
	renderProductPage();
	renderPagination();
}

// 單一商品明細頁
function viewProductDetail(productId) {
	$.ajax({
		url: `http://localhost:8080/api/products/${productId}`,
		type: "GET",
		dataType: "json",
		success: function(product) {
			// 切換畫面
			$('#content > div').removeClass('active');
			$('#productDetail').addClass('active');

			// 主商品資訊
			$('#productDetailContent').html(`
        <div class="row product-detail-glass p-4 mb-4">
          <div class="col-md-5 text-center mb-3 mb-md-0">
            <img src="${product.image}" class="img-fluid product-detail-image rounded shadow" alt="${product.title}">
          </div>
          <div class="col-md-7">
            <h2 class="product-detail-title mb-3">${product.title}</h2>
            <p class="mb-2">
              <strong class="text-info">價格：</strong> 
              <span class="fs-5">${product.price} 元</span>
            </p>
            <p class="mb-2">
              <strong class="text-info">庫存：</strong> 
              <span>${product.stock || '無'}</span>
            </p>
            <p class="mb-3">
              <strong class="text-info">描述：</strong>
              <span>${product.description || '暫無商品說明'}</span>
            </p>
            <div class="mb-3">
              <label for="detailQty" class="form-label">購買數量：</label>
              <input type="number" id="detailQty" value="1" min="1" max="${product.stock}" 
                     class="form-control d-inline-block text-center w-25">
            </div>
            <div class="d-flex flex-wrap gap-2">
              <button class="btn btn-neon flex-grow-1" onclick="addToCart(${product.id}, '#detailQty')">
                <i class="fa fa-cart-plus me-1"></i> 加入購物車
              </button>
            </div>
          </div>
        </div>

        <!-- 推薦商品區塊 -->
        <div class="mt-4">
          <h4 class="product-detail-recommend-title mb-3">
            <i class="fa fa-star text-info me-2"></i> 其他人也買了
          </h4>
          <div id="recommendList" class="row"></div>
        </div>
      `);
			// 載入推薦商品
			loadRecommendedProducts(productId);
		},
		error: function(xhr) {
			alert("無法取得商品資料，請稍後再試");
		}
	});
}

function loadRecommendedProducts(currentProductId) {
	// 從現有 myproducts 中挑出其他 4 個隨機商品
	let candidates = myproducts.filter(p => p.id !== currentProductId);
	candidates = shuffleArray(candidates).slice(0, 4);

	if (candidates.length === 0) {
		$('#recommendList').html('<p class="text-muted">暫無推薦商品</p>');
		return;
	}

	candidates.forEach((product, i) => {
		$('#recommendList').append(`
      <div class="col-md-3 col-sm-6 mb-3">
        <div class="product-card h-100 p-2">
          <img src="${product.image}" class="card-img-top" height="150" style="object-fit: cover;">
          <div class="card-body text-center">
            <h6 class="card-title text-truncate">${product.title}</h6>
            <p class="card-text text-info mb-2">${product.price} 元</p>
            <button class="btn btn-neon btn-sm w-100 mb-2" onclick="addToCart(${product.id}, '#fakeQty')">
              <i class="fa fa-cart-plus"></i> 加入購物車
            </button>
            <button class="btn btn-outline-light btn-sm w-100" onclick="viewProductDetail(${product.id})">
              查看商品
            </button>
            <input type="hidden" id="fakeQty" value="1">
          </div>
        </div>
      </div>
    `);
	});
}

// 工具函式：隨機打亂陣列
function shuffleArray(array) {
	let arr = [...array];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}
// 顯示訂單
function showOrders() {
	if (sessionStorage.getItem("username") == null) {
		alert('user not login');
		return;
	}
	$('#orderList').empty();
	$('#itemList').empty();
	$('#orderList').html(`
    <table class="table table-dark table-glass table-hover align-middle">
      <thead>
        <tr>
          <th>訂單編號</th>
          <th>用戶</th>
          <th>時間</th>
		  <th>狀態</th>  <!-- 新增狀態欄 -->
          <th>操作</th>
        </tr>
      </thead>
      <tbody id="orderTableBody"></tbody>
    </table>
  `);

	$.ajax({
		url: "http://localhost:8080/api/orders/" + sessionStorage.getItem("username"),
		type: "GET",
		dataType: "json",
		success: function(orders) {
			$.each(orders, function(i, order) {

				// 狀態欄內容
				const statusText = order.status;

				// 若狀態為「未付款」，顯示「結帳」按鈕
				let actionButtons = `
				                    <button class="btn btn-outline-info btn-sm" onclick="showItemDetails(${order.id})">
				                        <i class="fa fa-eye"></i> 商品明細
				                    </button>
				                `;

				if (statusText === "未付款") {
					actionButtons += `
				                        <button class="btn btn-success btn-sm ms-2" onclick="checkoutOrder(${order.id})">
				                            <i class="fa fa-credit-card"></i> 去結帳
				                        </button>
				                    `;
				}

				$('#orderTableBody').append(`
          <tr>
            <td>${order.id}</td>
            <td>${order.username}</td>
            <td>${order.orderTime}</td>
			<td>${statusText}</td>  <!-- 顯示狀態 -->
			<td>${actionButtons}</td>
          </tr>
        `);
			});
		},
		error: function() {
			$('#orderTableBody').append('<tr><td colspan="4" class="text-center text-muted">載入訂單失敗</td></tr>');
		}
	});
}

// 顯示訂單商品明細
function showItemDetails(orderid) {
	$('#itemList').empty();
	$('#itemList').append(`
	        <table class="table table-bordered table-striped">
	            <thead class="thead-dark">
	                <tr>
	                    <th>產品編號</th>
	                    <th>產品名稱</th>
	                    <th>產品價格</th>
	                    <th>數量</th>
	                </tr>
	            </thead>
	            <tbody id="itemTableBody">
	            </tbody>
	        </table>
	    `);
	$.ajax({
		url: "http://localhost:8080/api/items/" + orderid,
		type: "GET",
		dataType: "json",
		success: function(items) {
			$.each(items, function(i, item) {
				$('#itemTableBody').append(`
		                    <tr>
		                        <td>${item.pid}</td>
		                        <td style="white-space: normal;">${item.productTitle}</td>
		                        <td>${item.productPrice}</td>
		                        <td>${item.quantity}</td>
		                    </tr>
		                `);
			});
		},
		error: function(xhr) {
			$('#loginMessage').text('取得訂購商品失敗');
		}
	});
}

// 加入購物車
function addToCart(productId, qty) {
	// 判斷是否已登入
	if (!isLoggedIn) {
		alert('請先登入才能加入購物車');
		$('#content > div').removeClass('active');
		$('#login').addClass('active');
		return;
	}
	const quantity = parseInt($(qty).val());
	// 先從 myproducts 找,如果列表裡沒有，再打 API 拿
	let product = myproducts.find(p => p.id === productId);
	if (!product) {
		$.ajax({
			url: `http://localhost:8080/api/products/${productId}`,
			type: "GET",
			dataType: "json",
			success: function(p) {
				const product2 = { ...p, quantity: quantity };
				cart.push(product2);
				alert(`已將 ${product2.title} 加入購物車`);
				updateCart();
			},
			error: function() {
				alert("加入購物車失敗，無法取得商品資訊");
			}
		});
	} else {
		if (quantity > product.stock) {
			alert(`庫存不足！目前最多只能購買 ${product.stock} 件`);
			return;
		}
		const product2 = { ...product, quantity: quantity };
		cart.push(product2);
		alert(`已將 ${product2.title} 加入購物車`);
		updateCart();
	}
}

// 切換到結帳頁面
function checkoutOrder(orderId) {
	$('#content > div').removeClass('active');
	$('#checkout').addClass('active');

	// 暫存目前要結帳的訂單ID
	sessionStorage.setItem("checkoutOrderId", orderId);

	// 重置表單
	$('#paymentMethod').val('credit');
	$('#paymentResult').html('');
	$('#cardNumber, #cardHolder, #cardExpiry, #cardCVC').val('');
}

// 模擬付款確認
function confirmPayment() {
	if (!confirm("確定要結帳這筆訂單嗎？")) return;
	const orderId = sessionStorage.getItem("checkoutOrderId");
	const paymentMethod = $('#paymentMethod').val();

	if (!orderId) {
		alert("找不到訂單資訊，請返回訂單頁重新操作。");
		backToOrders();
		return;
	}

	$('#paymentResult').html(`<p class="text-warning">正在處理付款中...</p>`);

	// 模擬第三方支付 API 延遲
	setTimeout(() => {
		$('#paymentResult').html(`
            <div class="alert alert-success">
                ✅ 訂單編號 ${orderId} 付款成功！<br>
                付款方式：${paymentMethod.toUpperCase()}<br>
                感謝您的購買！
            </div>
        `);

		// 更新訂單狀態
		$.ajax({
			url: "http://localhost:8080/api/orders/checkout/" + orderId,
			type: "PUT",
			headers: {
				"Authorization": "Bearer " + localStorage.getItem("token")
			},
			success: function() {
				console.log("訂單狀態已更新為已結帳");
			},
			error: function() {
				console.warn("更新訂單狀態失敗，但模擬付款仍成功顯示");
			}
		});
	}, 2000); // 模擬2秒延遲
}

// 返回訂單頁
function backToOrders() {
	$('#content > div').removeClass('active');
	$('#orders').addClass('active');
	showOrders();
}

// 登出
function logout() {
	localStorage.removeItem("token");
	sessionStorage.removeItem("username");
	isLoggedIn = false;
	$('#loginStatus').text('未登入');
	$('#nav-logout').hide();
	$('#content > div').removeClass('active');
	$('#login').addClass('active');
	$('#username').val('');
	$('#password').val('');
}

$(document).ready(start);