<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\ProductSale;
use Illuminate\Support\Str;

class ProductSaleController extends Controller
{
    function index()
    {
        $productsales = ProductSale::where('status', '!=', 0)
        ->orderBy('created_at', 'desc')
        ->select('*')
            ->get();
        $total = ProductSale::count();
        $result = [
            'status' => true,
            'productsales' => $productsales,
            'message' => 'Tai lieu thanh cong',
            'total' => $total
        ];
        return response()->json($result, 200);
    }

    function show($id)
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

    function store(Request $request)
    {
        $productsale = new ProductSale();
        $productsale->product_id = $request->product_id;
        $productsale->pricesale = $request->pricesale;
        $productsale->qty = $request->qty;
        $productsale->date_begin = $request->date_begin;
        $productsale->date_end = $request->date_end;
        $productsale->created_by = $request->created_by;
        $productsale->created_at = date('Y-m-d H:i:s');
        if ($productsale()) {
            $result = [
                'status' => true,
                'productsale' => $productsale,
                'message' => 'Them du lieu thanh cong',
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

    function update(Request $request, $id)
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
        $productsale->product_id = $request->product_id;
        $productsale->pricesale = $request->pricesale;
        $productsale->qty = $request->qty;
        $productsale->date_begin = $request->date_begin;
        $productsale->date_end = $request->date_end;
        $productsale->updated_by = $request->updated_by;
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

    function destroy($id)
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

        if ($productsale->delete()) {
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
}