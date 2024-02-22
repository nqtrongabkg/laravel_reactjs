<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderdetailController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductStoreController;
use App\Http\Controllers\ProductSaleController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ConfigController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('banner')->group(function () {
    Route::get('index', [BannerController::class, 'index']);
    Route::get('indextrash', [BannerController::class, 'indextrash']);
    Route::get('show/{id}', [BannerController::class, 'show']);
    Route::post('store', [BannerController::class, 'store']);
    Route::post('update/{id}', [BannerController::class, 'update']);
    Route::get('status/{id}', [BannerController::class, 'status']);
    Route::get('trash/{id}', [BannerController::class, 'trash']);
    Route::delete('destroy/{id}', [BannerController::class, 'destroy']);
});

Route::prefix('brand')->group(function () {
    Route::get('index', [BrandController::class, 'index']);
    Route::get('indextrash', [BrandController::class, 'indextrash']);
    Route::get('show/{id}', [BrandController::class, 'show']);
    Route::post('store', [BrandController::class, 'store']);
    Route::post('update/{id}', [BrandController::class, 'update']);
    Route::get('status/{id}', [BrandController::class, 'status']);
    Route::get('trash/{id}', [BrandController::class, 'trash']);
    Route::delete('destroy/{id}', [BrandController::class, 'destroy']);
});

Route::prefix('category')->group(function () {
    Route::get('index', [CategoryController::class, 'index']);
    Route::get('indextrash', [CategoryController::class, 'indextrash']);
    Route::get('show/{id}', [CategoryController::class, 'show']);
    Route::post('store', [CategoryController::class, 'store']);
    Route::post('update/{id}', [CategoryController::class, 'update']);
    Route::get('status/{id}', [CategoryController::class, 'status']);
    Route::get('trash/{id}', [CategoryController::class, 'trash']);
    Route::delete('destroy/{id}', [CategoryController::class, 'destroy']);
});

Route::prefix('contact')->group(function () {
    Route::get('index', [ContactController::class, 'index']);
    Route::get('indextrash', [ContactController::class, 'indextrash']);
    Route::get('show/{id}', [ContactController::class, 'show']);
    Route::post('store', [ContactController::class, 'store']);
    Route::post('replay', [ContactController::class, 'replay']);
    Route::post('update/{id}', [ContactController::class, 'update']);
    Route::get('status/{id}', [ContactController::class, 'status']);
    Route::get('trash/{id}', [ContactController::class, 'trash']);
    Route::delete('destroy/{id}', [ContactController::class, 'destroy']);
});

Route::prefix('menu')->group(function () {
    Route::get('index', [MenuController::class, 'index']);
    Route::get('indextrash', [MenuController::class, 'indextrash']);
    Route::get('show/{id}', [MenuController::class, 'show']);
    Route::post('store', [MenuController::class, 'store']);
    Route::post('update/{id}', [MenuController::class, 'update']);
    Route::delete('destroy/{id}', [MenuController::class, 'destroy']);
    Route::get('status/{id}', [MenuController::class, 'status']);
    Route::get('trash/{id}', [MenuController::class, 'trash']);
});

Route::prefix('order')->group(function () {
    Route::get('index', [OrderController::class, 'index']);
    Route::get('indextrash', [OrderController::class, 'indextrash']);
    Route::get('show/{id}', [OrderController::class, 'show']);
    Route::get('get/{id}', [OrderController::class, 'getByUserId']);
    Route::post('store', [OrderController::class, 'store']);
    Route::post('update/{id}', [OrderController::class, 'update']);
    Route::get('status/{id}', [OrderController::class, 'status']);
    Route::get('trash/{id}', [OrderController::class, 'trash']);
    Route::delete('destroy/{id}', [OrderController::class, 'destroy']);
    Route::post('addproduct', [OrderController::class, 'addProductToCart']);
    Route::post('createorder', [OrderController::class, 'createOrder']);
    Route::get('/cart', [OrderController::class, 'getCart']);
    Route::post('/createorder', [OrderController::class, 'createOrder']);
    
    Route::get('/getcartexport', [OrderController::class, 'getCartExport']);
    Route::post('createorderexport', [OrderController::class, 'createOrderExport']);
    Route::get('/changestatusorderexport', [OrderController::class, 'ChangeStatusOrderExport']);
    Route::post('/addproducttocartexport', [OrderController::class, 'addProductToCartExport']);
});

Route::prefix('orderdetail')->group(function () {
    Route::get('index', [OrderdetailController::class, 'index']);
    Route::get('show/{id}', [OrderdetailController::class, 'show']);
    Route::post('store', [OrderdetailController::class, 'store']);
    Route::post('update/{id}', [OrderdetailController::class, 'update']);
    Route::get('/getbyorder/{order_id}', [OrderdetailController::class, 'getByOrderId']);
    Route::get('/getbyproduct/{order_id}', [OrderdetailController::class, 'getByProductId']);
    Route::delete('destroy/{id}', [OrderdetailController::class, 'destroy']);
});

Route::prefix('post')->group(function () {
    Route::get('index', [PostController::class, 'index']);
    Route::get('indexpage', [PostController::class, 'indexpage']);
    Route::get('indextrash', [PostController::class, 'indextrash']);
    Route::get('indextrashpage', [PostController::class, 'indextrashpage']);
    Route::get('indexnew', [PostController::class, 'indexnew']);
    Route::get('indextech', [PostController::class, 'indextech']);
    Route::get('show/{id}', [PostController::class, 'show']);
    Route::get('showbyslug/{slug}', [PostController::class, 'showBySlug']);
    Route::post('store', [PostController::class, 'store']);
    Route::post('update/{id}', [PostController::class, 'update']);
    Route::post('updatepage/{id}', [PostController::class, 'updatepage']);
    Route::get('status/{id}', [PostController::class, 'status']);
    Route::get('trash/{id}', [PostController::class, 'trash']);
    Route::delete('destroy/{id}', [PostController::class, 'destroy']);
});

Route::prefix('product')->group(function () {
    Route::get('index', [ProductController::class, 'index']);
    Route::get('indextrash', [ProductController::class, 'indextrash']);
    Route::get('productnew/{limit}', [ProductController::class, 'productnew']);
    Route::get('producthotbuy/{limit}', [ProductController::class, 'productHotBuy']);
    Route::get('productcategory/{category_id}', [ProductController::class, 'getByCategory']);
    Route::get('productbrand/{brand_id}', [ProductController::class, 'getByBrand']);
    Route::get('sale', [ProductController::class, 'sale']);
    Route::get('import', [ProductController::class, 'import']);
    Route::get('show/{id}', [ProductController::class, 'show']);
    Route::get('showsale/{id}', [ProductController::class, 'showSale']);
    Route::post('store', [ProductController::class, 'store']);
    Route::post('storesale', [ProductController::class, 'storeSale']);
    Route::post('storeimport', [ProductController::class, 'storeImport']);
    Route::post('update/{id}', [ProductController::class, 'update']);
    Route::get('trash/{id}', [ProductController::class, 'trash']);
    Route::post('updatesale/{id}', [ProductController::class, 'updateSale']);
    Route::get('status/{id}', [ProductController::class, 'status']);
    Route::delete('destroy/{id}', [ProductController::class, 'destroy']);
    Route::delete('destroysale/{id}', [ProductController::class, 'destroysale']);
    Route::get('indexpagination', [ProductController::class, 'indexpagination']);
    Route::get('search', [ProductController::class, 'searchByName']);
    Route::get('searchlike', [ProductController::class, 'searchLikeName']);
    Route::get('filterproducts', [ProductController::class, 'filterProducts']);

});
Route::prefix('productstore')->group(function () {
    Route::get('index', [ProductStoreController::class, 'index']);
    Route::get('show/{id}', [ProductStoreController::class, 'show']);
    Route::post('store', [ProductStoreController::class, 'store']);
    Route::post('update/{id}', [ProductStoreController::class, 'update']);
    Route::get('status/{id}', [ProductStoreController::class, 'status']);
    Route::delete('destroy/{id}', [ProductStoreController::class, 'destroy']);
});
Route::prefix('productsale')->group(function () {
    Route::get('index', [ProductSaleController::class, 'index']);
    Route::get('show/{id}', [ProductSaleController::class, 'show']);
    Route::post('store', [ProductSaleController::class, 'store']);
    Route::post('update/{id}', [ProductSaleController::class, 'update']);
    Route::get('status/{id}', [ProductSaleController::class, 'status']);
    Route::delete('destroy/{id}', [ProductSaleController::class, 'destroy']);
});

Route::prefix('topic')->group(function () {
    Route::get('index', [TopicController::class, 'index']);
    Route::get('indextrash', [TopicController::class, 'indextrash']);
    Route::get('show/{id}', [TopicController::class, 'show']);
    Route::post('store', [TopicController::class, 'store']);
    Route::post('update/{id}', [TopicController::class, 'update']);
    Route::get('status/{id}', [TopicController::class, 'status']);
    Route::get('trash/{id}', [TopicController::class, 'trash']);
    Route::delete('destroy/{id}', [TopicController::class, 'destroy']);
});

Route::prefix('user')->group(function () {
    Route::get('index', [UserController::class, 'index']);
    Route::get('indexstaff', [UserController::class, 'indexstaff']);
    Route::get('indextrash', [UserController::class, 'indextrash']);
    Route::get('indextrashstaff', [UserController::class, 'indextrashstaff']);
    Route::get('show/{id}', [UserController::class, 'show']); 
    Route::post('login', [UserController::class, 'login']);
    Route::post('loginadmin', [UserController::class, 'loginadmin']);
    Route::post('store', [UserController::class, 'store']);
    Route::post('update/{id}', [UserController::class, 'update']);
    Route::get('status/{id}', [UserController::class, 'status']);
    Route::get('trash/{id}', [UserController::class, 'trash']);
    Route::delete('destroy/{id}', [UserController::class, 'destroy']);
});

Route::prefix('config')->group(function () {
    Route::get('show/{id}', [ConfigController::class, 'show']);
    Route::post('update/{id}', [ConfigController::class, 'update']);
});