<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\ProductStore;
use Illuminate\Support\Str;

class ProductStoreController extends Controller
{
    function index()
    {
        $productstore = ProductStore::where('qty', '>=', 0)
        ->orderBy('created_at', 'desc')
        ->select('*')
        ->get();
        $total = ProductStore::count();
        $result = [
            'status' => true,
            'productstore' => $productstore,
            'message' => 'Tai du lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function show($id)
    {
        $productstore = ProductStore::find($id);
        if ($productstore == null) {
            $result = [
                'status' => false,
                'productstore' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        $result = [
            'status' => true,
            'productstore' => $productstore,
            'message' => 'Tai du lieu thanh cong',
        ];
        return response()->json($result, 200);
    }

    function store(Request $request)
    {
        $productstore = new ProductStore();
        $productstore->product_id = $request->product_id;
        $productstore->price = $request->price; // reactjs
        $productstore->qty = $request->qty; // reactjs
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
            'message' => 'Khoong the them du lieu',
        ];
        return response()->json($result, 200);
    }

    function update(Request $request, $id)
    {
        $productstore = ProductStore::find($id);
        if ($productstore == null) {
            $result = [
                'status' => false,
                'productstore' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }
        $productstore->product_id = $request->product_id; // tam
        $productstore->price = $request->price; // reactjs
        $productstore->qty = $request->qty; // reactjs
        $productstore->updated_at = date('Y-m-d H:i:s');
        $productstore->updated_by = 1;
        if ($productstore->save()) {
            $result = [
                'status' => true,
                'productstore' => $productstore,
                'message' => 'Cap nha du lieu thanh cong',
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

    function destroy($id)
    {
        $productstore = ProductStore::find($id);
        if ($productstore == null) {
            $result = [
                'status' => false,
                'productstore' => null,
                'message' => 'Khong tim thay du lieu',
            ];
            return response()->json($result, 404);
        }

        if ($productstore->delete()) {
            $result = [
                'status' => true,
                'productstore' => $productstore,
                'message' => 'Cap nha du lieu thanh cong',
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
}