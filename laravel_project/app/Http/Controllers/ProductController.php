<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductSale;
use App\Models\ProductStore;
use App\Models\Orderdetail;
use Illuminate\Support\Str;
use Carbon\Carbon;


class ProductController extends Controller
{
    function index()
    {
        $products = Product::with('category', 'brand')
            ->where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->get();
        $total = Product::count();
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function show($id)
    {
        $product = Product::with('category', 'brand', 'productSales')->find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'product' => $product,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $product = new Product();
        $product->name = $request->name; // reactjs
        $product->slug = Str::of($request->name)->slug('-');
        // upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/product'), $fileName);
                $product->image = $fileName;
            }
        }
        // end upload

        $product->category_id = $request->category_id;
        $product->brand_id = $request->brand_id;
        $product->detail = $request->detail; // reactjs
        $product->description = $request->description; // reactjs
        $product->created_at = date('Y-m-d H:i:s');
        $product->created_by = 1; // tam
        $product->price = $request->price; // reactjs
        $product->status = $request->status; // reactjs
        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Them du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Khong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $product->name = $request->name; // reactjs
        $product->slug = Str::of($request->name)->slug('-');
        // upload file -- reactjs
        $image = $request->image;
        if ($image != null) {
            $extension = $image->getClientOriginalExtension();
            if (in_array($extension, ['jpg', 'gif', 'png', 'webp'])) {
                $fileName = date('YmdHis') . '.' . $extension;
                $image->move(public_path('images/product'), $fileName);
                $product->image = $fileName;
            }
        }
        $product->detail = $request->detail; // reactjs
        $product->description = $request->description; // reactjs
        $product->price = $request->price; // reactjs
        $product->updated_at = date('Y-m-d H:i:s');
        $product->updated_by = 1; // tam
        $product->status = $request->status; // reactjs
        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Khong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        if ($product->delete()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Xoa du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $product = [
            'status' => false,
            'product' => null,
            'message' => 'Khong the tim thay du lieu',
        ];
        return response()->json($product, 200);
    }
    function status($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $product->status = ($product->status == 1) ? 2 : 1;
        $product->updated_at = date('Y-m-d H:i:s');
        $product->updated_by = 1; //tam
        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }

    public function sale()
    {
        $productSales = Product::join('db_productsale', 'db_productsale.product_id', '=', 'db_product.id')
        ->select('db_product.*', 'db_productsale.*')
        ->orderBy('pricesale', 'asc')
        ->take(8) 
            ->get();

        $result = [
            'status' => true,
            'productsales' => $productSales,
            'message' => 'Tải dữ liệu thành công'
        ];

        return response()->json($result, 200);
    }


    function destroysale($id)
    {
        $productsales = ProductSale::find($id);
        if ($productsales == null) {
            $result = [
                'status' => false,
                'productsales' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        if ($productsales->delete()) {
            $result = [
                'status' => true,
                'productsales' => $productsales,
                'message' => 'Xoa du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $product = [
            'status' => false,
            'productsales' => null,
            'message' => 'Khong the tim thay du lieu',
        ];
        return response()->json($product, 200);
    }

    function showSale($id)
    {
        $productsale = ProductSale::find($id);
        if ($productsale == null) {
            $result = [
                'status' => false,
                'productsale' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'productsale' => $productsale,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }

    function updateSale(Request $request, $id)
    {
        $productsale = ProductSale::find($id);
        if ($productsale == null) {
            $result = [
                'status' => false,
                'productsale' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $productsale->pricesale = $request->pricesale;
        $productsale->qty = $request->qty;
        $productsale->date_begin = $request->date_begin;
        $productsale->date_end = $request->date_end;
        $productsale->updated_by = 1;
        $productsale->updated_at = date('Y-m-d H:i:s');
        if ($productsale->save()) {
            $result = [
                'status' => true,
                'productsale' => $productsale,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'productsale' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }




    function storeSale(Request $request)
    {
        $object = new ProductSale();
        $object->product_id = $request->product_id;
        $object->pricesale = $request->pricesale;
        $object->qty = $request->qty;
        $object->date_begin = $request->date_begin;
        $object->date_end = $request->date_end;
        $object->created_by = 1;
        $object->created_at = date('Y-m-d H:i:s');
        if ($object->save()) {
            $result = [
                'status' => true,
                'productsale' => $object,
                'message' => 'Them du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'productsale' => null,
            'message' => 'Khong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    public function import()
    {
        $productstores = Product::with('brand', 'category', 'productStores')->get();

        // Format the response
        $result = [
            'status' => true,
            'productstores' => $productstores,
            'message' => 'Tải dữ liệu thành công'
        ];

        // Return the response
        return response()->json($result, 200);
    }


    function storeImport(Request $request)
    {
        $productstore = new ProductStore();
        $productstore->product_id = $request->product_id;
        $productstore->price = $request->price; // reactjs
        $productstore->qty = $request->qty; // reactjs
        $productstore->created_by = 1;
        $productstore->created_at = date('Y-m-d H:i:s');
        if ($productstore->save()) {
            $result = [
                'status' => true,
                'productstore' => $productstore,
                'message' => 'Them du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'productstore' => null,
            'message' => 'Khong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    public function productnew($limit)
    {
        // Truy vấn để lấy thông tin từ bảng productstore
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as sum_qty'))
            ->groupBy('product_id');
        // Truy vấn để lấy sản phẩm mới từ bảng db_product
        $products = Product::where('db_product.status', '=', 1)
            ->joinSub($productstore, 'db_productstore', function ($join) {
                $join->on('db_product.id', '=', 'db_productstore.product_id');
            })
            ->orderBy('db_product.created_at', 'desc')
            ->select('db_product.id', 'db_product.name', 'db_product.image', 'db_product.price', 'db_product.slug', 'db_productstore.sum_qty')
            ->limit($limit)
            ->get();
        // Truy vấn để lấy thông tin khuyến mãi từ bảng db_productsale
        $productsale = ProductSale::whereIn('product_id', $products->pluck('id'))
            ->where('date_begin', '<', Carbon::now())
            ->where('date_end', '>=', Carbon::now())
            ->get();
        // Kết hợp thông tin khuyến mãi với thông tin sản phẩm
        $products->each(function ($product) use ($productsale) {
            $sale = $productsale->firstWhere('product_id', $product->id);
            $product->sale = $sale ? $sale->only(['date_begin', 'date_end', 'pricesale']) : null;
        });
        // Tạo mảng kết quả để trả về
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tai du lieu thanh cong' // "Dữ liệu được tải thành công" trong tiếng Việt
        ];
        // Trả về dữ liệu dưới dạng JSON cùng với mã trạng thái HTTP 200
        return response()->json($result, 200);
    }


    public function getByCategory($category_id)
    {
        $products = Product::with(['category', 'brand'])
            ->where('category_id', $category_id)
            ->where('status', '!=', 0)
            ->get();

        if ($products->isEmpty()) {
            return response()->json([
                'status' => false,
                'products' => [],
                'message' => 'Không có sản phẩm trong danh mục này',
            ], 404);
        }

        // Fetch sales data for the products
        $productsale = ProductSale::whereIn('product_id', $products->pluck('id'))
            ->where('date_begin', '<', Carbon::now())
            ->where('date_end', '>=', Carbon::now())
            ->get();

        // Attach the sales data to each product
        $products->each(function ($product) use ($productsale) {
            $sale = $productsale->firstWhere('product_id', $product->id);
            $product->sale = $sale ? $sale->only(['date_begin', 'date_end', 'pricesale']) : null;
        });
        if ($products->isEmpty()) {
            return response()->json([
                'status' => false,
                'products' => [],
                'message' => 'Không có sản phẩm trong thương hiệu này',
            ], 404);
        }

        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
        ];

        return response()->json($result, 200);
    }
    

    public function getByBrand($brand_id)
    {
        $products = Product::with(['brand', 'category'])
            ->where('brand_id', $brand_id)
            ->where('status', '!=', 0)
            ->get();

        if ($products->isEmpty()) {
            return response()->json([
                'status' => false,
                'products' => [],
                'message' => 'Không có sản phẩm trong thương hiệu này',
            ], 404);
        }

        // Fetch sales data for the products
        $productsale = ProductSale::whereIn('product_id', $products->pluck('id'))
            ->where('date_begin', '<', Carbon::now())
            ->where('date_end', '>=', Carbon::now())
            ->get();

        // Attach the sales data to each product
        $products->each(function ($product) use ($productsale) {
            $sale = $productsale->firstWhere('product_id', $product->id);
            $product->sale = $sale ? $sale->only(['date_begin', 'date_end', 'pricesale']) : null;
        });

        if ($products->isEmpty()) {
            return response()->json([
                'status' => false,
                'products' => [],
                'message' => 'Không có sản phẩm trong thương hiệu này',
            ], 404);
        }

        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
        ];

        return response()->json($result, 200);
    }

    public function productHotBuy($limit)
    {
        $productstore = ProductStore::select('product_id', DB::raw('SUM(qty) as sum_qty'))
            ->groupBy('product_id');

        $orderdetail = OrderDetail::select('product_id', DB::raw('SUM(qty) as order_qty'))
            ->groupBy('product_id');

        $products = Product::where('db_product.status', '=', 1)
            ->joinSub($productstore, 'productstore', function ($join) {
                $join->on('productstore.product_id', '=', 'db_product.id');
            })
            ->joinSub($orderdetail, 'orderdetail', function ($join) {
                $join->on('orderdetail.product_id', '=', 'db_product.id');
            })
            ->orderBy('db_product.created_at', 'desc')
            ->select('db_product.*')
            ->limit($limit)
            ->get();


        $productsale = ProductSale::whereIn('product_id', $products->pluck('id'))
            ->where('date_begin', '<', Carbon::now())
            ->where('date_end', '>=', Carbon::now())
            ->get();


        $products->each(function ($product) use ($productsale) {
            $sale = $productsale->firstWhere('product_id', $product->id);
            $product->sale = $sale ? $sale->only(['date_begin', 'date_end', 'pricesale']) : null;
        });

        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Data retrieved successfully'
        ];

        return response()->json($result);
    }

    function indexpagination(Request $request)
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 8);

        // Thực hiện truy vấn với phân trang
        $products = Product::with('category', 'brand')
            ->where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        // Đóng gói kết quả và trả về
        $result = [
            'status' => true,
            'products' => $products->items(),
            'total' => $products->total(),
            'message' => 'Tải dữ liệu thành công'
        ];
        return response()->json($result, 200);
    }

    public function searchByName(Request $request)
    {
        $query = $request->input('query');

        $products = Product::with('category', 'brand')
            ->where('status', '!=', 0)
            ->whereRaw("MATCH(name) AGAINST(? IN NATURAL LANGUAGE MODE)", [$query])
            ->orderBy('created_at', 'desc')
            ->get();

        $total = $products->count();

        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    public function searchLikeName(Request $request)
    {
        $query = $request->input('query');

        $products = Product::with('category', 'brand')
            ->where('status', '!=', 0)
            ->where('name', 'LIKE', '%' . $query . '%')
            ->orderBy('created_at', 'desc')
            ->get();

        $total = $products->count();

        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tải dữ liệu thành công',
            'total' => $total
        ];

        return response()->json($result, 200);
    }

    function indextrash()
    {
        $products = Product::with('category', 'brand')
        ->where('status', 0)
        ->orderBy('created_at', 'desc')
        ->get();
        $total = Product::count();
        $result = [
            'status' => true,
            'products' => $products,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function trash($id)
    {
        $product = Product::find($id);
        if ($product == null) {
            $result = [
                'status' => false,
                'product' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $product->status = ($product->status == 0) ? 1 : 0;
        $product->updated_at = date('Y-m-d H:i:s');
        $product->updated_by = 1; //tam
        if ($product->save()) {
            $result = [
                'status' => true,
                'product' => $product,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'product' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }
    public function filterProducts(Request $request)
    {
        $query = Product::query();

        // Lọc theo giá
        if ($request->has('minPrice')) {
            $query->where('price', '>=', $request->input('minPrice'));
        }

        if ($request->has('maxPrice')) {
            $query->where('price', '<=', $request->input('maxPrice'));
        }

        // Lọc theo category_id
        if ($request->has('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }

        // Lọc theo brand_id
        if ($request->has('brand_id')) {
            $query->where('brand_id', $request->input('brand_id'));
        }

        // Thêm phân trang
        $perPage = $request->input('perPage', 10); // Số sản phẩm mỗi trang, mặc định là 10
        $products = $query->paginate($perPage);

        return response()->json($products);
    }
}