<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\Orderdetail;
use App\Models\Product;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    function index()
    {
        $orders = Order::where('status', '!=', 0)
        ->orderBy('created_at', 'desc')
        ->select('*')
            ->get();
        $total = Order::count();
        $result = [
            'status' => true,
            'orders' => $orders,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function indextrash()
    {
        $orders = Order::where('status', 0)
        ->orderBy('created_at', 'desc')
        ->select('*')
            ->get();
        $total = Order::count();
        $result = [
            'status' => true,
            'orders' => $orders,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function show($id)
    {
        $order = Order::find($id);
        if ($order == null) {
            $result = [
                'status' => false,
                'order' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'order' => $order,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $order = new Order();
        $order->user_id = $request->user_id;
        $order->delivery_name = $request->delivery_name;
        $order->delivery_gender = $request->sort_order;
        $order->delivery_gender = $request->delivery_gender;
        $order->delivery_email = $request->delivery_email;
        $order->delivery_phone = $request->delivery_phone;
        $order->delivery_address = $request->delivery_address;
        $order->note = $request->note;
        $order->created_by = $request->created_by;
        $order->created_at = date('Y-m-d H:i:s');
        $order->status = $request->status;
        if ($order()) {
            $result = [
                'status' => true,
                'order' => $order,
                'message' => 'Them du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'order' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $order = Order::find($id);
        if ($order == null) {
            $result = [
                'status' => false,
                'order' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $order->user_id = $request->user_id;
        $order->delivery_name = $request->delivery_name;
        $order->delivery_gender = $request->sort_order;
        $order->delivery_gender = $request->delivery_gender;
        $order->delivery_email = $request->delivery_email;
        $order->delivery_phone = $request->delivery_phone;
        $order->delivery_address = $request->delivery_address;
        $order->note = $request->note;
        $order->updated_by = $request->updated_by;
        $order->status = $request->status;
        $order->updated_at = date('Y-m-d H:i:s');
        if ($order->save()) {
            $result = [
                'status' => true,
                'order' => $order,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'order' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function status($id)
    {
        $order = Order::find($id);
        if ($order == null) {
            $result = [
                'status' => false,
                'order' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $order->status = ($order->status == 1) ? 2 : 1;
        $order->updated_at = date('Y-m-d H:i:s');
        $order->updated_by = 1;
        if ($order->save()) {
            $result = [
                'status' => true,
                'order' => $order,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'order' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }

    function trash($id)
    {
        $order = Order::find($id);
        if ($order == null) {
            $result = [
                'status' => false,
                'order' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $order->status = ($order->status == 0) ? 1 : 0;
        $order->updated_at = date('Y-m-d H:i:s');
        $order->updated_by = 1;
        if ($order->save()) {
            $result = [
                'status' => true,
                'order' => $order,
                'message' => 'Cap nhat du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'order' => null,
            'message' => 'Khong the cap nhat du lieu',
        ];
        return response()->json($result, 200);
    }

    function destroy($id)
    {
        $order = Order::find($id);
        if ($order == null) {
            $result = [
                'status' => false,
                'order' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        if ($order->delete()) {
            $result = [
                'status' => true,
                'order' => $order,
                'message' => 'Cap nha du lieu thanh cong',
            ];
            return response()->json($result, 200);
        }

        $result = [
            'status' => false,
            'order' => null,
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    public function getByUserId($id)
    {
        $userId = $id;

        if (!$userId) {
            return response()->json([
                'status' => false,
                'orders' => [],
                'message' => 'User ID is required',
            ], 400);
        }

        $orders = Order::where('user_id', $userId)
            ->where('status', '!=', 0)
            ->orderBy('created_at', 'desc')
            ->get();

        $result = [
            'status' => true,
            'orders' => $orders,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }

    // OrderController.php

    public function addProductToCart(Request $request)
    {
        $userData = $request->user;
        $user_id = $userData['id'];
        $product_id = $request->product_id;
        $qty = $request->qty;
        $address = $request->address;

        // Kiểm tra xem có đơn hàng chưa hoàn thành nào của user này không
        $cart = Order::where(['user_id' => $user_id, 'status' => 0])->first();

        // Nếu có đơn hàng chưa hoàn thành, sử dụng đơn hàng đó, ngược lại tạo mới
        if (!$cart) {
            $cart = Order::create([
                'user_id' => $user_id,
                'status' => 0,
                'delivery_name' => $userData['name'],
                'delivery_gender' => $userData['gender'],
                'delivery_email' => $userData['email'],
                'delivery_phone' => $userData['phone'],
                'delivery_address' => $address,
                // 'created_at' => now()
            ]);
        }

        // Lấy thông tin sản phẩm
        $product = Product::findOrFail($product_id);
        $price = $product->price;

        // Tạo mới Orderdetail và lưu thông tin chi tiết sản phẩm
        $orderDetail = new Orderdetail([
            'order_id' => $cart->id,
            'product_id' => $product_id,
            'price' => $price,
            'qty' => $qty,
            'amount' => $price * $qty
        ]);

        $orderDetail->save();

        return response()->json(['message' => 'Product added to cart']);
    }

    public function createOrder(Request $request)
    {
        $cart = Order::where('user_id', $request->user_id)->where('status', 0)->firstOrFail();
        if (!$cart) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu!',
            ], 400);
        }
        $cart->status = 1;
        $cart->created_at  = now();
        $cart->save();
        return response()->json(['message' => 'Đặt hàng thành công', 'status' => true]);
    }

    public function getCart(Request $request)
    {
        // Get the user ID from the request
        $userId = $request->user_id;

        // Find the cart with status 0 for the user
        $cart = Order::with('orderdetail.product')
            ->where('user_id', $userId)
            ->where('status', 0)
            ->first();

        if ($cart) {
            return response()->json([
                'status' => true,
                'cart' => $cart,
                'message' => 'Cart retrieved successfully',
            ]);
        } else {
            return response()->json([
                'status' => false,
                'cart' => [],
                'message' => 'No cart found',
            ]);
        }
    }

    function createOrderExport(Request $request)
    {
        $order = new Order();
        $order->delivery_name = $request->delivery_name;
        $order->delivery_gender = $request->delivery_gender;
        $order->delivery_email = $request->delivery_email;
        $order->delivery_phone = $request->delivery_phone;
        $order->delivery_address = $request->delivery_address;
        $order->note = $request->note;
        $order->created_by = 1;
        $order->created_at = date('Y-m-d H:i:s');
        $order->status = 0;
        if ($order->save()) {
            $result = [
                'status' => true,
                'order' => $order,
                'message' => 'Tạp đơn hàng thành công',
            ];
            return response()->json($result, 200);
        }
        $result = [
            'status' => false,
            'order' => null,
            'message' => 'Không thể tạo đơn hàng',
        ];
        return response()->json($result, 200);
    }
    public function getCartExport(Request $request)
    {

        // Find the cart with status 0 for the user
        $cart = Order::with('orderdetail.product')
            ->where('user_id', null)
            ->where('status', 0)
            ->first();
        if ($cart) {
            return response()->json([
                'status' => true,
                'cart' => $cart,
                'message' => 'Cart retrieved successfully',
            ]);
        } else {
            return response()->json([
                'status' => false,
                'cart' => [],
                'message' => 'No cart found',
            ]);
        }
    }
    public function ChangeStatusOrderExport()
    {
        $cart = Order::where('user_id', null)
            ->where('status', 0)->firstOrFail();
        if (!$cart) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy dữ liệu',
            ], 400);
        }
        $cart->status = 1;
        $cart->created_at  = now();
        $cart->save();
        return response()->json(['message' => 'Tạo đơn hàng thành công','cart'=>null, 'status' => true]);
    }

    public function addProductToCartExport(Request $request)
    {
        $product_id = $request->product_id;
        $qty = $request->qty;

        // Kiểm tra xem có đơn hàng chưa hoàn thành nào của user này không
        $cart = Order::where(['user_id' => null, 'status' => 0])->first();

        // Lấy thông tin sản phẩm
        $product = Product::findOrFail($product_id);
        $price = $product->price;

        // Tạo mới Orderdetail và lưu thông tin chi tiết sản phẩm
        $orderDetail = new Orderdetail([
            'order_id' => $cart->id,
            'product_id' => $product_id,
            'price' => $price,
            'qty' => $qty,
            'amount' => $price * $qty
        ]);

        $orderDetail->save();

        return response()->json(['message' => 'Product added to cart']);
    }
}